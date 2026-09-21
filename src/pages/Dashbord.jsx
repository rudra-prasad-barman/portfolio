import React, { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
/**
 * ============================================================
 * Dashboard.jsx (Global Layout Wrapper)
 * ============================================================
 * This component acts as the foundational layout for your app.
 * It manages:
 * 1. Global Dark/Light mode state.
 * 2. Full-screen layout structure (Flexbox to push footer down).
 * 3. Global background and text color transitions.
 * 
 * Instructions:
 * - Import your Header, Main, and Footer components here later.
 * - Replace the placeholder <header>, <main>, and <footer> tags 
 *   with your actual components.
 * - Pass `dark` and `toggleDark` to your Header so the toggle button works.
 * ============================================================
 */

export default function Dashboard() {
  // --- 1. Global Theme State Management ---
  const [dark, setDark] = useState(true);

  // On mount, check if the user previously saved a theme preference
  useEffect(() => {
    const storedDark = localStorage.getItem("rp-dark");
    if (storedDark !== null) {
      setDark(storedDark === "true");
    }
  }, []);

  // Update HTML class for Tailwind and save to local storage
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("rp-dark", String(dark));
  }, [dark]);

  // Function to pass to your Header toggle button
  const toggleDark = useCallback(() => {
    setDark((prev) => !prev);
  }, []);

  return (
    /* 
      --- 2. Global Styling & Layout Container ---
      - `min-h-screen`: Ensures the dashboard is always at least the height of the viewport.
      - `flex flex-col`: Sets up a column layout.
      - `bg-gray-50 / dark:bg-[#0B1120]`: Global background color.
      - `text-gray-900 / dark:text-gray-100`: Global text color.
      - `transition-colors duration-300`: Smooth fade when switching themes.
    */
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0B1120] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans selection:bg-blue-500/30">
      
      {/* 
        ========================================
        SLOT 1: HEADER
        ======================================== 
        Drop your Header component here.
        Pass the dark state and toggle function so the Header can control the theme.
        Example: <Header dark={dark} toggleDark={toggleDark} /> 
      */}
      <Header></Header>

      {/* 
        ========================================
        SLOT 2: MAIN CONTENT
        ======================================== 
        `flex-grow` is critical here! It forces this section to expand 
        and take up all remaining vertical space, which pushes the footer to the bottom.
      */}
      <main className="flex-grow w-full flex flex-col relative z-0">
        {/* Placeholder - Remove when adding actual Main sections */}
        <div className="flex-grow flex items-center justify-center m-6 p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl opacity-50">
          <p className="text-center">
            [ Main Content Slot ] <br/>
            (Hero, About, Skills, Projects, etc. will go here)
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia animi a velit culpa et! Ipsum reiciendis deleniti, maxime suscipit dolores iusto corrupti beatae aperiam mollitia, quas placeat adipisci fuga consectetur.
            lorem*100
          </p>
        </div>
      </main>

      {/* 
        ========================================
        SLOT 3: FOOTER
        ======================================== 
        `flex-none` keeps the footer at its natural height at the bottom.
      */}
      <footer className="w-full flex-none">
        {/* Placeholder - Remove when adding actual Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-white/10 text-center text-sm opacity-50">
          [ Footer Component Slot ]
        </div>
      </footer>

    </div>
  );
}