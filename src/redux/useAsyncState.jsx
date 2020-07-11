import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    dataUpdateAction,
    dataLoadingAction,
    dataLoadingErrorAction
  } from "./asyncReducer";
  
export const useAsyncState = (stateProperty, loader) => {
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
    useEffect(() => {
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