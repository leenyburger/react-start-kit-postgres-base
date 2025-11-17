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
  def initialize(payload)
    @payload = payload
  end

  def create!
    # Tomorrow: real Google Ads API calls
    # Steps:
    # 1. Create Campaign Budget
    # 2. Create Campaign with budget
    # 3. Create Ad Group under campaign
    # 4. Create Responsive Search Ad in ad group
    # 5. Create Keywords in ad group

    raise NotImplementedError, "Google Ads API integration will be implemented tomorrow"
  end

  private

  attr_reader :payload
end
