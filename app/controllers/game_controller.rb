class GameController < ApplicationController
  def game
  end

  def get_piece_info
    piece = Piece.new(color: params[:piece_color], location: params[:piece_location], piece_type: params[:piece_type], is_dead: false) #is_first_move: false NOTES: need to make update_attributes
    moves = piece.get_piece_logic
    render :json => [moves]
  end
end
