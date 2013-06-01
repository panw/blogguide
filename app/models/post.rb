class Post < ActiveRecord::Base
  attr_accessible :content, :location_list, :tag_list
  acts_as_taggable
  acts_as_taggable_on :location
end
