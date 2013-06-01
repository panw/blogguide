class TagsController < ApplicationController
  def index
    @tags = Tag.find(:all, :conditions => ['name LIKE ?', "#{params[:search_term]}%"])
    respond_to do |format|
      format.json { render json: @tags }
    end
  end
end