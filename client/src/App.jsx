import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import UserPage from "./components/UserPage/UserPage";
import AlbumPage from "./components/AlbumPage/AlbumPage";
import PhotoPage from "./components/PhotoPage/PhotoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/album/:albumId" element={<AlbumPage />} />
        <Route path="/photo/:photoId" element={<PhotoPage />} />
      </Routes>
    </div>
  );
}

export default App;
