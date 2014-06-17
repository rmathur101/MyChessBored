class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery 


  private
  def current_user
    @player ||= Player.find(session[:player_id]) if session[:player_id]
  end
  helper_method :current_user

end
