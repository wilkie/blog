class Tags
  def Tags.archive_content
    ret = {}
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)

    Dir.glob("tags/*.md") do |filename|
      tag = filename[/tags\/(.*).md$/, 1]
      ret[tag] = markdown.render(File.read(filename))
    end
    ret
  end

  def Tags.tag_summary(tag)
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)

    filename = "tags/#{tag}.md"
    begin
      markdown.render(File.read(filename))
    rescue
      nil
    end
  end

  def Tags.all
    ret = []
    Dir.glob("posts/*.md") do |post|
      post = post[/posts\/(.*).md$/, 1]
      p = Post.new(post)
      p.tags.each do |tag|
        unless ret.include?(tag)
          ret << tag
        end
      end
    end
    ret
  end

  def Tags.rest(gathered)
    ret = Tags.all
    gathered.each do |tag, content|
      if ret.include? tag
        ret.delete(tag)
      end
    end
    ret
  end

  def Tags.gather(tag)
    ret = []
    Dir.glob("posts/*.md") do |post|
      post = post[/posts\/(.*).md$/, 1]
      p = Post.new(post)
      p.tags.each do |tag_check|
        ret << p if tag_check == tag
      end
    end
    ret
  end
end
