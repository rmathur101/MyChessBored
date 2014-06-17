class CreatePlayerGames < ActiveRecord::Migration
  def change
    create_table :player_games do |t|
      t.integer :game_id
      t.integer :player_id

      t.timestamps
    end
  end
end
