require 'spec_helper'

describe Piece do
  let(:rook) {Piece.new(piece_type: "rook")}

  context "#valid_moves" do
    it "Rook can move correctly" do
      rook.location = 22
      expect(rook.get_piece_logic).to eq [6, 14, 17, 18, 19, 20, 21, 23, 24, 30, 38, 46, 54, 62]
    end

    it "Rook moves correctly when at top right corner" do
      rook.location = 8
      expect(rook.get_piece_logic).to eq [1, 2, 3, 4, 5, 6, 7, 16, 24, 32, 40, 48, 56, 64]
    end

    it "Rook moves correctly when at top left corner" do
      rook.location = 1
      expect(rook.get_piece_logic).to eq [2, 3, 4, 5, 6, 7, 8, 9, 17, 25, 33, 41, 49, 57]
    end

    it "Rook moves correctly when at bottom right corner" do
      rook.location = 64
      expect(rook.get_piece_logic).to eq [8, 16, 24, 32, 40, 48, 56, 57, 58, 59, 60, 61, 62, 63]
    end

    it "Rook moves correctly when at bottom left corner" do
      rook.location = 57
      expect(rook.get_piece_logic).to eq [1, 9, 17, 25, 33, 41, 49, 58, 59, 60, 61, 62, 63, 64]
    end

  end
end

describe Piece do
  let(:bishop) {Piece.new(piece_type: "bishop")}

  context "#valid_moves" do
    it "Bishop can move correctly" do
      bishop.location = 22
      expect(bishop.get_piece_logic).to eq [4, 8, 13, 15, 29, 31, 36, 40, 43, 50, 57]
    end

    it "Bishop can't go beyond bottom of board" do
      bishop.location = 61
      expect(bishop.get_piece_logic).to eq [25, 34, 40, 43, 47, 52, 54]
    end

    it "Bishop can't go beyond top-right of board" do
      bishop.location = 8
      expect(bishop.get_piece_logic).to eq [15, 22, 29, 36, 43, 50, 57]
    end

    it "Bishop can't go beyond top-left of board" do
      bishop.location = 1
      expect(bishop.get_piece_logic).to eq [10, 19, 28, 37, 46, 55, 64]
    end

    it "Bishop can't go beyond bottom-left of board" do
      bishop.location = 57
      expect(bishop.get_piece_logic).to eq [8, 15, 22, 29, 36, 43, 50]
    end

    it "Bishop can't go beyond bottom-right of board" do
      bishop.location = 64
      expect(bishop.get_piece_logic).to eq [1, 10, 19, 28, 37, 46, 55]
    end
  end
end

describe Piece do
  let(:queen) {Piece.new(piece_type: "queen")}

  context "#valid_moves" do
    it "Queen can move correctly" do
      queen.location = 22
      expect(queen.get_piece_logic).to eq [4, 6, 8, 13, 14, 15, 17, 18, 19, 20, 21, 23, 24, 29, 30, 31, 36, 38, 40, 43, 46, 50, 54, 57, 62]
    end

    it "Queen moves correctly when at top right corner" do
      queen.location = 8
      expect(queen.get_piece_logic).to eq [1, 2, 3, 4, 5, 6, 7, 15, 16, 22, 24, 29, 32, 36, 40, 43, 48, 50, 56, 57, 64]
    end

    it "Queen moves correctly when at top left corner" do
      queen.location = 1
      expect(queen.get_piece_logic).to eq [2, 3, 4, 5, 6, 7, 8, 9, 10, 17, 19, 25, 28, 33, 37, 41, 46, 49, 55, 57, 64]
    end

    it "Queen moves correctly when at bottom right corner" do
      queen.location = 64
      expect(queen.get_piece_logic).to eq [1, 8, 10, 16, 19, 24, 28, 32, 37, 40, 46, 48, 55, 56, 57, 58, 59, 60, 61, 62, 63]
    end

    it "Queen moves correctly when at bottom left corner" do
      queen.location = 57
      expect(queen.get_piece_logic).to eq [1, 8, 9, 15, 17, 22, 25, 29, 33, 36, 41, 43, 49, 50, 58, 59, 60, 61, 62, 63, 64]
    end

  end
end

describe Piece do
  let(:king) {Piece.new(piece_type: "king")}

  context "#valid_moves" do
    it "King can move correctly" do
      king.location = 43
      expect(king.get_piece_logic).to eq [34, 35, 36, 42, 44, 50, 51, 52]
    end

    it "King moves correctly when at top right corner" do
      king.location = 8
      expect(king.get_piece_logic).to eq [7, 15, 16]
    end

    it "King moves correctly when at top left corner" do
      king.location = 1
      expect(king.get_piece_logic).to eq [2, 9, 10]
    end

    it "King moves correctly when at bottom right corner" do
      king.location = 64
      expect(king.get_piece_logic).to eq [55, 56, 63]
    end

    it "King moves correctly when at bottom left corner" do
      king.location = 57
      expect(king.get_piece_logic).to eq [49, 50, 58]
    end
  end
end

describe Piece do
  let(:knight) {Piece.new(piece_type: "knight")}

  context "#valid_moves" do
    it "Knight can move correctly" do
      knight.location = 19
      expect(knight.get_piece_logic).to eq [2, 4, 9, 13, 25, 29, 34, 36]
    end

    it "Knight can't go off top of board if at top row" do
      knight.location = 62
      expect(knight.get_piece_logic).to eq [45, 47, 52, 56]
    end

    it "Knight can't go off top of board if at penultimate row" do
      knight.location = 53
      expect(knight.get_piece_logic).to eq [36, 38, 43, 47, 59, 63]
    end

    it "Knight can't go off right side of board at 8th col" do
      knight.location = 64
      expect(knight.get_piece_logic).to eq [47, 54]
    end

    it "Knight can't go off right side of board at 7th col" do
      knight.location = 55
      expect(knight.get_piece_logic).to eq [38, 40, 45, 61]
    end

    it "Knight can't go off top of board if at bottom row" do
      knight.location = 6
      expect(knight.get_piece_logic).to eq [12, 16, 21, 23]
    end

    it "Knight can't go off top of board if at penultimate bottom row" do
      knight.location = 15
      expect(knight.get_piece_logic).to eq [5, 21, 30, 32]
    end

     it "Knight can't go off left side of board at 1st col" do
      knight.location = 1
      expect(knight.get_piece_logic).to eq [11, 18]
    end

    it "Knight can't go off left side of board at 2nd col" do
      knight.location = 50
      expect(knight.get_piece_logic).to eq [33, 35, 44, 60]
    end
  end

end

describe Piece do
  let(:pawn) {Piece.new(piece_type: "pawn")}

  context "#valid_moves" do
    it "Pawn can step one (white)" do
      pawn.location = 33
      pawn.is_first_move = false
      pawn.color = "white"
      expect(pawn.get_piece_logic).to eq [25]
    end

    it "Pawn step two if first move (white)" do
      pawn.location = 53
      pawn.color = "white"
      pawn.is_first_move = true
      expect(pawn.get_piece_logic).to eq [37, 45]
    end

    it "Pawn can step one (black)" do
      pawn.location = 27
      pawn.is_first_move = false
      pawn.color = "black"
      expect(pawn.get_piece_logic).to eq [35]
    end

    it "Pawn step two if first move (black)" do
      pawn.location = 12
      pawn.is_first_move = true
      pawn.color = "black"
      expect(pawn.get_piece_logic).to eq [20, 28]
    end

  end
end

