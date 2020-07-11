import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';
import {useAsyncState} from '../redux/useAsyncState'

const SearchBox = (props) => {
    const [value, setValue] = useState('');
    const [autocompleteData, setAutocompleteData] = useState([]);

    const { payload } = useAsyncState('Autocomplete', 'locations/v1/cities/autocomplete', value);

    useEffect(()=>{
        const data = payload && payload?.map((item, i)=>{
            return {label: item.LocalizedName, value: i, key: item.Key};
        });
        data && setAutocompleteData(data);
    },[payload])
    
    const onChange = (e) => {
        setValue(e.target.value);

        console.log("The Input Text has changed to ", e.target.value);
    }

    const onSelect = (val)=>{
        setValue(val);
        const found = autocompleteData.find((entry)=>entry.label===val);
        props.setCity({name: val, key: found.key});
        console.log("Option from 'database' selected : ", val);
    }
    const renderItem = (item, isHighlighted) => {
        return (
            <div key={item.value} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>   
        ); 
    }

    const getItemValue = (item) => {
        return `${item.label}`;
    }

    const style = {
        backgroundImage: 'url(/search.svg)',
        backgroundSize: '16px 16px',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'center',
        backgroundPositionX: '4px',
        width: '100%',
        paddingLeft: '25px'
    }

    return <div className='d-flex justify-content-center mt-4 mb-3'>
        <Autocomplete
            getItemValue={getItemValue}
            items={autocompleteData}
            renderItem={renderItem}
            value={value}
            onChange={onChange}
            onSelect={onSelect}
            inputProps={{ style: style, className: 'rounded'}}
            wrapperStyle={{ width:  '300px'   }}
        />
    </div>
} 

export default SearchBox;