import React, { Component } from 'react';

import Home from './components/home/home';
import './App.css';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom';
import Payment from './components/payment/payment';
import { withRouter } from 'react-router-dom';
import Refund from './components/refund/refund';
import Receipt from './components/receipt/receipt'


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      QRdata: "",
      loggedIn: false
    };
    this.homeCallback = this.homeCallback.bind(this);
  }


  homeCallback(data){
    this.setState({QRdata:data});
  }

  render() {

    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render = {(props)=>(
        this.state.QRdata
        ? <Redirect to="/" />
        : <Component {...props}/>
      )}/>
    );

    const HomeRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render = {(props)=>(
        <Component {...props} callBack={this.homeCallback}/>
      )}/>
    );

    const RefundRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render = {(props)=>(
        <Component {...props} />
      )}/>
    );


    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                POS PAYMENT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>
                Purchase
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/refund">
                Refund
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <PrivateRoute path="/payment" component={Payment}/>
          <HomeRoute path="/" component={Home} exact/>
          <RefundRoute path="/refund" component={Refund} />
          <PrivateRoute path="/receipt" component={Receipt}/>
        </Switch>


      </div>
    );
  }
}

export default withRouter(App);
