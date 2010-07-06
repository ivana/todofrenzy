class TodoListsController < ApplicationController

  def index
    @lists = current_user.todo_lists.latest
    @todo_list = current_user.todo_lists.new
    @item = @todo_list.items.new
  end

  def create
    @list = current_user.todo_lists.create! params[:todo_list]
    
    render :partial => 'todo_list', :locals => { :list => @list }
  end

  def destroy
    todo_list = current_user.todo_lists.find params[:id]
    todo_list.destroy
    render :json => todo_list
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
