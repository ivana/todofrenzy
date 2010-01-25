require 'test_helper'

class ItemTest < ActiveSupport::TestCase

  test "default priority" do
    todo_list1 = TodoList.create :name => 'lista'
    item1 = Item.create :description => "I have default priority", :todo_list => todo_list1
    assert !item1.new_record?
    assert_equal "normal", item1.priority
    item2 = Item.create :description => "OMG IMPORTANT", :priority => "high", :todo_list => todo_list1 
    assert !item2.new_record?
    assert_equal "high", item2.priority
  end

end
