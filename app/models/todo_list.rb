class TodoList < ActiveRecord::Base
  has_many :items, :dependent => :destroy, :order => :done

  validates_presence_of :name
end
