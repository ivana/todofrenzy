class ItemsController < ApplicationController

  def create
    @item = Item.create(params[:item])
    render :partial => 'item', :locals => { :item => @item }
  end

  def update
    item = Item.find(params[:id])
    item.done = !!params[:done]
    item.save
    render :json => item
  end

end
