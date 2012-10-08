require 'bundler'
Bundler.require

require_relative 'post'
require_relative 'tags'

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

    def tags
      []
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

  get '/archive' do
    @tags = Tags.archive_content
    @tags_rest = Tags.rest(@tags)

    haml :archive
  end

  get '/tags/:id' do
    tags = Tags.gather(params[:id])

    # if post is empty, 404
    if tags.empty?
      raise Sinatra::NotFound
    end

    @content = Tags.tag_summary(params[:id])
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
    @tags = source.tags

    # render
    haml :post
  end
end
