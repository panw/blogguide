# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def rand_tags
  return [Forgery(:basic).color, Forgery(:currency).description, 
          Forgery(:personal).language, Forgery(:personal).race].join(',')
end

10.times do
  @post =Post.new(content: Forgery(:lorem_ipsum).paragraphs(Random.rand(2..5)), 
                  location_list: Forgery(:address).city, 
                  tag_list: rand_tags+",#{Forgery(:address).city}")
  @post.save
end