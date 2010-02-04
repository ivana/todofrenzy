class ItemsController < ApplicationController

  def create
    render :json => Item.create(params[:item])
  end

end
