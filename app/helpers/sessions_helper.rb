module SessionsHelper
	def current_user
		@player ||= Player.find(session[:player_id]) if session[:player_id]
	end
end
