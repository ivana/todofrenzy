class ItemsController < ApplicationController

  def create
    @item = Item.create params[:item]
    render @item
  end

  def update
    item = Item.find params[:id]
    item.update_attributes params[:item]
    render :json => item
  end

end
