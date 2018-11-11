import React from 'react';
import ReactDOM from 'react-dom';
import './payment.css';
import { NavLink } from 'react-router-dom';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropdownSelected:"Select a Payment Option", count:0};
    this.toggle = this.toggle.bind(this);
    //this.removeClass = this.removeClass.bind(this);
    this.passSelectedValue = this.passSelectedValue.bind(this);
  }

  // toggle = () =>{
  //   console.log(ReactDOM.findDOMNode(this.refs.toggleMenu).style.display="block");
  // }

  // componentDidUpdate(){
  //   this.toggle();
  // }

  componentWillMount(){
    document.addEventListener("mousedown",this.handleClick);
  }

  componentWillUnmount(){
    document.removeEventListener("mousedown",this.handleClick);
  }

  handleClick = (e) => {
    if(!this.refs.dropDownMenu.contains(e.target)) ReactDOM.findDOMNode(this.refs.toggleMenu).classList.remove("show");
  };

  toggle(){
    ReactDOM.findDOMNode(this.refs.toggleMenu).classList.toggle("show");
  }


  passSelectedValue(event){
    event.preventDefault();
    this.setState({dropdownSelected:event.target.innerHTML});
  }

  render() {
    return (
      <div className="payment-card">
        <legend>PAYMENT DETAILS</legend>
        <hr />
        <div ref={"dropDownMenu"} className="dropdown dropdown__custom " onClick={this.toggle}>
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
          >
            {this.state.dropdownSelected}
          </button>
          <div ref={"toggleMenu"} className="dropdown-menu dropdown-menu__custom " >
            <a className="dropdown-item" href="#" onClick={this.passSelectedValue}>
              Discount
            </a>
            <a className="dropdown-item" href="#" onClick={this.passSelectedValue}>
              Cash
            </a>
            <a className="dropdown-item" href="#" onClick={this.passSelectedValue}>
              Bank Card (Credit/Debit)
            </a>
            <a className="dropdown-item" href="#" onClick={this.passSelectedValue}>
              Pay With Coupon
            </a>
            <a className="dropdown-item" href="#" onClick={this.passSelectedValue}>
              Food
            </a>
            <a className="dropdown-item" href="#" onClick={this.passSelectedValue}>
              Earn Coupon
            </a>
          </div>
        </div>
        <NavLink to="/receipt">
          <button  type="submit">APPROVE AND PAY</button>
        </NavLink>
      </div>
    );
  }
}
