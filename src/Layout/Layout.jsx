import React from "react";
import {  Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}