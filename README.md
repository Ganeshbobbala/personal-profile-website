# Bobbala Ganesh - Personal Profile Website

A modern, clean, and professional personal profile website designed for **Bobbala Ganesh**, an aspiring Software Developer, Java Developer, and Full Stack Developer.

This repository features a clean separation of concerns, split into a **Frontend** client folder and an optional **Backend** server folder.

---

## 🚀 Key Features

* **🌓 Clean Dark & Light Theme**: Integrated with local storage persistence and CSS variables. The site automatically detects system preferences on first load and allows seamless toggling via a navbar control.
* **✨ Modern Custom Animations**:
  * **Scroll-Reveal (Intersection Observer)**: Layout elements smoothly fade and translate up as they enter the viewport.
  * **Scroll-Spy**: Active navigation links dynamically highlight based on the current scroll position.
  * **Interactive Transitions**: Smooth scale-ups, subtle drop shadows, and text accents on interactive elements.
  * **Responsive Hamburger Drawer**: Built-in responsive slide-in sidebar menu for all tablet and mobile screen sizes.
* **📧 Serverless Email Delivery (Web3Forms)**:
  * The contact form submits entries directly to the **Web3Forms Cloud API**.
  * Successfully verified to send email notifications to **`ganeshbobbala479@gmail.com`** using the user access key `f68f56d8-f04c-484b-b05b-098118c61c45`.
  * Allows 100% static hosting without running any custom mail server or backend API.
* **🎨 Premium Custom Vector Graphics**: Interactive custom coding/developer SVG illustration with modern gradients on the hero section.

---

## 📂 Project Structure

```text
/personal profile website
  ├── /frontend
  │     ├── index.html       # Single Page Application HTML structure (HTML5)
  │     ├── style.css        # Custom CSS variables, Dark mode overrides, & Animations
  │     ├── script.js        # Scroll Spy, Mobile navigation, and Web3Forms Fetch logic
  │     └── /assets          # Handcrafted developer SVGs & animations
  │
  ├── /backend               # (Optional) Local server and developer tool utility
  │     ├── server.js        # Node.js + Express API server to serve static files
  │     ├── package.json     # Node scripts & project dependencies
  │     ├── .env             # Environment file defining local PORT
  │     └── /data
  │           └── contacts.json # Local file backup storing form submissions
  │
  └── README.md              # Documentation & guide
```

---

## 💻 Tech Stack

### Frontend
- **HTML5**: Structured semantic tags, optimized SEO meta tags, and full ARIA accessibility descriptors.
- **CSS3**: Built entirely on standard vanilla CSS. Features CSS variables for dark/light themes, Flexbox & Grid layouts, and hardware-accelerated animations.
- **JavaScript (ES6+)**: Custom dynamic features using the **Intersection Observer API** (fade-in-up effect), scroll event-listeners (Scroll Spy), and asynchronous AJAX `fetch()` API.

### Backend (Local API Utility)
- **Node.js & Express**: Provides static file serving and health metrics.
- **Nodemailer**: Optional local SMTP mail delivery driver if credentials are provided in `.env`.
- **File System (FS)**: Appends message entries locally to a simple flat JSON file database (`data/contacts.json`).

---

## 🛠️ How to Run & Deploy

### Option 1: Run Locally (Using Express Server)
To run the website locally through the Node/Express backend server:

1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install local Node.js packages:
   ```bash
   npm install
   ```
3. Start the backend application:
   ```bash
   npm start
   ```
4. Open your browser and navigate to **`http://localhost:5000`** to view the live site.

---

### Option 2: Deploy to GitHub Pages (100% Free Hosting)
Because the frontend has been integrated with **Web3Forms**, the website runs completely independently of any custom servers! You can host it globally on **GitHub Pages** for free:

1. Push all your code changes to GitHub:
   ```bash
   git add .
   * git commit -m "docs: Update README"
   * git push origin main
   ```
2. Navigate to your repository page on **GitHub** (`https://github.com/Ganeshbobbala/personal-profile-website`).
3. Click on the **Settings** tab.
4. On the left sidebar, click on **Pages** (under the "Code and automation" section).
5. Under **Build and deployment**:
   * Set Source to **Deploy from a branch**.
   * Choose the **`main`** branch and select the **`/ (root)`** folder.
   * Click **Save**.
6. GitHub will generate a URL for your website (e.g., `https://Ganeshbobbala.github.io/personal-profile-website/`).
7. Since our files are contained in `/frontend`, your portfolio will be live at:
   **`https://Ganeshbobbala.github.io/personal-profile-website/frontend/index.html`**

---

## 📬 Contact Form Configuration (Web3Forms API)
The frontend utilizes Web3Forms to capture messages without showing or needing server credentials. If you ever need to change your email address or generate a new access token:
1. Visit [Web3Forms](https://web3forms.com) and input your desired receiver email address to obtain a new API key.
2. Open your [frontend/script.js](file:///frontend/script.js) file.
3. Locate line `146`:
   ```javascript
   access_key: "YOUR_NEW_KEY_HERE"
   ```
4. Replace the string with your new key, commit, and push.
