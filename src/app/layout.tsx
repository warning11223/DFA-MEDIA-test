"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";
import React from "react";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Provider>
      </body>
    </html>
  );
}
