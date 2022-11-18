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
import LoginPage from "./pages/LoginPage/LoginPage";
import { getUser } from "./utils/firestoreFirebase";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import DetailCoin from "./pages/DetailCoin/DetailCoin";

function App() {
  const dispatch = useDispatch();

  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const user = await getUser(currentUser.uid);
      dispatch(setUser(user));
    }
    else { dispatch(setUser({})) }
  })


  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/News" element={<NewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/CoinDetail/:id" element={<DetailCoin />} />

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
