import React, { Component } from 'react';

import './App.css';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
import QrSale from './components/qr-sale/qr-sale';
import Payment from './components/payment/payment';
import QrRefund from './components/qr-refund/qr-refund';
import Receipt from './components/receipt/receipt';
import Refund from './components/refund/refund';
import Home from './components/home/home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saleQRdata: '',
      refundQRdata: '',
      saleQRdataDecoded: [],
      refundQRdataDecoded: [],
      receiptData: [],
      loggedIn: false
    };
    this.Callback = this.Callback.bind(this);
    this.getReceiptCallback = this.getReceiptCallback.bind(this);
  }

  getReceiptCallback(data) {
    this.setState({ receiptData: data });
  }



  Callback(data) {
    var QRdecoded = [];
    var i = 0;
    while (i < data.length) {
      i += 2;
      var length = Number(data.substring(i, i + 2));
      i += 2;
      var value = data.substring(i, i + length);
      i += length;
      QRdecoded.push(value);
      if (QRdecoded.length === 8)
        this.setState({ refundQRdataDecoded: QRdecoded, refundQRdata: data });
      else this.setState({ saleQRdataDecoded: QRdecoded, saleQRdata: data });
    }
  }

  render() {
    const RefundRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          sessionStorage.getItem("qr-refund") && this.state.refundQRdata  ? (
            <Component
              {...props}
              QRdata={this.state.refundQRdata}
              getReceipt={this.getReceiptCallback}
              QRdecoded={this.state.refundQRdataDecoded}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );



    const PaymentRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          sessionStorage.getItem("qr-sale")  && this.state.saleQRdata ? (
            <Component
              {...props}
              QRdata={this.state.saleQRdata}
              getReceipt={this.getReceiptCallback}
              QRdecoded={this.state.saleQRdataDecoded}
            />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );

    const ReceiptRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.saleQRdata || this.state.refundQRdata ? (
            <Component {...props} receiptData={this.state.receiptData} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );

    const PublicRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => <Component {...props} callBack={this.Callback} />}
      />
    );

    return (
      <div className="App">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                QR PAYMENT
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/qr_sale" exact>
                Purchase
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/qr_refund">
                Refund
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <PaymentRoute path="/payment" component={Payment} />
          <PublicRoute path="/qr_sale" component={QrSale} />
          <PublicRoute path="/qr_refund" component={QrRefund} />
          <ReceiptRoute path="/receipt" component={Receipt} />
          <RefundRoute path="/refund" component={Refund} />
          <Route path="/" component={Home} exact/>
        </Switch>
        <footer className="page-footer font-small blue">
          <div className="footer-copyright text-center py-3">
            © 2018 -
            <a href="#">
              {' '}
              QR Payment Demo
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(App);
