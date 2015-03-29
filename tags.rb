class Tags
  # Gather tags off of a given tag, do not recurse
  # Root tags are removed from names
  def Tags.archive_content(root_tag = '')
    ret = {}
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)

    root_tag = root_tag + "/" unless root_tag == ''

    Dir.glob("tags/#{root_tag}*.md") do |filename|
      tag = filename[/tags\/#{root_tag}(.*).md$/, 1]
      ret[tag] = markdown.render(File.read(filename))
    end
    ret
  end

  # Get the tag summary for a given tag.
  def Tags.tag_summary(tag)
    renderer = Redcarpet::Render::HTML.new
    markdown = Redcarpet::Markdown.new(renderer)

    hierarchy = tag.split('/')

    ret = ""
    parent = "/"
    hierarchy.each do |tag|
      filename = "tags#{parent}#{tag}.md"
      parent << tag + "/"
      begin
        ret << markdown.render(File.read(filename))
      rescue
        nil
      end
    end
    ret
  end

  # Get all tags used by all posts
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

  # Gather posts with a given tag
  def Tags.gather(tag)
    ret = []
    Dir.glob("posts/*.md") do |post|
      post = post[/posts\/(.*).md$/, 1]
      p = Post.new(post)
      (p.tags || []).each do |tag_check|
        ret << p if tag_check == tag
      end
    end
    ret
  end
end
