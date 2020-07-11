import React, {useState, useEffect } from 'react';
import {useAsyncState} from '../redux/useAsyncState'
import {Spinner} from 'reactstrap';
import { getImage } from '../utils'

const Forecast = (props) => {
    const [city, setCity] = useState({name: 'Tal Aviv', key: '215854'});

    useEffect(()=>{
        props.city && setCity(props.city);
    },[props.city]);

    const { payload, isLoading } = useAsyncState('5 Day Forecast', `forecasts/v1/daily/5day/${city.key}`);

    const getWeekDay = (date) => {
        var d = new Date(date);
        return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
    }

    return <>
        {isLoading && <div className='d-flex justify-content-between'><Spinner color="primary" /></div>}
        <ul className='d-flex list-unstyled flex-wrap justify-content-center justify-content-md-between'>
            {payload?.DailyForecasts?.map((day,i)=><li key={i} className='flex-fill border border-dark rounded mx-2 mb-2 pb-2 text-center col-5 col-md-2'>
                <div>{getWeekDay(day?.Date)}</div>
                <img src={getImage(day?.Day?.Icon)} alt=""/>
                <div>Max: {day?.Temperature?.Maximum?.Value}&deg;F</div>
                <div>Min: {day?.Temperature?.Minimum?.Value}&deg;F</div>
                <img src={getImage(day?.Night?.Icon)} alt=""/>
            </li>
            )}
        </ul>
    </>
}

export default Forecast;