import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox'
import Top from '../components/Top'
import Forecast from '../components/Forecast'
import {useAsyncState} from '../redux/useAsyncState'

const Home = (props) => {
     const [position, setPosition] = useState(false);
     const [query, setQuery] = useState('');
     const [city, setCity] = useState({name: 'Tel Aviv', key: '215854'});


     useEffect(()=>{
          const search = new URLSearchParams(props.location.search);
          const [name, key] = [search.get('name'), search.get('key')]
          name && key && setCity({name, key});
          (!name && !key) && navigator.geolocation.getCurrentPosition((geolocation)=>setPosition(geolocation), (msg) => console.log(msg));
     },[]);

     useEffect(()=>{
          position && setQuery(`${position.coords?.latitude},${position.coords?.longitude}`);
     },[position]);

     const { payload } = useAsyncState('Geoposition', 'locations/v1/cities/geoposition/search', query);
     
     useEffect(()=>{
          city.name==='Tel Aviv' && payload && setCity({name: payload?.ParentCity?.EnglishName, key: payload?.ParentCity?.Key});
     },[payload])

     return <>
          <SearchBox setCity={setCity}/>
          <Top city={city}/>
          <Forecast city={city}/>
     </>
} 

export default Home;