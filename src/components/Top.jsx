import React, { useState, useEffect, useCallback } from 'react';
import {useAsyncState} from '../redux/useAsyncState'
import {getReal, getMock, getImage} from '../utils'
import {Button, Spinner} from 'reactstrap'

const Top = (props) => {
    const [city, setCity] = useState(props.city);
    const [favorite, setFavorite] = useState(false);
    
    useEffect(()=>{
        props.city && setCity(props.city);
        let favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
        favorites = new Set(favorites);
        const cityString = JSON.stringify(props.city);
        setFavorite(favorites.has(cityString));
    },[props.city])

    const toggleFavorites = () => {
        let favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
        favorites = new Set(favorites);
        const cityString = JSON.stringify(city);
        if(favorites.has(cityString)){
            setFavorite(false);
            favorites.delete(cityString)
        }
        else{
            setFavorite(true);
            favorites.add(cityString);
        }
        favorites = [...favorites.values()];
        window.localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    const get = process.env.REACT_APP_MOCK==='true' ? getMock('Current Weather') : getReal(`currentconditions/v1/${city.key}`);
    const loader = useCallback(get, [city.key]);
    const { payload, isLoading } = useAsyncState('Current Weather', loader);
    
    const style = {background: 'transparent', border: 'none', fontSize: '20px'};

    return <>
        <div className='d-flex justify-content-between'>
            {isLoading && <div className='d-flex justify-content-center'><Spinner color="primary" /></div>}
            {!isLoading &&  <div className='text-center'>
                <img src={getImage(payload && payload[0]?.WeatherIcon)} alt="" />
                <div>{city.name}</div>
                <div>{payload && payload[0]?.Temperature?.Imperial?.Value}&deg;F</div>
            </div>}
            <div>
                <Button onClick={toggleFavorites} style={style} >{favorite ? '❤️' : '🤍'}</Button>
                <Button onClick={toggleFavorites}>Add to Favorites</Button>
            </div>
        </div>
        <h2 className='d-flex justify-content-center mb-4'>{payload && payload[0]?.WeatherText}</h2>
    </>
} 

export default Top;