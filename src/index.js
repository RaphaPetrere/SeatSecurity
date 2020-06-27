import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage/index.js';
// import LoadingPage from './Pages/LoadingPage/index.js';
import AccountPage from './Pages/AccountPage/index.js';
import SignupPage from './Pages/SignupPage/index.js';
import LoginPage from './Pages/LoginPage/index.js';
import HomePage from './Pages/HomePage/index.js';
import ForgotPassword from './Pages/ForgotPassword/index.js';
import EditProfilePage from './Pages/EditProfilePage/index.js';
import ManageCardsPage from './Pages/ManageCards/index.js';
import TravelPage from './Pages/TravelPage/index.js';
import Step1 from './Pages/TravelPage/First/index.js';
import Step2 from './Pages/TravelPage/Second/index.js';
import Step3 from './Pages/TravelPage/Third/index.js';
import CardPick from './Pages/TravelPage/Third/CardPick/index.js';
import LastTripsPage from './Pages/LastTripsPage/index.js';
import BookedTripsPage from './Pages/BookedTripsPage/index.js';
import SeeDetailsPage from './Pages/BookedTripsPage/SeeDetails/index.js';
import RelatorioPage from './Pages/RelatorioPage/index.js';
import Report from './Pages/RelatorioPage/Report/index.js';
import Feedback from './Pages/FeedbackPage/index.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={HomePage} />
      <Route path="/home" exact={true} component={MainPage} />
      <Route path="/account" exact={true} component={AccountPage} />
      <Route path="/signup" exact={true} component={SignupPage} />
      <Route path="/login" exact={true} component={LoginPage} />
      <Route path="/forgot-password" exact={true} component={ForgotPassword} />
      <Route path="/edit-profile" exact={true} component={EditProfilePage} />
      <Route path="/manage-cards" exact={true} component={ManageCardsPage} />
      <Route path="/travel" exact={true} component={TravelPage} />
      <Route path="/travel/first-step" exact={true} component={Step1} />
      <Route path="/travel/second-step" exact={true} component={Step2} />
      <Route path="/travel/third-step" exact={true} component={Step3} />
      <Route path="/travel/third-step/card-pick" exact={true} component={CardPick} />
      <Route path="/feedback" exact={true} component={Feedback} />
      <Route path="/last-trips" exact={true} component={LastTripsPage} />
      <Route path="/booked-trips" exact={true} component={BookedTripsPage} />
      <Route path="/booked-trips/see-details" exact={true} component={SeeDetailsPage} />
      <Route path="/relatorio" exact={true} component={RelatorioPage} />
      <Route path="/report" exact={true} component={Report} />
    </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
