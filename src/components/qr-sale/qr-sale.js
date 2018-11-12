import React from 'react';
import './qr-sale.css';
import {withRouter} from 'react-router-dom';

class QrSale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receiptAmount: 0,
      QRdata:'',
      alert_error: null,
      receiptData:null
    };
    this.get_qr = this.get_qr.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  handleChange(event) {
    this.setState({ receiptAmount: Number(event.target.value) });
  }


  Callback(){

  }

  async get_qr(event) {
    event.preventDefault();
    console.log("reading qr");
    await fetch('https://sandbox-api.payosy.com/api/get_qr_sale', {
      method: 'post',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'x-ibm-client-secret':
          'Y6pR1pW4yG7eF0fQ1cS7tH8oK5yQ6tH3aW0oI6rN4kH2sS4iR4',
        'x-ibm-client-id': '42776325-d649-4ed2-83a4-8e66c796a2aa'
      },
      body: JSON.stringify({ totalReceiptAmount: this.state.receiptAmount*100 })
    })
      .then(res => res.json())
      .then(data => {
        if(data.returnCode != 1000) this.setState({ alert_error: true });
        else {
          this.setState({QRdata:data.QRdata, alert_error: false });
          this.props.callBack(this.state.QRdata);
          console.log(data);
          this.props.history.push("/payment");
        }

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
      <div className="home">
        <form onSubmit={this.get_qr}>
          <legend>SHOP</legend>
          <hr />
          PRICE :{` `}
          <input
            type="number"
            onChange={this.handleChange}
            value={this.state.receiptAmount.toString()}
            required
          />
          TL
          <br />
          <button type="submit">
              READ QR
          </button>
          </form>
        {alert_card}
      </div>
    );
  }
}

export default withRouter(QrSale);
