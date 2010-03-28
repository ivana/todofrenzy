class TodoListsController < ApplicationController

  def index
    @lists = TodoList.find_all_by_user_id logged_in? ? current_user.id : 0, { :order => 'created_at DESC' }
    @todo_list = TodoList.new
    @item = Item.new
  end

  def create
    @list = TodoList.create(params[:todo_list]) do |list|
      list.user_id = current_user.id
    end
    
    render :partial => 'todo_list', :locals => { :list => @list }
  end

  def destroy
    render :json => TodoList.find(params[:id]).destroy
  end

  def clear # clear done items
    render :json => Item.destroy_all(:done => true, :todo_list_id => params[:id])
  end

  def about
  end

end
