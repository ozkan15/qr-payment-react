import React from 'react';
import './refund.css';
import {NavLink} from 'react-router-dom';

export default class Refund extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sessionId:"", QRdata:0};
    this.handleChange = this.handleChange.bind(this);

    this.get_qr = this.get_qr.bind(this);
    this.qr_send_to_api = this.qr_send_to_api.bind(this);
  }

  handleChange(event) {
    this.setState({ sessionId: Number(event.target.value) });
  }

  async qr_send_to_api() {
    await fetch('http://localhost:5000/', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ QRdata: this.state.QRdata })
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  async get_qr(event) {
    event.preventDefault();
    console.log("reading qr");
    await fetch('https://sandbox-api.payosy.com/api/get_qr_refund', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-ibm-client-secret':
          'Y6pR1pW4yG7eF0fQ1cS7tH8oK5yQ6tH3aW0oI6rN4kH2sS4iR4',
        'x-ibm-client-id': '42776325-d649-4ed2-83a4-8e66c796a2aa'
      },
      body: JSON.stringify({ cancelledTxID: String(this.state.sessionId) })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({QRdata:data.QRdata, alert_error: false });
        //this.props.callBack(this.state.QRdata);
        console.log(data);
        this.qr_send_to_api();
        this.props.history.push("/payment");
      })
      .catch(error => {
        this.setState({ alert_error: true });
        console.log(error);
      });
  }

  render() {

    let alert_card = null;
    if (this.state.alert_error) {
      alert_card = (
        <div id="" className="card bg-danger text-white">
          <div className="card-body">Error</div>
        </div>
      );
    }

    return (
      <div className="refund-card">
        <legend>GET REFUND</legend>
        <hr />
        SESSION ID :{` `}
          <input
            type="number"
            onChange={this.handleChange}
            value={this.state.sessionId.toString()}
          />
          <br />
          <button type="submit" onClick={this.get_qr}>READ QR</button>
          {alert_card}
      </div>
    );
  }
}
