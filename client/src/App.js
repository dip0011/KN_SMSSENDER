import React from "react";
import { Routes, Route } from "react-router-dom";

import Contacts from "./components/Contacts";
import SmsList from "./components/SmsList";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/smslist" element={<SmsList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
