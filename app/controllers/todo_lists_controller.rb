class TodoListsController < ApplicationController

  def index
    @lists = TodoList.latest
    @todo_list = TodoList.new
    @item = Item.new
  end

  def create
    render :json => TodoList.create(params[:todo_list])
  end

  def destroy
    render :json => TodoList.find(params[:id]).destroy
  end

  def clear # clear done items
    render :json => Item.destroy_all(:done => true, :todo_list_id => params[:id])
  end

end
