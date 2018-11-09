import React from 'react';
import './payment.css';
import {NavLink} from 'react-router-dom';

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="payment-card">
        <legend>PAYMENT DETAILS</legend>
        <hr />
        <NavLink to="/payment">
          <button>APPROVE AND PAY</button>
        </NavLink>
      </div>
    );
  }
}
