class Item < ActiveRecord::Base
  belongs_to :todo_list

  validates_presence_of :description, :todo_list_id
  
  scope :done, :conditions => { :done => true }
end
