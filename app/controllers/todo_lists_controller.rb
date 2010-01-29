class TodoListsController < ApplicationController

  def index
    @lists = TodoList.all(:order => 'created_at DESC')
    @todo_list = TodoList.new
  end

  def create
    todo_list = TodoList.create params[:todo_list]
    render :json => todo_list
  end

end
