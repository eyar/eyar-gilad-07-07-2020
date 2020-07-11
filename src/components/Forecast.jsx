import React, {useState, useEffect } from 'react';
import {useAsyncState} from '../redux/useAsyncState'
import {Spinner} from 'reactstrap';
import { getImage} from '../utils'

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
        {isLoading && <div className='d-flex justify-content-center'><Spinner color="primary" /></div>}
        <ul className='d-flex list-unstyled flex-wrap'>
            {payload?.DailyForecasts?.map((day,i)=><li key={i} className='flex-fill border border-dark rounded mx-2 mb-2 pb-2 text-center'>
                <div>{getWeekDay(day?.Date)}</div>
                <div>Min: {day?.Temperature?.Minimum?.Value}&deg;F</div>
                <div>Max: {day?.Temperature?.Maximum?.Value}&deg;F</div>
                <img src={getImage(day?.Day?.Icon)} alt=""/>
            </li>
            )}
        </ul>
    </>
}

export default Forecast;