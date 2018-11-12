import React from 'react';
import {NavLink} from 'react-router-dom';
import './home.css';

export default class Home extends React.Component {



  componentDidMount() {
    sessionStorage.setItem("qr-refund","qr-refund");
    sessionStorage.setItem("qr-sale","qr-sale");
  }

  render(){
    return (
      <div><br/>
        <NavLink  to="/qr_sale"><img src={require("../../assets/img-purchase.jpg")} width="300px" className="img-thumbnail img-responsive" alt="purchase"/></NavLink><br/><br />
        <NavLink  to="/qr_refund"><img src={require("../../assets/img-refund.jpg")} width="300px" className="img-thumbnail img-responsive" alt="refund"/></NavLink>
      </div>
    );
  }
}
