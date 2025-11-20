import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/register";
import { Category } from "./components/category";
import { PhotosPage } from "./components/photosPage";
import ProtectedRoute from "./components/protectedRoute";
import SearchPage from "./components/searchPhoto";
import { GlobalPhotos } from "./components/globalPhotos";
import { MainLayout } from "./components/mainLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories/:id/photos"
            element={
              <ProtectedRoute>
                <PhotosPage />
              </ProtectedRoute>
            }
          />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/photos/global" element={<GlobalPhotos />} />
          </Route>
        
      </Routes>
    </div>
  );
}

export default App;
