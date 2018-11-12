import React from 'react';
import './receipt.css';


export default class Receipt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container"><br/>
        <div className="alert alert-success">
          <strong>Transaction is successful</strong>
        </div>
        <br />
        <legend>TRANSACTION DETAILS</legend>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Info</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Receipt Amount</td>
              <td>{this.props.receiptData.transactionDetails.records[0].receiptAmount/100} TL</td>
            </tr>
            <tr>
              <td>Receipt ID</td>
              <td>{this.props.receiptData.transactionDetails.records[0].receiptID}</td>
            </tr>
            <tr>
              <td>Batch Number</td>
              <td>{this.props.receiptData.transactionDetails.records[0].batchNumber}</td>
            </tr>
            <tr>
              <td>Session ID</td>
              <td>{this.props.receiptData.transactionDetails.records[0].sessionID}</td>
            </tr>
            <tr>
              <td>Bankcard Balance</td>
              <td>{this.props.receiptData.transactionDetails.records[0].amountBankCard/100} TL</td>
            </tr>
            <tr>
              <td>Discount Balance</td>
              <td>{this.props.receiptData.transactionDetails.records[0].amountDiscount/100} TL</td>
            </tr>
            <tr>
              <td>Earned Point Balance</td>
              <td>{this.props.receiptData.transactionDetails.records[0].amountEarnedPoint/100} TL</td>
            </tr>
            <tr>
              <td>Food Card Balance</td>
              <td>{this.props.receiptData.transactionDetails.records[0].amountFoodCard/100} TL</td>
            </tr>
            <tr>
              <td>Point Balance</td>
              <td>{this.props.receiptData.transactionDetails.records[0].amountPoint/100} TL</td>
            </tr>
            <tr>
              <td>Message Data Time</td>
              <td>{this.props.receiptData.transactionDetails.records[0].msgDateTime}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <legend>BATCH DETAILS</legend>
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Info</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Batch Number</td>
              <td>{this.props.receiptData.batchSummary.records[0].batchNumber}</td>
            </tr>
            <tr>
              <td>Payment Amount</td>
              <td>{this.props.receiptData.batchSummary.records[0].paymentAmount/100} TL</td>
            </tr>
            <tr>
              <td>Refund Amount</td>
              <td>{this.props.receiptData.batchSummary.records[0].refundAmount/100} TL</td>
            </tr>
            <tr>
              <td>Message Data Time</td>
              <td>{this.props.receiptData.batchSummary.records[0].msgDateTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
