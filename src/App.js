import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import "./App.css";
import { database } from "./utils";

const App = () => {
  const [beerList, setBeerList] = useState([]);
  const [fridgeList, setFridgeList] = useState([]);

  useEffect(() => {
    database.ref("beer-list/").on("value", data => {
      let obj = data.val();
      setBeerList(
        Object.keys(obj).map(key => {
          return {
            id: key,
            name: obj[key].name
          };
        })
      );
    });
    database.ref("fridge/").on("value", data => {
      let obj = data.val();
      setFridgeList(
        Object.keys(obj).map(key => {
          return {
            id: key,
            count: obj[key].count
          };
        })
      );
    });
  }, []);

  const beerStatus = fridgeList.map(({ id, count }) => {
    const beer = beerList.find(beer => beer.id === id);
    return {
      id,
      name: beer.name,
      count
    };
  });

  return (
    <div className="App">
      <List style={{ color: "black" }}>
        {beerStatus.map(e => (
          <ListItem
            key={e.id}
            style={{ marginBottom: "10px", backgroundColor: "white" }}
          >
            <ListItemAvatar>
              <Avatar
                alt="Drinks"
                src="https://www.coca-cola.no/content/dam/journey/no/no/Global/products/coca-cola-uten-sukker-595x334.jpg"
              />
            </ListItemAvatar>
            <ListItemText primary={e.name} secondary={`Antall: ${e.count}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default App;
