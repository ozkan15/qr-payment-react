import React, { Component } from 'react';
import Home from './components/home/home';
import './App.css';
import {Route, Switch, NavLink} from 'react-router-dom';
import Payment from './components/payment/payment';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      QRdata: "",
    }
  }




  render() {
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
              <NavLink className="nav-link" to="/">
                HomePage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/payment">
                Payment
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/payment" component={Payment}/>
        </Switch>


      </div>
    );
  }
}

export default App;
