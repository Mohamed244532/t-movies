import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Toaster } from "react-hot-toast"; // ✅ 1. استيراد المكتبة

import { tmdbApi } from "@/services/TMDB";
import GlobalContextProvider from "@/context/globalContext";
import ThemeProvider from "@/context/themeContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={tmdbApi}>
        <ThemeProvider>
          <GlobalContextProvider>
            <LazyMotion features={domAnimation}>
              {/* ✅ 2. إضافة الـ Toaster هنا ليكون متاحاً في كل التطبيق */}
              <Toaster 
                position="top-center" 
                reverseOrder={false}
                toastOptions={{
                  // تنسيق الرسالة لتناسب الـ Dark Mode الخاص بموقعك
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }}
              />
              <App />
            </LazyMotion>
          </GlobalContextProvider>
        </ThemeProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);