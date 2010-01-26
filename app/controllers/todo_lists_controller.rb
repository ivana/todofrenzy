class TodoListsController < ApplicationController

  def index
    @lists = TodoList.all
  end
end
