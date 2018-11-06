import React from 'react';

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = { receiptAmount: 0, QRdata:''};
    this.get_qr = this.get_qr.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.qr_send_to_api = this.qr_send_to_api.bind(this);
  }

  handleChange(event){
    this.setState({receiptAmount: Number(event.target.value)});
  }

  async qr_send_to_api(){
    await fetch('http://localhost:5000',{
      method:"post",
      headers:{"Content-Type": 'application/json'},
      body: JSON.stringify({QRdata: this.state.QRdata})
    });
  }

  async get_qr(){
   await fetch('https://sandbox-api.payosy.com/api/get_qr_sale', {
      method:"post",
      headers:
       {
         "accept": 'application/json',
         "Content-Type": 'application/json',
         'x-ibm-client-secret': 'Y6pR1pW4yG7eF0fQ1cS7tH8oK5yQ6tH3aW0oI6rN4kH2sS4iR4',
         'x-ibm-client-id': '42776325-d649-4ed2-83a4-8e66c796a2aa' },
      body: JSON.stringify({ totalReceiptAmount: this.state.receiptAmount })
    })
   .then(res => res.json())
   .then(data => {
    this.setState({QRdata: data.QRdata});
    this.qr_send_to_api();
    console.log({message: data});

   })
   .catch(error => console.log(error));
  }

  render(){
    return (
      <div>
        HomePage<br/>
          PAY CHECK: <input onChange={this.handleChange} value={this.state.receiptAmount.toString()}></input>TL<br /><br />
          <button className="btn btn-primary"  onClick={this.get_qr}>READ QR</button>
          <br/><br/> <button className="btn btn-warning">PAY</button>

      </div>
    );
  }

}
