import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Axios from 'axios';
import Transactions from './Components/Transactions'
import Operations from './Components/Operations'
import Categories from './Components/Categories';


class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: []
    }
  }

  calcBalance = () => {
    if (this.state) {
      let balance = 0
      this.state.transactions.forEach(t => balance += Number(t.amount))
      return balance
    }
  }

  async componentDidMount() {
    const response = await this.getTransactions()
    await this.setState({ transactions: response.data })
  }

  async getTransactions() {
    const results = await Axios.get("http://localhost:3001/transactions")
    return results
  }

  postTransaction = async (newTransaction) => {
    const tempTransactions = [...this.state.transactions]
    console.log("newTransaction", newTransaction)
    const transactionModel = await Axios({
      method: 'post',
      url: 'http://localhost:3001/transaction',
      data: newTransaction
    });
    tempTransactions.push(transactionModel.data)
    await this.setState({ transactions: tempTransactions })
    console.log(this.state.transactions)
  }

  deleteTranaction = async (transaction) => {
    const tempTransactions = [...this.state.transactions]
    const id = transaction['_id']
    await Axios.delete(`http://localhost:3001/transaction?id=${id}`)
    const deleteTransactionIndex = tempTransactions.findIndex(t => t['_id'] === transaction['_id'])
    tempTransactions.splice(deleteTransactionIndex, 1)
    await this.setState({ transactions: tempTransactions })
  }

  render() {
    return (
      <Router>

        <div >
          {this.state.transactions ?
            <div>
              <div>Your balance is: {this.calcBalance()}</div>
              <Route exact path='/' render={() => <Transactions transactions={this.state.transactions} deleteTranaction={this.deleteTranaction} />} />
              <Route exact path='/operations' render={() => <Operations withdrawTransaction={this.withdrawTransaction} postTransaction={this.postTransaction} />} />
              <Route exact path='/categorized' render={() => <Categories transactions={this.state.transactions} />} />
            </div>
            : null}
        </div>
      </Router>
    );
  }
}

export default App;
