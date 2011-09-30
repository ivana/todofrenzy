class RemovePriorityFromItems < ActiveRecord::Migration
  def up
    remove_column :items, :priority
  end

  def down
    add_column :items, :priority, :string
  end
end
