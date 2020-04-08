import React from "react";
import { List, ListItem } from "@material-ui/core";
import db from "../firebase";

const editFireBase = (id, text, classification) => {
  let currentItem = { title: text, category: classification };
  db.collection("newData").doc(id).set(currentItem);
};

//List item
function Item(props) {
  return (
    <div>
      <ListItem>
        {props.text}
        {" | "}
        {props.category}
      </ListItem>
      <button onClick={() => editFireBase(props.id, props.text, "useful")}>
        useful
      </button>
      <button onClick={() => editFireBase(props.id, props.text, "not useful")}>
        not useful
      </button>
    </div>
  );
}

//Comment List
export default function FireList() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      db.collection("newData").onSnapshot(function (data) {
        setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Train Data</h1>
      <List>
        {data.map((obj, index) => (
          <Item
            key={index}
            text={obj.title}
            category={obj.category}
            id={obj.id}
          ></Item>
        ))}
      </List>
    </div>
  );
}
