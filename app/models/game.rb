class Game < ActiveRecord::Base
  has_many :playersgames
  has_many :players, through: :playersgames
  has_many :pieces
  has_many :moves, through: :pieces
  belongs_to :group
end
