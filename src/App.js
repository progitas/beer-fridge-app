import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Fab
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
            name: obj[key].name,
            image: obj[key].image
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
    if (beer !== undefined) {
      return {
        ...beer,
        name: beer.name,
      };
    }
  });

  const updateBeerStatus = (status) => {
    const {event, id, count} = status;
    event.preventDefault()
    database.ref('fridge/' + id).set({
      count,
    });
  }

  return (
    <div className="App">
      <List style={{ color: "black", width: '100%' }}>
        {beerStatus.map(({id, count, name, image}) => (
          <ListItem
            key={id}
            style={{ marginBottom: "10px", backgroundColor: "white" }}
          >
            <ListItemAvatar>
              <Avatar
                alt="Drinks"
                src={image}
              />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={`Antall: ${count}`} />
            <ListItemSecondaryAction>
              <Fab onClick={(event) => updateBeerStatus({event, id, count: count + 1})}>+</Fab>
              <Fab onClick={(event) => updateBeerStatus({event, id, count: count - 1})}>-</Fab>
            </ListItemSecondaryAction>
            
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default App;
