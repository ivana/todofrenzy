class Item < ActiveRecord::Base
  belongs_to :todo_list

  before_validation_on_create :set_default_priority
  validates_presence_of :description, :priority, :todo_list_id
  validates_inclusion_of :priority, :in => %w(low normal high)

  protected

  def set_default_priority
    self.priority = 'normal' unless priority?
  end
end
