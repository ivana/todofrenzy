class TodoListsController < ApplicationController

  def index
    @lists = TodoList.all_desc
    @todo_list = TodoList.new
    @item = Item.new
  end

  def create
    @list = TodoList.create(params[:todo_list])
    render :partial => 'todo_list', :locals => { :list => @list }
  end

  def destroy
    render :json => TodoList.find(params[:id]).destroy
  end

  def clear # clear done items
    render :json => Item.destroy_all(:done => true, :todo_list_id => params[:id])
  end

end
