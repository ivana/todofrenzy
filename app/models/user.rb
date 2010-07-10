class User < ActiveRecord::Base
  has_many :todo_lists
  has_many :items, :through => :todo_lists
end
