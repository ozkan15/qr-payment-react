import React from 'react';
import ReactDOM from 'react-dom';
import './receipt.css';
import { NavLink } from 'react-router-dom';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

export default class Receipt extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <div >
        <br />
        <legend>TRANSACTION DETAILS</legend>
        <hr />
        <legend>BATCH DETAILS</legend>
        <hr />
      </div>
    );
  }
}
