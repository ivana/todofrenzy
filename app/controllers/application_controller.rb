class ApplicationController < ActionController::Base
  protect_from_forgery

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
