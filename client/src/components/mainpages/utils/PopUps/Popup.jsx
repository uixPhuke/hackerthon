// src/components/Popup.js
import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Duration to show the popup

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg transition-transform transform ${
        message ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {message}
    </div>,
    document.body
  );
};

export default Popup;
