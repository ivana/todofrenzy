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

  # clear done items
  def clear
    todo_list = TodoList.find params[:id]
    # FIXME: replace this with `destroy_all` once it's fixed in Rails
    done_items = todo_list.items.done
    items = done_items.all(:select => :id)
    done_items.delete_all
    
    render :json => items
  end

  def about
  end

end
