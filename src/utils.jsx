import axios from "axios";
const apikey = process.env.REACT_APP_ACCUWEATHER_KEY;

export const getBatch = (path,query) => async () => {
    const apiData = await axios.get(`http://dataservice.accuweather.com/${path}`,{
        params: {
            apikey,
            q: query
        }
      });
    const obj = {};
    obj[path] = apiData.data;
    return Promise.resolve({ data: obj });
};

export const getReal = (path,query) => async () => {
    const apiData = await axios.get(`http://dataservice.accuweather.com/${path}`,{
        params: {
            apikey,
            q: query
        }
      });
    return Promise.resolve({ data: apiData.data });
};

export const getMock = (type, path) => async () => {
    let url = '';
    switch(type){
        case 'Geoposition':
            url = 'http://localhost:3004/geolocation'
            break;
        case 'Autocomplete':
            url = 'http://localhost:3004/autocomplete'
            break;
        case '5 Day Forecast':
            url = 'http://localhost:3004/forecast'
            break;
        case 'Current Weather':
            url = 'http://localhost:3004/weather'
            break;
        default: 
            url = '';
        break;
    }
    const apiData = await axios.get(url);
    const obj = {};
    obj[path] = apiData.data;
    return Promise.resolve({ data: path ? obj : apiData.data });
};

export const getImage = (num) => {
    if(!num) return '';
    const str = num < 10 ? `0${num}` : `${num}`;
    return `https://developer.accuweather.com/sites/default/files/${str}-s.png`
}