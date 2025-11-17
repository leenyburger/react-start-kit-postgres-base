# frozen_string_literal: true

class AdGenerationsController < InertiaController 
  # Display the questionnaire form
  def new
  end

  # Receive form submission and display results
  def create
    brief = generation_params
    payload = AdGenerator.new(brief).call

    render inertia: "ad_generations/show", props: {
      brief: brief,
      payload: payload,
      submitted: true
    }
  end

  # Push generated campaign to Google Ads
  # Tomorrow: Will call GoogleAdsClient.new(payload).create!
  def push_to_google
    # Stub only – filled in tomorrow
    head :not_implemented
  end

  private

  def generation_params
    params.require(:ad_generation).permit(
      :website_url,
      :product_description,
      :target_audience,
      :budget,
      :campaign_goal
    )
  end
end
