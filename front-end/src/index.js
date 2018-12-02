import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';
import HomePage from './components/HomePage';
import LogIn from './components/LogIn';
import UserHome from './components/UserHome';
import UserProfile from './components/UserProfile';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render((
  <BrowserRouter>
    <div>
        <Route exact={true} path='/' component={HomePage} />
        {/* <Route exact={true} path='/:userId' component={OtherUser} /> */}
    	  <Route exact={true} path='/login' component={LogIn} />
        <Route exact={true} path='/home' component={UserHome} />
        <Route exact={true} path='/profile' component={UserProfile} />
    </div>
  </BrowserRouter>
  ),
  document.getElementById('root')
);
