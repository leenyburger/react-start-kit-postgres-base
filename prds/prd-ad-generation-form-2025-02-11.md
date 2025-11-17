# Product Requirements Document: Ad Generation Form (Day 1 MVP)
Generated: 2025-02-11
Author: Product Manager Agent
Status: Draft
Timeline: 1 Hour

## Executive Summary
Build the foundational questionnaire interface for AdWizard - a Typeform-like form that collects business information for Google Ads generation. This is Day 1 of the MVP: form collection and data display only (no LLM integration yet).

## Product Vision
### Problem Statement
Users need a simple, friendly interface to input their business information for ad generation. The interface should feel modern and approachable, not overwhelming like traditional Google Ads setup.

### Solution Overview
A clean, single-page Typeform-style questionnaire that collects 5 key pieces of information and displays the collected data back to the user as confirmation.

### Value Proposition
- Non-intimidating data collection
- Clear, step-by-step or single-form interface
- Immediate visual feedback on submitted data
- Foundation for LLM integration (Day 2)

## Target Users
### Primary Persona
**Small Business Owner Sarah**
- Runs a local service business (e.g., plumbing, yoga studio, bakery)
- No marketing background
- Wants to advertise on Google but finds it overwhelming
- Willing to spend 30 seconds filling out a simple form
- Needs clear, jargon-free interface

## Functional Requirements
### Core Features

#### 1. Ad Generation Questionnaire Form
**Description:** A Typeform-like form interface to collect business information
**Priority:** Must Have

**Form Fields:**
1. **Website URL**
   - Input type: Text (URL validation)
   - Placeholder: "https://yourbusiness.com"
   - Required: Yes

2. **What do you sell?**
   - Input type: Textarea
   - Placeholder: "e.g., organic coffee beans, yoga classes, plumbing services"
   - Required: Yes
   - Help text: "Describe your product or service in a few words"

3. **Who is your target audience?**
   - Input type: Textarea
   - Placeholder: "e.g., health-conscious millennials, homeowners in Seattle, busy professionals"
   - Required: Yes
   - Help text: "Who are you trying to reach?"

4. **What is your budget?**
   - Input type: Number
   - Placeholder: "500"
   - Required: Yes
   - Help text: "Monthly budget in dollars"
   - Validation: Positive number

5. **What is your campaign goal?**
   - Input type: Select/Radio
   - Options:
     - "Drive traffic to website"
     - "Generate leads"
     - "Increase sales"
   - Required: Yes

**Acceptance Criteria:**
- [ ] Form renders on `/ad_generations/new` route
- [ ] All 5 fields are present and functional
- [ ] Form validation prevents submission of empty required fields
- [ ] Form has clean, Typeform-like aesthetic (single-column, spacious, clear labels)
- [ ] Submit button is clearly labeled ("Generate Ad Preview" or similar)

#### 2. Ad Generations Controller
**Description:** Rails controller to handle form submission
**Priority:** Must Have

**Routes:**
- `GET /ad_generations/new` - Display the questionnaire form
- `POST /ad_generations` - Receive form submission and display results

**Acceptance Criteria:**
- [ ] Controller created at `app/controllers/ad_generations_controller.rb`
- [ ] `new` action renders Inertia page with form
- [ ] `create` action receives params and returns data to results page
- [ ] No database persistence (stateless for now)
- [ ] Strong parameters for form inputs

#### 3. Results Display Page
**Description:** Display the collected form data back to the user
**Priority:** Must Have

**Display Format:**
- Show all 5 inputs in a clean, formatted layout
- Optional: Display as JSON for debugging
- Clear visual confirmation that data was received

**Acceptance Criteria:**
- [ ] Results page at `/ad_generations/create` or separate results Inertia page
- [ ] Displays all submitted form values
- [ ] Clean, readable format
- [ ] "Start Over" or "New Generation" button to return to form

### User Flow
1. User navigates to `/ad_generations/new` (or root path redirects here)
2. User sees Typeform-like questionnaire
3. User fills out 5 fields
4. User clicks "Generate" button
5. Form submits to `POST /ad_generations`
6. Controller receives data and renders results page
7. User sees their submitted data displayed back
8. User can start over with new form

## Non-Functional Requirements
### Performance
- Form should load in < 1 second
- Form submission should complete in < 500ms (no external API calls)

### User Experience
- Mobile-responsive (works on phone, tablet, desktop)
- Clear error messages for validation failures
- Accessible form labels and inputs

### Platform Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design

## Technical Considerations
### Architecture Overview
- **Backend:** Rails controller (`AdGenerationsController`)
- **Frontend:** Inertia.js + React page component
- **Styling:** TailwindCSS + ShadCN components (if available)
- **Routing:** Standard Rails routes

### File Structure
```
app/
├── controllers/
│   └── ad_generations_controller.rb
├── frontend/
│   ├── pages/
│   │   └── ad_generations/
│   │       ├── new.tsx          (form page)
│   │       └── show.tsx         (results page, optional)
│   └── components/
│       └── AdGenerationForm.tsx (optional, if separated)
config/
└── routes.rb                    (add ad_generations routes)
```

### Dependencies
- Existing: Rails, Inertia.js, React, TailwindCSS
- No new external dependencies required

### Data Requirements
**No database model for Day 1**
- Form data passed as params only
- No persistence
- AdGeneration model will be added Day 2+

## Success Criteria
### Day 1 Definition of Done
- [ ] User can access questionnaire form at `/ad_generations/new`
- [ ] User can fill out all 5 fields
- [ ] Form validates required fields
- [ ] User can submit form
- [ ] User sees submitted data displayed back
- [ ] UI feels clean and Typeform-like (not overwhelming)
- [ ] Form is mobile-responsive
- [ ] Code follows Rails + Inertia conventions per CLAUDE.md

### User Acceptance Test
1. Open browser to `http://localhost:3000/ad_generations/new`
2. Fill out form with sample business data
3. Click submit
4. Verify all 5 inputs are displayed back correctly
5. Click "Start Over" and verify form resets

## Timeline and Milestones
**Total Time: 1 Hour**

### Breakdown
- **15 min:** Create controller, routes, and basic structure
- **30 min:** Build Typeform-like form UI in React/Inertia
- **10 min:** Wire up form submission and results display
- **5 min:** Test and polish

### Key Milestones
- Minute 15: Routes and controller working
- Minute 45: Form UI complete and submitting
- Minute 60: End-to-end flow working

## Out of Scope (Day 1)
- ❌ LLM integration (Day 2)
- ❌ Database persistence (Day 2)
- ❌ AdGeneration model (Day 2)
- ❌ CSV export (Day 3+)
- ❌ Authentication gating (exists but not required for form)
- ❌ Multi-step wizard (nice-to-have, single-page form is fine)
- ❌ Field validation beyond required/type checking

## Future Enhancements (Day 2+)
- Add AdGeneration model to persist submissions
- Integrate LLM (OpenAI/Anthropic) to generate actual ad content
- Display generated headlines, descriptions, keywords
- Add CSV export functionality
- Add user authentication requirement
- Add generation history page

## Open Questions
- Should the form be single-page (all fields at once) or multi-step Typeform style?
  - **Recommendation:** Single-page for Day 1 (faster to build)
- Should results page be separate component or inline?
  - **Recommendation:** Separate page for clarity
- Should we add navigation from home/dashboard to this form?
  - **Recommendation:** Yes, add link from dashboard

## Appendix
### Design Inspiration
- Typeform: Clean, spacious, one question at a time feel (adapted to single page)
- TailwindUI form examples
- ShadCN form components

### References
- Project README: `/README.md`
- Claude Instructions: `/CLAUDE.md`
- Existing Inertia pages: `app/frontend/pages/`

---

**Next Steps After Day 1:**
1. Review completed form with user
2. Plan Day 2: Add AdGeneration model + LLM integration
3. Test with real business examples
