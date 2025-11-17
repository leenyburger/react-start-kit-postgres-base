# AdWizard

AdWizard helps small businesses create Google Ads from a simple, Typeform-like questionnaire.  
The goal is to remove the overwhelm of Google Ads setup and make campaign creation accessible, fast, and intuitive.

## 🚀 Mission Statement

AdWizard creates and sets up Google Ads from a short series of basic questions.  
The user provides their website, what they sell, who they sell to, their budget, and their goal — and AdWizard generates a complete Google Ads bundle ready to upload.

In 30 seconds, a non-technical business owner can go from “I know nothing about Google Ads” to having a launch-ready ad campaign.

## ✨ MVP Scope

**Input:**  
A simple form that collects:
- Website URL  
- What the business sells  
- Target audience  
- Daily/Monthly budget  
- Campaign goal (traffic, leads, sales)

**Output:**  
AdWizard generates:
- ~10 recommended headlines  
- ~4 descriptions  
- Keyword list  
- Suggested ad extensions  
- Practical bidding/budget suggestions  
- A downloadable CSV formatted for Google Ads Editor

**What’s NOT included in MVP:**
- Authentication / user accounts  
- Saved projects  
- Stripe / billing  
- Full Google Ads API integration  
- Analytics or performance tracking

The focus is on a **single flow**:  
Form → LLM → Ad bundle → CSV download.

## 🛠 Tech Stack (Planned)

- Ruby on Rails  
- TailwindCSS (optional but likely)  
- OpenAI / Anthropic for generation  
- Simple service object architecture  
- CSV builder for Google Ads Editor output

## 🔮 Future Ideas (Post-MVP)

- Save project history  
- Export as full Google Ads API payload  
- Competitor URL analysis  
- Multi-campaign bundles  
- Login + subscription model  
- Ready-to-publish Google Ads API integration