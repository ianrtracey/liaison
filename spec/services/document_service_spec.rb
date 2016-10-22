require 'rails_helper'

RSpec.describe DocumentService, type: :model do

  it "should be available for health checks" do
    expect(DocumentService.health).to_not eq(nil)
  end

  it "can persist documents" do

  end


  it "can query for documents based on key words" do

  end


end
