class AddPositionToTodoLists < ActiveRecord::Migration
  def change
    add_column :todo_lists, :position, :integer, :default => 0
  end
end
