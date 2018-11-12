import React from 'react';

import './refund.css';
import {withRouter} from 'react-router-dom';

class Refund extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      alert_error: null
    };

    this.refund_request = this.refund_request.bind(this);
  }

  async refund_request() {
    await fetch('http://localhost:8080/refund', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ QRdata: this.props.QRdata, sessionID:this.props.QRdecoded[6], batchNumber: this.props.QRdecoded[5]})
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.batchSummary.returnCode === 1000) {
          this.props.history.push('/receipt');
          this.props.getReceipt(data);
        }
        else this.setState({ alert_error: true });
      })
      .catch(error => console.log(error));
  }



  render(){
    let alert_card = null;
    if (this.state.alert_error) {
      alert_card = (
        <div className="card bg-danger text-white">
          <div className="card-body">Error</div>
        </div>
      );
    }

    return (
      <div className="refund-card">
          <h3>Continue the Process</h3>
          <button  type="submit" onClick={this.refund_request}>GET REFUND</button>
          {alert_card}
      </div>
    );
  }
}


export default withRouter(Refund);
