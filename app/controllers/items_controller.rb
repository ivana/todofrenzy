class ItemsController < ApplicationController

  def create
    todo_list = current_user.todo_lists.find params[:todo_list_id]
    item = todo_list.items.create! params[:item]
    render item
  end

  def update
    item = current_user.items.find params[:id]
    # params will come in form of "item"=>{"<item id>"=>{"done"=>"1"}}
    item.update_attributes params[:item][params[:id]]
    render :json => item
  end

end
