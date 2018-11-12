import React from 'react';
import ReactDOM from 'react-dom';
import './payment.css';
import { withRouter } from 'react-router-dom';


 class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSelected: 'Select a Payment Method',
      amount: 0,
      paymentType:-1,
      alert_error: null
  };

    this.toggle = this.toggle.bind(this);
    this.payment_request = this.payment_request.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  async payment_request(event) {
    event.preventDefault();
    await fetch('http://localhost:8080/sale', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        QRdata: this.props.QRdata,
        amount: this.state.amount*100,
        paymentType: this.state.paymentType,
        sessionID:this.props.QRdecoded[10],
        batchNumber:this.props.QRdecoded[9]
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.batchSummary.returnCode === 1000){
        this.props.getReceipt(data);
        this.props.history.push('/receipt');
      }
      else this.setState({ alert_error: true });
      console.log(data);
    })
    .catch(error =>{
      console.log(error);
      this.setState({ alert_error: true });
    });
  }

  handleChange(event) {
    this.setState({ amount: Number(event.target.value) });
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick);
    sessionStorage.setItem("qr-sale",this.props.QRdata);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    sessionStorage.removeItem("qr-sale");
  }

  handleClick = e => {
    if (!this.refs.dropDownMenu.contains(e.target))
      ReactDOM.findDOMNode(this.refs.toggleMenu).classList.remove('show');
  };

  toggle() {
    ReactDOM.findDOMNode(this.refs.toggleMenu).classList.toggle('show');
  }

  passSelectedValue(index,event) {
    event.preventDefault();
    console.log(index);
    this.setState({ dropdownSelected: event.target.innerHTML, paymentType:index});
  }

  render() {
    let alert_card = null;
    if (this.state.alert_error) {
      alert_card = (
        <div className="card bg-danger text-white">
          <div className="card-body">Error</div>
        </div>
      );
    }


    const payment_options = [
      {id:0, name:'Discount'},
      {id:3, name:'Bank Card (Credit/Debit)'},
      {id:4, name:'Pay With Coupon'},
      {id:7, name:'Food'},
      {id:8, name:'Earn Coupon'}
    ];

    return (
      <div className="payment-card">
        <legend>PAYMENT DETAILS</legend>
        <hr />
        TOTAL: <h3>{`${this.props.QRdecoded[2]/100} TL`}</h3><br />
        <div
          ref={'dropDownMenu'}
          className="dropdown dropdown__custom "
          onClick={this.toggle}
        ><hr/>
          <button type="button" className="btn btn-primary dropdown-toggle">
            {this.state.dropdownSelected}
          </button>
          <div
            ref={'toggleMenu'}
            className="dropdown-menu dropdown-menu__custom "
          >
            {payment_options.map(element => {
              return (
                <a
                  key={element.id}
                  className="dropdown-item"
                  href="#"
                  onClick={this.passSelectedValue.bind(this,element.id)}
                >
                  {element.name}
                </a>
              );
            })}
          </div>
        </div><br />
        <form onSubmit={this.payment_request}>
          PAYMENT AMOUNT: <input
            type="number"
            max={this.props.QRdecoded[2]/100}
            onChange={this.handleChange}
            value={this.state.amount.toString()}
            required
          />TL<br /><br/>
          <button type="submit" >APPROVE AND PAY</button>
        </form>
          {alert_card}
      </div>
    );
  }
}

export default withRouter(Payment);
