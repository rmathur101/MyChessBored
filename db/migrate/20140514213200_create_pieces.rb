class CreatePieces < ActiveRecord::Migration
  def change
    create_table :pieces do |t|
      t.integer :game_id
      t.string :color
      t.integer :location
      t.string :piece_type
      t.boolean :is_dead
      t.boolean :is_first_move, default: :true
      t.timestamps
    end
  end
end
