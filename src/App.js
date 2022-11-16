import React from "react";
import Homepage from "./pages/Homepage/Homepage";
import { Routes, Route } from "react-router-dom";

import { auth } from "./utils/authFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./app/reduces/userSlice";
import { useDispatch } from 'react-redux';
import RequireAuth from "./components/RequireAuth/RequireAuth";
import NewsPage from "./pages/NewsPage/NewsPage";
import WatchlistPage from "./pages/WatchlistPage/WatchlistPage";
import PortfolioPage from "./pages/PortfolioPage/PortfolioPage";
import LoginPage from "./pages/LoginPage/LoginPage"

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      const value = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      }
      dispatch(setUser(value));
    }
    else { dispatch(setUser({})) }
  })


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/News" element={<NewsPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/Portfolio"
          element={
            <RequireAuth>
              <PortfolioPage />
            </RequireAuth>} />

        <Route path="/Watchlist"
          element={
            <RequireAuth>
              <WatchlistPage />
            </RequireAuth>} />

      </Routes>
    </div>
  );
}

export default App;
