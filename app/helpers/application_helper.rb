module ApplicationHelper
  def markdown(content)
    @markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, space_after_headers: true)
    @markdown.render(content).html_safe
  end
  
  def location_link(location)
    raw link_to location, posts_path(:tags => location.name)
  end
  
  def tag_link(tags) 
    raw tags.map { |t| link_to t, posts_path(:tags => t.name) }.join(', ')
  end
end
