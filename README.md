# Open Trivia DB Mini Visualization Tool for JetBrains internship application

A small React-based data visualization tool built as part of a university / coding assignment.
The goal of the project was to **fetch and visualize trivia question statistics** from [Open Trivia DB](https://opentdb.com/) 
while applying **clean architecture principles** and ensuring **responsive, maintainable UI**.

---

## Project Requirements

The user should be able to:

- See the list of categories (e.g. Sport, Science, History)
- See the distribution of questions by category
- See the distribution of questions by difficulty
- Filter the data to see a single category

---

##  My Implementation

### Architecture

I used an **MVVM-like structure**:

- **Api layer** handles api calls.
- **Repository layer** handles api errors and maps data to domain models.
- **Custom React hooks** (e.g., `useTriviaData`) manage data, local state, and UI logic.
- **Functional components** render the UI and call hook functions.

This keeps logic and view concerns cleanly separated.

### UI and Design

- Built with **Material UI (MUI)** for fast, consistent styling and responsiveness:
- Visualizations implemented with **Recharts** (`BarChart` and `PieChart`).

### Features

- Fetch and display trivia statistics.
- Visualize:
    -  **Category Distribution** (Bar chart)
    -  **Difficulty Distribution** (Pie chart)
- **Category filtering**.
  - **Local** - click bar to filter
  - **API** - select category and get 50 new questions
- **Refresh button** to fetch new data.
- **Loading and Error states** with graceful handling.
- **Snackbar messages** for feedback.
- **Responsive** layout

---

## How to Run Locally

```bash
git clone https://github.com/CJovan02/opentdb-visualization-tool

cd trivia-visualization-tool

npm install

npm run dev
```
---

## Data Source

[Open Trivia DB](https://opentdb.com/).

---