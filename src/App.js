import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Axios from 'axios';
import Transactions from './Components/Transactions'
import Operations from './Components/Operations'
import Categories from './Components/Categories';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar'




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
      console.log()
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
    const transactionModel = await Axios({
      method: 'post',
      url: 'http://localhost:3001/transaction',
      data: newTransaction
    });
    tempTransactions.push(transactionModel.data)
    await this.setState({ transactions: tempTransactions }, function () {
    })
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
      const balance = this.calcBalance()
    return (
      <Router>

        <div className="App ">
          <NavBar variant="pills"  >
            <Nav className="nav-bar" fill={true}>
              <Nav.Item>
                <Nav.Link class ="nav-link" id="left" href="/">Transactions</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link class ="nav-link" id="middle" href="/categorized">Categories</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link class ="nav-link" id="right" href="/operations">Operations</Nav.Link>
              </Nav.Item>
            </Nav>
          </NavBar>
          {this.state.transactions && (
            <div>
              {balance>500?
              <div id="balance" className="high-balance" >Your balance is: {balance}</div>
              :<div id="balance" className="low-balance" >Your balance is: {balance}</div>
              }
              <Route exact path='/' render={() => <Transactions transactions={this.state.transactions} deleteTranaction={this.deleteTranaction} />} />
              <Route exact path='/operations' render={() => <Operations withdrawTransaction={this.withdrawTransaction} postTransaction={this.postTransaction} />} />
              <Route exact path='/categorized' render={() => <Categories transactions={this.state.transactions} />} />
            </div>
          )}
        </div>

      </Router>
    );
  }
}

export default App;
