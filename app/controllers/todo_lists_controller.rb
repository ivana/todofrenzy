class TodoListsController < ApplicationController

  def index
    @lists = TodoList.all(:order => 'created_at DESC')
    @todo_list = TodoList.new
  end

  def create
    render :json => TodoList.create(params[:todo_list])
  end

  def destroy
    render :json => TodoList.find(params[:id]).destroy
  end

end
