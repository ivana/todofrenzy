class ItemsController < ApplicationController

  def create
    render :json => Item.create(params[:item])
  end

  def update
    item = Item.find(params[:id])
    item.done = !!params[:done]
    item.save
    render :json => item
  end

end
