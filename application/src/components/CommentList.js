import React from "react";
import { List, ListItem } from "@material-ui/core";
import db from "../firebase";

//List item
function Item(props) {
  return (
    <div>
      <ListItem>
        {props.text}
        {" | Replies: "}
        {props.replies}
        {" | Likes: "}
        {props.likes}
      </ListItem>
    </div>
  );
}

//Comment List
export default function CommentList() {
  const apiKey = "get it";
  const maxResults = 20;
  const [videoId, setNewVideoId] = React.useState([
    "jniJeamcIUU",
    "09TeUXjzpKs",
    "aiXvvL1wNUc",
    "bUQz9ZWjsvc",
    "bZNAFkkUeKs",
    "bZNAFkkUeKs",
    "zby-aHpiKt0",
    "5b91dFhZz0g",
    "URtsnESYcPk",
    "QxiSuslEIyc",
  ]);
  //const [videoId, setNewVideoId] = React.useState(["jniJeamcIUU"]);
  const [data, setData] = React.useState([]);

  const hasLikes = (count) => {
    if (count >= 1) {
      return true;
    } else {
      return false;
    }
  };

  const hasReply = (count) => {
    if (count >= 1) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    const fetchData = async (link) => {
      fetch(link)
        .then((res) => res.json())
        .then((response) => {
          response.items.forEach((item) => setData((data) => [...data, item]));
        })
        .catch((error) => console.log("Error: ", error));
    };
    videoId.forEach((id) =>
      fetchData(
        "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=10&order=relevance&videoId=" +
          id +
          "&key=AIzaSyA8I9ttWAFKaW7E8tZ9GC2ktb21PRAGmWk"
      )
    );
  }, []);

  const writeToFirebase = (data) => {
    console.log("Writing to Firebase: ", data);
    let dataArray = [];
    for (var i = 0; i < data.length; i++) {
      let text = data[i].snippet.topLevelComment.snippet.textOriginal;
      let classification = "";
      if (
        hasLikes(data[i].snippet.topLevelComment.snippet.likeCount) &&
        hasReply(data[i].snippet.totalReplyCount)
      ) {
        classification = "useful";
      } else {
        classification = "not useful";
      }
      let obj = {
        title: text,
        category: classification,
      };
      db.collection("newData").add(obj);
    }
  };

  console.log("Data: ", data);

  return (
    <div>
      <h1>Retrieved Comments</h1>
      <button onClick={() => writeToFirebase(data)}>Add to Firebase</button>
      <List>
        {data.map((obj, index) => (
          <Item
            key={index}
            text={obj.snippet.topLevelComment.snippet.textOriginal}
            replies={obj.snippet.totalReplyCount}
            likes={obj.snippet.topLevelComment.snippet.likeCount}
          ></Item>
        ))}
      </List>
    </div>
  );
}
