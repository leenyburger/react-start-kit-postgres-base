# frozen_string_literal: true

class AdGenerationsController < InertiaController 
  # Display the questionnaire form
  def new
  end

  # Receive form submission and display results
  def create
    render inertia: "ad_generations/show", props: {
      generation: generation_params
    }
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
