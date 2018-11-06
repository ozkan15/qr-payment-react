import React, { Component } from 'react';
import Home from './components/home/home';
import './App.css';

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
              <a className="nav-link" href="#">
                POS PAYMENT
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                HOMEPAGE
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                PURCHASE AND PAY
              </a>
            </li>
          </ul>
        </nav>
        <Home />
      </div>
    );
  }
}

export default App;
