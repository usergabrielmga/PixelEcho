// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";


export function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 min-h-screen">
        <Outlet /> 
      </main>
    </div>
  );
}
