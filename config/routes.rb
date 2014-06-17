RailsSkeleton::Application.routes.draw do
  root to: 'game#game'
  post '/get_piece_info' => "game#get_piece_info"
end
