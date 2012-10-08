require 'bundler'
Bundler.require

require_relative 'post'

class Blog < Sinatra::Base
  TITLE = "wilkie writes a thing"
  GITHUB_USERNAME = "wilkie"
  TWITTER_USERNAME = "DaveWilkinsonII"
  RSTATUS_USERNAME = "DaveWilkinsonII"

  helpers Sinatra::ContentFor

  helpers do
    def title
      return TITLE if @title.nil?
      "#{@title} - #{TITLE}"
    end

    def latest_posts
      ret = []
      Dir.glob("posts/*.md") do |post|
        post = post[/posts\/(.*?).md$/,1]
        p = Post.new(post)
        ret << {:title => p.title, :url => "/posts/#{post}"}
      end
      ret
    end

    def partial(page, options={})
      haml "_#{page}".to_sym, options.merge!(:layout => false)
    end

    def format_outline(outline)
      return "" if outline.nil?
      if outline.text == "References"
        "</ul><li><a href='##{outline.slug}'>#{outline.text}</a></li>#{format_outline(outline.sibling)}<ul>"
      else
        "<li><a href='##{outline.slug}'>#{outline.text}</a><ul>#{format_outline(outline.child)}</ul></li>#{format_outline(outline.sibling)}"
      end
    end
  end

  get '/' do
    haml :index
  end

  get '/posts/:id' do
    # support date-slug as well as just slug
    slug = params[:id][/^\d{4}-\d{2}-\d{2}-(.*)$/, 1]
    if slug
      # tell it that the resource has moved permanently
      redirect "/posts/#{slug}", 301
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
    @author = source.author
    @date = source.date
    @summary = source.summary
    @outline = source.outline

    # render
    haml :post
  end
end
