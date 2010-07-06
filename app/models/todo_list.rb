class TodoList < ActiveRecord::Base
  belongs_to :user
  has_many :items, :dependent => :destroy, :order => :done

  validates_presence_of :name, :user_id 
  
  scope :latest, :order => 'created_at DESC'
end
