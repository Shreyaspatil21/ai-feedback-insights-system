# Two-Dashboard AI Feedback System (Recruiter Ready)

A premium, full-stack Next.js application designed to demonstrate advanced Agentic AI engineering skills.

## 🚀 Key Features

### 1. Two Professional Dashboards
*   **User Dashboard**: A public-facing, glassmorphism-styled feedback form with complex `framer-motion` animations.
*   **Admin Dashboard**: A strictly secured, password-gated (`admin_secret_123`) internal portal for analytics.

### 2. Advanced AI Integration
*   **Hybrid AI Engine**: Seamlessly switches between **Google Gemini** and **OpenAI** based on available keys.
*   **Auto-Recovery**: Implements a "Smart Fallback" system that generates high-quality synthetic analysis if APIs are down (Network/Quota issues), ensuring 100% uptime demos.
*   **Prompt Engineering**: Uses 3 distinct prompt variants (A, B, C) to optimize for summaries, empathy, and actionable insights.

### 3. Professional Data Architecture
*   **SQLite Database**: Uses a real local SQL database (`database.sqlite`) for reliable persistence.
*   **Data Seed Scripts**: Includes automated scripts to populate the database with realistic synthetic data for demos.

### 4. Enterprise Analytics
*   **Live Metrics**: Real-time NPS (Net Promoter Score) tracking.
*   **Visualizations**: Interactive charts for Rating Distribution and Volume built with `recharts`.

## 🛠 Skills Demonstrated for Recruiters

*   **Full-Stack Architecture**: Next.js 15 (App Router), TypeScript, and Server Actions.
*   **Prompt Engineering**: Designing and testing multiple LLM personas (Customer Support vs Data Analyst).
*   **Database Design**: Implementing Schema-based storage and seeding strategies.
*   **UI/UX Design**: Creating "Premium" feel using Tailwind CSS v4, gradients, and micro-interactions.
*   **Resiliency Patterns**: Implementing retry logic and fallbacks for external API dependencies.
*   **DevOps**: Environment variable management and build optimization.

## 🏁 How to Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    *   The project comes with a robust configuration. Ensure `.env.local` has your API keys (Gemini or OpenAI).

3.  **Seed Data (Optional)**
    *   Populate the dashboard instantly:
    ```bash
    node scripts/seed_db.js
    ```

4.  **Start the Server**
    ```bash
    npm run dev
    ```

## 🔗 Access Links

*   **User Dashboard**: [http://localhost:3000](http://localhost:3000)
*   **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
    *   *Password*: `admin_secret_123`

---
*Built to impress.*
