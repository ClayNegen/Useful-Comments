import React from "react";
import db from "../firebase";

export default function VideoData() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async (link) => {
      fetch(link)
        .then((res) => res.json())
        .then((response) => {
          response.items.forEach((item) => setData((data) => [...data, item]));
        })
        .catch((error) => console.log("Error: ", error));
    };
    fetchData(
      "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&order=relevance&videoId=5b91dFhZz0g&key=AIzaSyA8I9ttWAFKaW7E8tZ9GC2ktb21PRAGmWk"
    );
  }, []);

  const writeToFirebase = (data) => {
    console.log("Writing to Firebase: ", data);
    let arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push(data[i].snippet.topLevelComment.snippet.textOriginal);
    }
    let obj = {
      items: arr,
    };
    db.collection("testData").add(obj);
    console.log("Pushing: ", obj);
  };

  console.log("Data: ", data);
  return (
    <div>
      <h1>Get Video Data</h1>
      <button onClick={() => writeToFirebase(data)}>
        Add to Firebase as "VidData"
      </button>
    </div>
  );
}
