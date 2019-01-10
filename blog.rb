require 'bundler'
Bundler.require

require_relative 'post'
require_relative 'tags'

class Blog < Sinatra::Base
  TITLE = "wilkie writes a thing"
  DESCRIPTION = "wilkie's blog on tech and diversity"
  GITHUB_USERNAME = "wilkie"
  TWITTER_USERNAME = "wilkieii"
  RSTATUS_USERNAME = "wilkieii"
  MASTODON_DOMAIN = "mastodon.social"
  MASTODON_USERNAME = "wilkie"

  helpers Sinatra::ContentFor

  helpers do
    def title
      return TITLE if @title.nil?
      title = @title.gsub(/\<.*?\>/, " ")
      if @subtitle
        subtitle = @subtitle.gsub(/\<.*?\>/, " ")
        "#{title}: #{subtitle} - #{TITLE}"
      else
        "#{title} - #{TITLE}"
      end
    end

    def tags
      []
    end

    def partial(page, options={})
      haml "_#{page}".to_sym, options.merge!(:layout => false)
    end

    def format_outline(outline)
      return "" if outline.nil?
      if outline.text == "References" || outline.text == "Footnotes"
        "</ul><li><a href='##{outline.slug}'>#{outline.text}</a></li>#{format_outline(outline.sibling)}<ul>"
      else
        "<li><a href='##{outline.slug}'>#{outline.text}</a><ul>#{format_outline(outline.child)}</ul></li>#{format_outline(outline.sibling)}"
      end
    end
  end

  get '/' do
    haml :index
  end

  get '/abstractions' do
    redirect "/posts/abstractions"
  end

  get '/archive' do
    @tags = Tags.archive_content
    @tags_rest = []

    haml :archive
  end

  get '/tags/*' do
    address = params[:splat].join('/')
    params[:id] = address

    tags = Tags.gather(params[:id])

    # if post is empty, 404
    if tags.empty?
      raise Sinatra::NotFound
    end

    @content = Tags.tag_summary(params[:id])
    @subtags = Tags.archive_content(params[:id])
    @tag = params[:id]
    @posts = tags

    haml :tag
  end

  get '/posts/:id' do
    # support date-slug as well as just slug
    slug = params[:id][/^\d{4}-\d{2}-\d{2}-(.*)$/, 1]
    if slug
      # tell it that the resource has moved permanently
      redirect "/posts/#{slug}", 301
      return
    end

    # find post
    full_post = Post.find(params[:id])
    if full_post != params[:id]
      # Non permanent redirect
      redirect "/posts/#{full_post}", 302
      return
    end

    # load post
    source = Post.new(params[:id])

    # if post is empty, 404
    if source.content.nil?
      raise Sinatra::NotFound
    end

    # gather info
    @content = source.content
    @title = source.title
    @subtitle = source.subtitle
    @author = source.author
    @gittip = source.gittip
    @date = source.date
    @summary = source.summary
    @outline = source.outline
    @tags = source.tags
    @scripts = source.scripts
    @styles  = source.styles
    @slug = source.slug

    # render
    haml :post
  end

  # RSS
  get '/rss.xml' do
    send_file 'feeds/rss.xml', :type => "application/rss+xml"
  end

  # Atom 2.0
  get '/atom.xml' do
    send_file 'feeds/atom.xml', :type => "application/atom+xml"
  end
end
