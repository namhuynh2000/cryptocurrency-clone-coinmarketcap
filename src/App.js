import React from "react";
import Homepage from "./pages/Homepage/Homepage";
import { Routes, Route } from "react-router-dom";

import { auth } from "./utils/authFirebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./app/reduces/userSlice";
import { useDispatch } from 'react-redux';
import RequireAuth from "./components/RequireAuth/RequireAuth";
import NewsPage from "./pages/NewsPage/NewsPage";
// import WatchlistPage from "./pages/WatchlistPage/WatchlistPage";
import { getUser } from "./utils/firestoreFirebase";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import DetailCoinPage from "./pages/DetailCoinPage/DetailCoinPage";

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
        <Route path="/CoinDetail/:id" element={<DetailCoinPage />} />
        <Route path="/Tag/:tag" element={<Homepage />} />
        {/* <Route path="/CoinDetail/:id/News" element={<DetailCoin />} /> */}

        <Route path="/Portfolio"
          element={
            <RequireAuth>
              {/* <PortfolioPage /> */}
            </RequireAuth>} />

        <Route path="/Watchlist"
          element={
            <RequireAuth>
              {/* <WatchlistPage /> */}
            </RequireAuth>} />

      </Routes>
    </div>
  );
}

export default App;
