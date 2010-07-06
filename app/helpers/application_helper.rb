module ApplicationHelper

  def mac?
    request.user_agent =~ /\bMac OS\b/
  end

end
