class AddUserToTodoList < ActiveRecord::Migration
  def self.up
    change_table :todo_lists do |t|
      t.references :user
    end
  end

  def self.down
    remove_column :todo_lists, :user_id
  end
end
