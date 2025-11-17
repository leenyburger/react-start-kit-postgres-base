# frozen_string_literal: true

# AdGenerator Service
# Takes a brief (user inputs) and generates the canonical payload
# structure for Google Ads campaign creation.
#
# Today: Returns mock data
# Tomorrow: Will call LLM (Claude/OpenAI) for real generation
class AdGenerator
  def initialize(brief)
    @brief = brief
  end

  def call
    {
      campaign: {
        name: campaign_name,
        goal: campaign_goal,
        daily_budget: daily_budget
      },
      ad_group: {
        name: "Main Ad Group"
      },
      ads: [
        {
          type: "RESPONSIVE_SEARCH_AD",
          headlines: generate_headlines,
          descriptions: generate_descriptions
        }
      ],
      keywords: generate_keywords
    }
  end

  private

  attr_reader :brief

  def campaign_name
    # Extract business name from URL or use product description
    business_name = extract_business_name(brief[:url]) || brief[:product_description]
    "AdWizard – #{business_name}"
  end

  def campaign_goal
    # Map user's goal to Google Ads goal format
    case brief[:goal]
    when "leads"
      "LEADS"
    when "traffic"
      "TRAFFIC"
    when "sales"
      "SALES"
    else
      "LEADS" # default
    end
  end

  def daily_budget
    # Convert monthly budget to daily (assuming 30 days)
    monthly = brief[:budget].to_f
    (monthly / 30.0).round(2)
  end

  def generate_headlines
    # Mock headlines based on product/service
    # Tomorrow: Replace with LLM generation
    product = brief[:product_description]
    [
      "#{product} - Quality Service",
      "Get Started with #{product}",
      "Affordable #{product}",
      "Best #{product} in Town",
      "Professional #{product}",
      "Top-Rated #{product}",
      "#{product} Experts",
      "Trusted #{product} Provider",
      "Premium #{product}",
      "Local #{product} Service"
    ]
  end

  def generate_descriptions
    # Mock descriptions
    # Tomorrow: Replace with LLM generation
    audience = brief[:target_audience]
    product = brief[:product_description]
    [
      "Perfect for #{audience}. Get started today!",
      "Quality #{product} designed for #{audience}.",
      "Trusted by customers. Call now for a free quote.",
      "Fast, reliable, and affordable. Contact us today!"
    ]
  end

  def generate_keywords
    # Mock keywords based on product
    # Tomorrow: Replace with LLM generation
    product = brief[:product_description]
    base_keywords = product.downcase.split(/\W+/).reject(&:empty?)

    keywords = []

    # Add product-related keywords
    base_keywords.each do |word|
      keywords << {match_type: "BROAD", text: word}
      keywords << {match_type: "PHRASE", text: "#{word} service"}
      keywords << {match_type: "PHRASE", text: "best #{word}"}
    end

    # Add generic service keywords
    keywords << {match_type: "BROAD", text: brief[:product_description].downcase}
    keywords << {match_type: "PHRASE", text: "#{brief[:product_description]} near me"}
    keywords << {match_type: "EXACT", text: brief[:product_description].downcase}

    keywords.first(15) # Limit to 15 keywords for now
  end

  def extract_business_name(url)
    return nil if url.blank?

    # Extract domain from URL
    uri = URI.parse(url)
    domain = uri.host || url

    # Remove www. and TLD
    domain.gsub(/^www\./, "").split(".").first&.titleize
  rescue URI::InvalidURIError
    nil
  end
end
