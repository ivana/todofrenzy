class CreateTodoLists < ActiveRecord::Migration
  def self.up
    create_table :todo_lists do |t|
      t.string :name, :null => false

      t.timestamps
    end
  end

  def self.down
    drop_table :todo_lists
  end
end
