class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :winner_id
      t.datetime :ended_at

      t.timestamps
    end
  end
end
