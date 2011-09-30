class TodoListsController < ApplicationController

  def index
    if logged_in?
      @lists = current_user.todo_lists.latest.includes(:items)
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
    todo_list = current_user.todo_lists.find params[:id]
    todo_list.destroy
    
    render :json => todo_list
  end

  def clear # clear done items
    todo_list = current_user.todo_lists.find params[:id]
    done_items = todo_list.items.done.destroy_all
    
    render :json => done_items
  end

  def sort
    params[:todo_list].each_with_index do |lid, i|
      TodoList.find(lid).update_attribute :position, i
    end
    render :json => true
  end

  def about
  end

end
