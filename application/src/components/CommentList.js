import React from "react";
import { List, ListItem } from "@material-ui/core";
import Input from "./Input";

function Item(props) {
  return <ListItem>{props.text}</ListItem>;
}

export default function CommentList() {
  const [data, setData] = React.useState([]);

  const hasLikes = count => {
    if (count >= 1) {
      return true;
    } else {
      return false;
    }
  };

  const hasReply = count => {
    if (count >= 1) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      fetch(
        "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=100&order=relevance&videoId=RVMHhtTqUxc&key=AIzaSyA8I9ttWAFKaW7E8tZ9GC2ktb21PRAGmWk"
      )
        .then(res => res.json())
        .then(response => {
          setData(response.items);
        })
        .catch(error => console.log("Error: ", error));
    };
    fetchData();
  }, []);

  console.log("Data: ", data);

  return (
    <div>
      <p>Hello</p>
      <Input></Input>
      <List>
        {data.map((obj, index) => (
          <ListItem key={index}>
            {hasLikes(obj.snippet.topLevelComment.snippet.likeCount) &&
              hasReply(obj.snippet.totalReplyCount) && (
                <Item
                  text={obj.snippet.topLevelComment.snippet.textOriginal}
                ></Item>
              )}
            {obj.snippet.totalReplyCount}
            {"|"}
            {obj.snippet.topLevelComment.snippet.likeCount}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
