import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Transaction from './Transection'
import * as ReactBootStrap from 'react-bootstrap'


class Transactions extends Component {
  constructor() {
    super()
    this.state = {}
  }
  deleteTranaction = (t) => {
    this.props.deleteTranaction(t)
  }
  render() {
    return (
      <div className="App">
        <Link to='/operations'>Operations</Link>
        <Link to = '/categorized'>Categories</Link>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.transactions.map(t =>
              <Transaction key={t._id} transaction={t} deleteTranaction={this.deleteTranaction} />
            )}
          </tbody>
        </ReactBootStrap.Table>
      </div>
    );
  }
}

export default Transactions;
