# 🚀 Eisenhower Matrix & Daily Routine PWA

A modern, high-performance productivity web application built with **Angular (Standalone Components, Signals)** and styled with a custom dark theme. It combines the proven **Eisenhower Matrix** methodology with a daily habit/routine tracker to help you prioritize tasks efficiently and stay organized.

<img width="1915" height="1043" alt="eisinghower matrix" src="https://github.com/user-attachments/assets/b936407e-49f6-475a-ad63-0bc3341fb54d" />
---

## ✨ Features

- **Eisenhower Matrix Management**: Categorize tasks into four distinct quadrants (Urgent & Important, Important & Not Urgent, Urgent & Not Important, Neither).
- **Daily Routine Tracker**: Manage daily habits with a 24-hour deadline mechanism, quick refresh/reset actions, and persistent state.
- **Global Task Dashboard**: A unified view of all active and completed tasks, automatically sorted by priority with smooth visual strike-throughs.
- **Progressive Web App (PWA)**: Fully installable as a native desktop or mobile application.
- **Local Persistence**: Data is safely stored in the browser's `LocalStorage` for total privacy.
- **Sleek Dark Theme**: Clean, distraction-free UI optimized for productivity.

---

## 🛠️ Tech Stack

- **Framework**: Angular (v17+) using Standalone Components and Signals.
- **Styling**: SCSS / CSS Custom Properties (Variables) with a custom dark aesthetic.
- **State & Storage**: Angular Signals combined with browser `LocalStorage`.
- **PWA**: Angular Service Worker for offline capabilities.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── core/              # Services (LocalStorage) & Models
│   ├── features/          # Feature components (Matrix, Routine, TaskList)
│   ├── app.component.*    # Root layout & grid structure
│   └── app.routes.ts      # Routing configuration
└── styles.scss            # Global styles, variables & custom checkboxes
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI installed globally

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Ahmd-Naser/eisenhower-matrix.git](https://github.com/Ahmd-Naser/eisenhower-matrix.git)
   cd eisenhower-matrix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   ng serve
   ```


4. Open your browser and navigate to `http://localhost:4200/`.

---

## 💻 Building & Installation as a PWA

To build the application for production and test its PWA capabilities:

```bash
ng build
```

Once hosted (e.g., via GitHub Pages), you can click the **Install** icon directly in your browser's address bar to run it as a standalone desktop application.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YOUR_USERNAME/eisenhower-matrix/issues).

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
