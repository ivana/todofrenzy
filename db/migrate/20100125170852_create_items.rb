class CreateItems < ActiveRecord::Migration
  def self.up
    create_table :items do |t|
      t.string :description, :null => false
      t.boolean :done, :null => false, :default => false
      t.string :priority, :null => false

      t.references :todo_list

      t.timestamps
    end
  end

  def self.down
    drop_table :items
  end
end
