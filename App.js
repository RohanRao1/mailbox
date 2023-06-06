import { Fragment } from 'react';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import {Switch, Route, Redirect} from 'react-router-dom'
import ChangePassword from './components/ChangePassword';
import WelcomePage from './components/WelcomePage';
import ComposeMail from './components/ComposeMail'
import Inbox from './components/Inbox'
import { useSelector } from 'react-redux';
import { authActions } from './store/authentication';

function App() {

  const isLoggedin = useSelector(state => state.auth.isAuthenticated)

 return (
   <Fragment>
     <Header />
     <Switch>
       <Route path="/" exact>
         <Redirect to="/login" />
       </Route>
       <Route path="/login">
         <Login />
       </Route>
       <Route path="/changepassword">
         <ChangePassword />
       </Route>
      {isLoggedin && <Route path="/welcomepage">
         <WelcomePage />
       </Route> }
     {isLoggedin &&  <Route path="/composemail">
         <ComposeMail />
       </Route> }
    {isLoggedin &&   <Route path="/inbox">
         <Inbox />
       </Route>  }
    <Route path='*'>
      Page Not Found
    </Route>
     </Switch>
   </Fragment>
 );
}

export default App;
