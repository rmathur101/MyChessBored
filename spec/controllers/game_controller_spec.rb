require 'spec_helper'

describe GameController do

  # describe "GET 'dashboard'" do
  #   it "returns http success" do
  #     get 'dashboard'
  #     response.should be_success
  #   end
  # end

  describe "GET 'game'" do
    it "returns http success" do
      get 'game'
      response.should be_success
    end
  end

end
