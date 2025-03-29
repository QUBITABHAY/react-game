import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectMode from "./component/SelectMode";
import SingleWord from "./component/SingleWord";
import Sentence from "./component/Sentence";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectMode />} />
        <Route path="/singleword" element={<SingleWord />} />
        <Route path="/sentence" element={<Sentence />} />
      </Routes>
    </Router>
  );
}

export default App;
