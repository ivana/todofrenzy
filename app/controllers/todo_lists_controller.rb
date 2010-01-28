class TodoListsController < ApplicationController

  def index
    @lists = TodoList.all
    @todo_list = TodoList.new
  end

  def create
    todo_list = TodoList.create params[:todo_list]
    render :json => todo_list
  end

end
