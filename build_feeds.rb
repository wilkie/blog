files = `git ls-files posts/*.md`

require 'bundler'

require 'builder'
require 'redcarpet'
require 'thin'
require 'haml'
require_relative 'blog'
require_relative 'post'

DOMAIN = "http://blog.davewilkinsonii.com"

posts = []

files.lines.each do |f|
  f = f[/^posts\/(.*).md$/, 1]
  post = Post.new(f)

  if post.date.to_s.empty?
    puts "Post without a date: [will not be included]"
    puts post.slug
  elsif post.hidden
  else
    posts << post
  end
end

posts.sort!{|a, b| b.date <=> a.date}

xml = Builder::XmlMarkup.new

xml.instruct! :xml, :version => '1.0'
xml.rss :version => "2.0" do
  xml.channel do
    xml.title Blog::TITLE
    xml.description Blog::DESCRIPTION
    xml.link DOMAIN

    posts.each do |post|
      xml.item do
        xml.title post.title
        xml.link "#{DOMAIN}/posts/#{post.slug}"
        xml.description do
          xml.cdata! post.content
        end
        unless post.date.to_s.empty?
          xml.pubDate Time.parse(post.date.to_s).rfc822
        end
        xml.guid "#{DOMAIN}/posts/#{post.slug}"
      end
    end
  end
end

File.open("feeds/rss.xml", "w+") do |f|
  f.write xml
end

xml = Builder::XmlMarkup.new

xml.instruct!
xml.feed :xmlns => 'http://www.w3.org/2005/Atom' do
  xml.title Blog::TITLE
  xml.link :href => "#{DOMAIN}/feed", :rel => :self, :type => 'application/atom+xml'
  xml.link :href => "#{DOMAIN}/archive", :rel => :alternate, :type => 'text/html'
  xml.id "#{DOMAIN}/"
  xml.updated posts.first.date.to_time.xmlschema

  posts.each do |post|
    xml.entry do
      url = "#{DOMAIN}/posts/#{post.slug}"

      xml.title post.title, :type => :html
      xml.link :href => url, :rel => :alternate, :type => 'text/html'
      xml.published post.date.to_time.xmlschema
      xml.updated post.date.to_time.xmlschema

      xml.author do
        xml.name Blog::TITLE
      end

      xml.id url
      if post.summary and !post.summary.to_s.strip.empty?
        xml.summary post.summary
      end

      xml.content :type => :html, 'xml:base' => url do
        xml.cdata! post.content
      end
    end
  end
end

File.open("feeds/atom.xml", "w+") do |f|
  f.write xml
end
