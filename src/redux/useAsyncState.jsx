import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    dataUpdateAction,
    dataLoadingAction,
    dataLoadingErrorAction
  } from "./asyncReducer";
import axios from "axios";

const getReal = (path, query, batch) => async () => {
  const apiData = await axios.get(`https://dataservice.accuweather.com/${path}`,{
      params: {
          apikey: process.env.REACT_APP_ACCUWEATHER_KEY,
          q: query
      }
    });
  const obj = {};
  obj[path] = apiData.data;
  return Promise.resolve({ data: batch ? obj : apiData.data });
};

const getMock = (type, path, batch) => async () => {
  path = path && path.split('/').join('-');
  let url = 'https://json-s.herokuapp.com';
  switch(type){
      case 'Geoposition':
          url = `${url}/geolocation`
          break;
      case 'Autocomplete':
          url = `${url}/autocomplete`
          break;
      case '5 Day Forecast':
          url = `${url}/forecast`
          break;
      case 'Current Weather':
          url = `${url}/weather`
          break;
      default: 
          url = `${url}/${path}`;
      break;
  }
  const apiData = await axios.get(url);
  const obj = {};
  path = path && path.split('-').join('/');
  obj[path] = apiData.data;
  return Promise.resolve({ data: batch ? obj : apiData.data });
};

export const useAsyncState = (stateProperty, path, query, batch) => {
    const mounted = useRef(false);
    const dispatch = useDispatch();
    const stateValue = useSelector((state) => {
      return stateProperty ? state[stateProperty] : state;
    });
    if (!stateValue) {
      throw new Error(
        `${stateProperty} not present in network state`
      );
    }

    const get = 'dont'==='mock' ? getMock(stateProperty, path, batch) : getReal(path, query, batch);
    const loader = useCallback(get,[query]);

    useEffect(() => {
      if(!path || query==='') return;
      const load = async () => {
        try {
          const result = await loader();
          mounted.current && dispatch(dataUpdateAction(stateProperty, result.data));
          return result;
        } catch (e) {
          mounted.current && dispatch(dataLoadingErrorAction(stateProperty, e));
        }
      };
      mounted.current = true;
      dispatch(dataLoadingAction(stateProperty));
      load();
      return () => {
        mounted.current = false;
      };
    }, [loader, stateProperty]);
  return stateValue;
  };