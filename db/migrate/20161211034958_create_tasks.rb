class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :room
      t.string :name
      t.integer :status

      t.timestamps null: false
    end
  end
end
