# frozen_string_literal: true

# GoogleAdsClient Service
# Handles communication with Google Ads API
#
# Today: Stub only - raises NotImplementedError
# Tomorrow: Will implement actual Google Ads API calls to:
#   - Create Campaign Budget
#   - Create Campaign
#   - Create Ad Group
#   - Create Ad Group Ad (Responsive Search Ad)
#   - Create Ad Group Keywords
class GoogleAdsClient
  def initialize(payload, user)
    @payload = payload
    @user = user

    # App-level credentials (from ENV)
    @developer_token = ENV["GOOGLE_ADS_DEVELOPER_TOKEN"]
    @client_id = ENV["GOOGLE_ADS_CLIENT_ID"]
    @client_secret = ENV["GOOGLE_ADS_CLIENT_SECRET"]

    # User-level credentials (from database)
    # Tomorrow: These will come from user.google_ads_refresh_token, user.google_ads_customer_id
    @refresh_token = user.google_ads_refresh_token
    @customer_id = user.google_ads_customer_id
  end

  def create!
    # Tomorrow: real Google Ads API calls
    # Steps:
    # 1. Authenticate with user's refresh_token
    # 2. Create Campaign Budget in user's account
    # 3. Create Campaign with budget
    # 4. Create Ad Group under campaign
    # 5. Create Responsive Search Ad in ad group
    # 6. Create Keywords in ad group

    raise NotImplementedError, "Google Ads API integration will be implemented tomorrow"
  end

  private

  attr_reader :payload, :user, :developer_token, :client_id, :client_secret, :refresh_token, :customer_id
end
