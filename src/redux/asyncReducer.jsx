// Action constant creators
export const LOADING = (stateProperty) =>
  `${stateProperty}/loading`;
export const SETDATA = (stateProperty)=>
  `${stateProperty}/setdata`;
export const LOAD_ERROR = (stateProperty)=>
  `${stateProperty}/loaderror`;
export const DISMISS_TOAST = (stateProperty)=>
  `${stateProperty}/dismisstoast`;
// Action creators
export const dataLoadingAction = (stateProperty) => ({
  payload: {},
  type: LOADING(stateProperty)
});
export const dataUpdateAction = (stateProperty, payload) => ({
  payload,
  type: SETDATA(stateProperty)
});
export const dataLoadingErrorAction = (stateProperty, error) => ({
  payload: error,
  type: LOAD_ERROR(stateProperty)
});
export const dimissToastAction = (stateProperty) => ({
  payload: {},
  type: DISMISS_TOAST(stateProperty)
});

export const getAsyncDataReducer = (stateProperty) => {
  const reducer = (
    state = { 
      isLoading: false,
      loadError: false,
      loadErrorDetails: null,
      payload: null,
      toast: false
    },
    action
  ) => {
    switch (action.type) {
      case LOADING(stateProperty):
        return {
          ...state,
          isLoading: true,
          loadErrorDetails: null
        };
      case SETDATA(stateProperty):
        return {
          ...state,
          isLoading: false,
          loadErrorDetails: null,
          payload: action.payload,
          toast: false
        };
      case LOAD_ERROR(stateProperty):
        return {
          ...state,
          isLoading: false,
          loadError: true,
          loadErrorDetails: action.payload,
          toast: true
        };
      case DISMISS_TOAST(stateProperty):
        return {
          ...state,
          toast: false
        };
      default:
        return state;
    }
  };
  return reducer;
};
