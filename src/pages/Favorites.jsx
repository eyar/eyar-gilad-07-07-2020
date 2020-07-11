import React, {useCallback, useEffect, useState} from 'react';
import {useAsyncState} from '../redux/useAsyncState'
import {Spinner, NavLink } from 'reactstrap';
import {getBatch, getMock, getImage} from '../utils'

const ListItem = (props) => {
    const [data, setData] = useState();
    const path = `currentconditions/v1/${props.city.key}`;
    const get = process.env.REACT_APP_MOCK==='true' ? getMock('Current Weather', path) : getBatch(path);
    const loader = useCallback(get, [path]);
    const { payload, isLoading, loadError } = useAsyncState('Current Weather', loader);
    
    useEffect(()=>{
        payload && payload[path] && setData(payload[path]);
    },[payload])
    
    return <li className='flex-fill border border-dark rounded mx-2 mb-3 text-center col-md-2 col-5 px-0'>
        {isLoading && <Spinner color="primary" />}
        {!isLoading && <NavLink href={`/?name=${props.city.name}&key=${props.city.key}`} className='no-style' style={{width: '100%'}}>
            <div>{props.city.key}</div>
            <div>{props.city.name}</div>
            <div>{data && data[0]?.Temperature?.Imperial?.Value}&deg;F</div>
            <div>{data && data[0]?.WeatherText}</div>
            <img src={getImage(data && data[0]?.WeatherIcon)} alt=""/>
        </NavLink>}
    </li>
}

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(()=>{
        setFavorites(JSON.parse(window.localStorage.getItem('favorites')) || []);
    },[window])


    return <ul className='d-flex list-unstyled mt-5 flex-wrap justify-content-center'>
        {favorites.map((city,i)=><ListItem city={JSON.parse(city)} key={i}/>)}
    </ul>
}

export default Favorites;