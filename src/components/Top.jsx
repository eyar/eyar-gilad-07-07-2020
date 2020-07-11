import React, { useState, useEffect } from 'react';
import {useAsyncState} from '../redux/useAsyncState'
import { getImage } from '../utils'
import {Button, Spinner} from 'reactstrap'
import {css} from 'emotion'

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

    const { payload, isLoading } = useAsyncState('Current Weather', `currentconditions/v1/${city.key}`);
    
    useEffect(()=>{
        console.log(payload)
    }, [payload]);

    const style = css`
        background: transparent;
        border: none;
        margin-right: 5px;
        :focus{
            background: transparent;
            box-shadow: none;
        }
    `;

    return <>
        <div className='d-flex justify-content-between'>
            {isLoading && <div className='d-flex justify-content-center'><Spinner color="primary" /></div>}
            {!isLoading &&  <div className='text-center'>
                <img src={getImage(payload && payload[0]?.WeatherIcon)} alt="" />
                <div>{city.name}</div>
                <div>{payload && payload[0]?.Temperature?.Imperial?.Value}&deg;F</div>
            </div>}
            <div>
                <button onClick={toggleFavorites} className={`${style} btn`} >
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