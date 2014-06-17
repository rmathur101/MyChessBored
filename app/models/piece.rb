class Piece < ActiveRecord::Base
  belongs_to :game
  has_many :moves

include Movement

def get_piece_logic
    all_location_possiblities = []
    if self.piece_type == "rook" || self.piece_type == "queen"
      all_location_possiblities << get_horizontal_vertical_slide
    end
    if self.piece_type == "bishop" || self.piece_type == "queen"
      all_location_possiblities << get_diagonal_slide
    end
    if self.piece_type == "king"
      all_location_possiblities << get_king_step
    end
    if self.piece_type == "knight"
      all_location_possiblities << get_knight_hop
    end
    if self.piece_type == "pawn"
      all_location_possiblities << get_pawn_step
    end
    self.is_first_move = false
    all_location_possiblities.flatten!.sort
  end

end
