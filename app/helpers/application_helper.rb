# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper

  def mac?
    request.user_agent =~ /\bMac OS\b/
  end

end
