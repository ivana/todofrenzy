class TodoListsController < ApplicationController

  def index
    if logged_in?
      @lists = current_user.todo_lists.latest
      @todo_list = current_user.todo_lists.new
      @item = @todo_list.items.new
    else
      render :about
    end
  end

  def create
    @list = current_user.todo_lists.create! params[:todo_list]
    
    render :partial => 'todo_list', :locals => { :list => @list }
  end

  def destroy
    todo_list = current_user.todo_lists.destroy params[:id]
    
    render :json => todo_list
  end

  # clear done items
  def clear
    todo_list = TodoList.find params[:id]
    done_items = todo_list.items.done.destroy_all
    
    render :json => items
  end

  def about
  end

end
