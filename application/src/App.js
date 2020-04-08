import React from "react";
import "./App.css";
import CommentList from "./components/CommentList";
import FireList from "./components/fireList";
import VideoData from "./components/getVideoData";

function App() {
  return (
    <div className="App">
      <FireList></FireList>
    </div>
  );
}

export default App;
