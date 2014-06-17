class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :name
      t.integer :player_id
      t.integer :game_id

      t.timestamps
    end
  end
end
