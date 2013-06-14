class Post < ActiveRecord::Base
  belongs_to :user
  attr_accessible :user_id, :content, :location_list, :tag_list
  acts_as_taggable
  acts_as_taggable_on :location
end
