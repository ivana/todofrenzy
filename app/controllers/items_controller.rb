class ItemsController < ApplicationController

  def create
    todo_list = current_user.todo_lists.find params[:todo_list_id]
    item = todo_list.items.create! params[:item]
    render item
  end

  def update
    item = Item.find params[:id]
    item.update_attributes params[:item]
    render :json => item
  end

end
