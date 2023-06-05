import { Fragment } from 'react';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import {Switch, Route, Redirect} from 'react-router-dom'
import ChangePassword from './components/ChangePassword';
import WelcomePage from './components/WelcomePage';
import ComposeMail from './components/ComposeMail'

function App() {
 return (
   <Fragment>
     <Header />
     <Switch>
      <Route path='/' exact>
        <Redirect to='/login' />
      </Route>
       <Route path="/login" >
         <Login />
       </Route>
       <Route path='/changepassword'>
        <ChangePassword />
       </Route>
       <Route path='/welcomepage'>
        <WelcomePage /> 
       </Route>
       <Route path='/composemail'>
        <ComposeMail />
       </Route>
     </Switch>
   </Fragment>
 );
}

export default App;
