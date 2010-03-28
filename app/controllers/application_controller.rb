# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password

  include Twitter::Login::Helpers

  def current_user
    @current_user ||= twitter_user && User.find_or_create_by_username(twitter_user.screen_name)
  end
  helper_method :current_user

  def logged_in?
    !!current_user
  end
  helper_method :logged_in?
  
end
