import React, {useEffect, useState} from 'react';
import './App.css';
import { database } from './utils'

const App = () => {
  const [beerList, setBeerList] = useState([]);
  const [fridgeList, setFridgeList] = useState([]);

  useEffect(() => {
    database.ref('beer-list/').on('value', data => {      
      let obj = data.val()
      setBeerList(Object.keys(obj).map(key => {
        return {
          id: key,
          name: obj[key].name,
        }
      }))
    });
    database.ref('fridge/').on('value', data => {      
      let obj = data.val()
      setFridgeList(Object.keys(obj).map(key => {
        return {
          id: key,
          count: obj[key].count,
        }
      }))
    });
  }, [])

  const beerStatus = fridgeList.map(({id, count}) => {
      const beer = beerList.find(beer => beer.id === id)
      return {
        id,
        name: beer.name,
        count
      }
  })

  return (
    <div className="App">
      <header className="App-header">
        <div>
            {
              beerStatus.map(e => 
                <div>
                  <p>{e.name}</p>
                  <p>{e.count}</p>
                </div>
            )}
        </div>
      </header>
    </div>
    )
};

export default App;
