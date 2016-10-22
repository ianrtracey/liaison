class Document < ActiveRecord::Base
  attr_accessor :index, :type, :body

  validates :index, :type, presence: true
end
