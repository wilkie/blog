require 'yaml'
require 'nokogiri'

class Node
  attr_accessor :child
  attr_accessor :sibling
  attr_accessor :parent
  attr_accessor :text

  def initialize text, parent=nil, sibling=nil, child=nil
    @parent = parent
    @text = text
    @sibling = sibling
    @child = child
  end

  def level
    level = 1
    current = @parent
    until current.nil? do
      current = current.parent
      level = level + 1
    end
    level
  end

  def slug
    @text.gsub(/\W/, "_").downcase
  end
end

class Post
  class Renderer < Redcarpet::Render::HTML
    attr_accessor :outline

    def initialize(slug, *args)
      @outline = Node.new :root
      @last = @outline
      @slug = slug
      @list_item_number = 0

      super *args
    end

    def codespan(code)
      "<code>#{CGI::escapeHTML(code).gsub(/\-/, "&#8209;")}</code>"
    end

    def link(link, title, content)
      klass = ""
      if content.match /^\d+$/
        link = "#ref_#{content}"
        klass = "reference"
      end
      "<a #{klass == "" ? "" : "class='#{klass}'"} href='#{link}' title='#{title}'>#{content}</a>"
    end

    def list(content, type)
      @list_item_number = 0
      if type == :ordered
        "<ol>#{content}</ol>"
      else
        "<ul>#{content}</ul>"
      end
    end

    def list_item(content, type)
      @list_item_number += 1
      if type == :ordered and @last.text == "References"
        "<a id='ref_#{@list_item_number}'></a><li>#{content}</li>"
      else
        "<li>#{content}</li>"
      end
    end

    def block_code(code, language)
      code = CGI::escapeHTML(code);
      new_code = ""
      last_number = -1
      code.lines do |l|
        m = l.match(/^\!(\d)\!(.*)$/)
        if m
          if m[1] != last_number
            l = "<div class='ref_line s1 c#{m[1]}'><div>#{m[2]}\n"
            if last_number != -1
              l = "</div></div>" << l
            end
          else
            l = "#{m[2]}\n"
          end
          last_number = m[1]
        else
          if last_number != -1
            l = "</div></div>" << l
          end
          last_number = -1
        end
        new_code << l
      end
      "<pre><code class='lang-#{language}'>#{new_code}</code></pre>"
    end

    def image(link, title, alt_text)
      unless link.match /^http|^\//
        link = "/images/#{@slug}/#{link}"
      end

      options = alt_text.match(/^(.*)\|/)
      options = options[1] if options

      alt_text.gsub!(/^.*\|/, "")

      classes = "image"

      if options
        options.split('|').each do |option|
          case option
          when "border"
            classes << " border"
          when "right"
            classes << " right"
          when "left"
            classes << " left"
          end
        end
      end

      caption = ""
      caption = alt_text unless alt_text.start_with? "!"
      caption = Redcarpet::Markdown.new(self.class.new(@slug)).render(caption)
      alt_text = Nokogiri::HTML(alt_text).xpath("//text()").remove

      img_source = "<img src='#{link}' title='#{title}' alt='#{alt_text}' />"

      if link.match "http[s]?://(www.)?youtube.com"
        # embed the youtube link
        youtube_hash = link.match("youtube.com/.*=(.*)$")[1]
        img_source = "<div class='yt'><div class='yt_fixture'><img src='/images/yt_placeholder.png' /><iframe class='yt_frame' src='http://www.youtube.com/embed/#{youtube_hash}'></iframe></div></div>"
      end

      caption = "<br /><div class='caption'>#{caption}</div>" unless caption == ""
      "</p><div class='#{classes}'>#{img_source}#{caption}</div><p>"
    end

    def header(text, header_level, *args)
      new_node = Node.new text
      if header_level == @last.level
        new_node.parent = @last.parent
        @last.sibling = new_node
      elsif header_level > @last.level
        new_node.parent = @last
        @last.child = new_node
      elsif header_level < @last.level
        new_node.parent = @last.parent.parent
        @last.parent.sibling = new_node
      end
      @last = new_node

      "<h#{header_level} id='#{new_node.slug}'>#{text}</h#{header_level}>"
    end
  end
end

class Post
  attr_reader :content
  attr_reader :title
  attr_reader :subtitle
  attr_reader :author
  attr_reader :gittip
  attr_reader :summary
  attr_reader :date
  attr_reader :tags
  attr_reader :scripts
  attr_reader :styles
  attr_reader :outline
  attr_reader :slug
  attr_reader :url
  attr_reader :hidden

  def self.latest
    Dir["posts/*.md"].first[/^posts\/(.*)\.md$/, 1]
  end

  def self.find(name)
    return name if File.exists? "posts/#{name}.md"

    glob = Dir["posts/#{name}*.md"]
    return latest if glob.empty?

    return glob.first[/^posts\/(.*)\.md$/, 1]
  end

  def initialize(name)
    begin
      content = File.read("posts/#{name}.md")
    rescue
      return
    end

    match = content.match(/^---$(.*?)^---$(.*)/m)

    unless match.nil?
      meta_data = match[1]
      content = match[2]

      meta_data = YAML.load(meta_data)

      @title = meta_data["title"]
      @subtitle = meta_data["subtitle"]
      @author = meta_data["author"]
      @author = [@author] unless @author.is_a? Array
      @tags = meta_data["tags"] || []
      @scripts = meta_data["scripts"] || []
      @styles  = meta_data["styles"] || []
      @gittip = meta_data["gittip"] || ["wilkie"]
      @gittip = [@gittip] unless @gittip.is_a? Array
      if @gittip.count == @gittip.select{|a| a=="no" }.count
        @gittip = []
      end
      @summary = meta_data["summary"]
      @date = meta_data["date"]
      @hidden = meta_data["hidden"]
      if @hidden.nil?
        @hidden = false
      end
    else
      return
    end

    @slug = name

    renderer = Post::Renderer.new(@slug)
    r = Redcarpet::Markdown.new(renderer, :fenced_code_blocks => true)
    @content = r.render(content)
    @outline = renderer.outline.child
    @url = "/posts/#{slug}"
  end

  def stripped_title
    self.title.gsub(/\<.*?\>/, " ")
  end

  def stripped_subtitle
    self.subtitle.gsub(/\<.*?\>/, " ")
  end
end
