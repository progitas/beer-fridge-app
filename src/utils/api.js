import { database } from './config';

export const getBeerList = database.ref('beer-list/').on('value', data => {
    let obj = data.val()
    return Object.keys(obj).map(key => {
        return {
            id: key,
            name: obj[key].name,
        }
    })
});

/*export const getFridgeList = database.ref('fridge/').once('value').then(data => {
    let obj = data.val()
    return Object.keys(obj).map(key => {
        return {
            id: key,
            count: obj[key].count,
        }
    })
});

export const getStatus = () => {
    return getBeerList.then(beer => {                
        getFridgeList.then(element => {
            beer.map(({id, name}) => {
                const beerCount = element.find(b => b.id === id)
                return {
                    id,
                    name,
                    count: beerCount
                };
            })
            
        })
    });
}*/