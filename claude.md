# Claude Instructions for AdWizard

You are assisting with **AdWizard**, a Rails + Inertia.js application that generates Google Ads from a simple Typeform-style questionnaire.

Your job is to help write clean, idiomatic Ruby on Rails and Inertia.js code; provide focused design and architecture guidance; and avoid unnecessary complexity.

Refer to the README for project mission and scope.  
**Do not invent new features outside the MVP.**

---

## 📘 Project Summary (From README)

AdWizard helps small businesses create Google Ads from a simple, Typeform-like questionnaire.  
The user answers a few questions (URL, product, audience, budget, goal) and AdWizard outputs:

- Headlines  
- Descriptions  
- Keyword list  
- Suggested extensions  
- CSV formatted for Google Ads Editor  

The entire flow is:

**Form → LLM → Ad bundle → CSV download**

---

## 🛠 Tech Stack

- **Ruby on Rails** (primary backend)
- **Inertia.js** (frontend rendering)
- **React** (Inertia pages)
- **TailwindCSS** (styling)
- **OpenAI or Anthropic** (ad generation)
- **CSV builder** for Google Ads Editor exports

Use Rails conventions unless explicitly asked otherwise.  
Use Inertia.js for all non-static pages.

---

## 📂 Architecture Guidance

### Rails
- Controllers should be small and thin.
- Business logic belongs in **service objects**, not controllers or views.
- Use POROs in `app/services/` with clear, single responsibility.

### Inertia + React
- Keep components simple and functional.
- Do not introduce complex global state unless necessary.
- Use small, composable components for form inputs and results display.

### Prompts
- Prompts should be deterministic, structured, and return JSON-like output whenever possible.
- Never rely on freeform text responses from the LLM.

---

## 🧭 Rules for Assistance

### 1. Stay within the MVP
Do **not** suggest:
- Subscriptions or payments
- Project storage
- Full Google Ads API integration
- Advanced analytics

Only build what’s in the README + user instructions.

### 2. Inertia-first rendering
All user-facing pages should use Inertia + React.

### 3. Prefer clarity over cleverness
- Write explicit, easy-to-read code.
- Favor simplicity over abstractions.
- Avoid overengineering.

### 4. Help structure the app cleanly
When asked for file organization, generate:
app/controllers
app/services
app/frontend/pages
app/frontend/components

Use ShadCN components wherever possible 


### 5. When generating code
Return:
- The file path  
- The full content  
- No placeholders unless the user asks for them  
- Minimal necessary dependencies

### 6. Avoid hallucinations
If unsure about:
- a library,
- a Google Ads constraint,
- the correct CSV field names…

You must say:  
**“I’m not certain — here are the options and what you should confirm.”**

### 7. Keep scope small
If a user request drifts into “future features,” ask whether the feature should be added now or noted for later.

---

## 🎯 Default Goals When Writing Code

When asked to implement something, aim for:

1. **Working code** (correct, idiomatic Rails + Inertia)
2. **Minimal dependencies**
3. **Clear file structure**
4. **Simple testing or manual verification steps**
5. **Working LLM integration with structured output**

---

## 🧪 Example Workflow (How Claude Should Think)

When the user asks for “add the generate action”:

You should:

1. Create the Rails route  
2. Create the controller action  
3. Create/modify the Inertia page  
4. Create a service object for LLM prompting  
5. Return structured output  
6. Ensure basic error handling  
7. Update the frontend to display the output  

This is the expected level of guidance.

---

## ✨ Final Reminder

Stay close to the README mission:

**“Create and set up Google Ads from simple inputs.”**

Anything outside the mission or MVP should be treated as out-of-scope unless the user explicitly expands it.