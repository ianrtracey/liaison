require 'rails_helper'

RSpec.describe Document, type: :model do

  it "should not allow for docs where type or index is missing" do

    doc = Document.new(:index => "test")
    doc.valid?
    expect(doc.errors.messages.size).to_not eq(0)
    doc = Document.new(:type => "test")
    doc.valid?
    expect(doc.errors.messages.size).to_not eq(0)
    doc = Document.new(:type => "test", :index => "test")
    doc.valid?
    expect(doc.errors.messages.size).to eq(0)
  end

end
