# LifeOS

A personal life management website built with plain HTML, CSS and JavaScript. No install and no build step.

## Files
- `index.html`  page structure (landing page, dashboard shell, login window)
- `style.css`   all styling, light theme by default and a dark theme (moon button)
- `script.js`   all behaviour: intro animation, tasks with priority score, goals, habits, focus timer, journal, analytics, login and profile, AI assistant

## Run it
Keep the three files in the same folder and double-click `index.html`.
The footer shows the version number so you can confirm you have the latest files.
If changes do not appear, hard refresh with Ctrl+F5.

## Publish on GitHub Pages
1. Create a repository and upload all the files from this folder.
2. Settings, Pages, deploy from the `main` branch, `/ (root)`.
3. Your site appears at `https://YOUR-USERNAME.github.io/REPO-NAME/` after about a minute.

## Features
- Sign up, log in and log out (demo accounts kept only in your browser, passwords stored as hashes) and a profile page
- Tasks and planner with a rule-based priority score and a "Why this priority?" explanation
- Calendar view: tasks and goal target dates by month, with quick add for any day
- Goals with a current state, an ideal state and milestones
- Habits with streaks, focus timer with history, journal, analytics and a documented Life Score
- A headline line that rotates words (routines, focus, habits, goals, days)
- Benefits, sample testimonials (labelled) and a Questions answered section
- Light theme by default, dark theme with the moon button

## AI assistant
Without a key the assistant runs in a clearly labelled demo mode. To use real AI, open Settings, Connect your own AI key, and paste an Anthropic API key. It stays in your browser and goes only to Anthropic. Never write a key into the code or commit one to GitHub.

## Data
Everything is saved in your browser's local storage.
