import React, { useState, useEffect } from 'react';
import {useAsyncState} from '../redux/useAsyncState'
import { getImage, useLocalStorage } from '../utils'
import {Button, Spinner} from 'reactstrap'

const Top = (props) => {
    const [city, setCity] = useState(props.city);
    const [favorites, setFavorites] = useLocalStorage('favorites', []);
    const [favorite, setFavorite] = useState(false);
    
    useEffect(()=>{
        props.city && setCity(props.city);
        setFavorites(favorites?.length ? favorites : []);
        const favoritesSet =  new Set(favorites);
        const cityString = JSON.stringify(props.city);
        setFavorite(favoritesSet.has(cityString));
    },[props.city])

    const toggleFavorites = () => {
        const favoritesSet = new Set(favorites);
        const cityString = JSON.stringify(city);
        if(favoritesSet.has(cityString)){
            setFavorite(false);
            favoritesSet.delete(cityString)
        }
        else{
            setFavorite(true);
            favoritesSet.add(cityString);
        }
        setFavorites([...favoritesSet.values()]);
    }

    const { payload, isLoading } = useAsyncState('Current Weather', `currentconditions/v1/${city.key}`);

    return <>
        <div className='d-flex justify-content-between'>
            {isLoading && <div className='d-flex justify-content-center'><Spinner color="primary" /></div>}
            {!isLoading &&  <div className='text-center'>
                <img src={getImage(payload && payload[0]?.WeatherIcon)} alt="" />
                <div>{city.name}</div>
                <div>{payload && payload[0]?.Temperature?.Imperial?.Value}&deg;F</div>
            </div>}
            <div>
                <button onClick={toggleFavorites} className='like btn' >
                    <img src='1f90d.png' className={favorite && 'd-none'} alt='' width='30'/>
                    <img src='2764.png' className={!favorite && 'd-none'} alt='' width='30'/>
                </button>
                <Button onClick={toggleFavorites} style={{marginRight: '8px'}}>Add to Favorites</Button>
            </div>
        </div>
        <h2 className='d-flex justify-content-center mb-4'>{payload && payload[0]?.WeatherText}</h2>
    </>
} 

export default Top;