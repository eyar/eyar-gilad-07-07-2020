import React from 'react';
import { useDispatch } from "react-redux";
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import {useAsyncState} from './redux/useAsyncState'
import {Toast, ToastHeader} from 'reactstrap'
import {dimissToastAction} from "./redux/asyncReducer";
import {css} from 'emotion'

const App = () => {
  let stateEntries = Object.entries(useAsyncState());

  stateEntries = stateEntries.map(([reducerName,state])=>[reducerName, state.toast]);
  const dispatch = useDispatch();
  
  const closeToast = (reducerName) => () => {
    dispatch(dimissToastAction(reducerName));
  }

  const listStyle = css`
    @media (min-width:992px) {
        position:fixed;
    }
  `;

  const toastStyle = css`
    @media (max-width:992px) {
        margin: 0 auto;
    }
  `;

  return <BrowserRouter>
    <Navigation/>
    <div className={listStyle}>
      {stateEntries.map(([reducerName, toast],i)=> <Toast isOpen={toast} key={i} className={toastStyle}>
        <ToastHeader toggle={closeToast(reducerName)}>{`Error getting ${reducerName}`}</ToastHeader>
      </Toast>)}
    </div>
    <div className='container'>
      <Switch>
        <Route path="/favorites" component={Favorites}/>
        <Route path="/" component={Home}/>
      </Switch>
    </div>
  </BrowserRouter>
}

export default App;
