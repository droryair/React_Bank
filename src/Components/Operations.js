import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Operations extends Component {
  constructor() {
    super()
    this.state = {

      amount: '',
      category: '',
      vendor: '',
      toRedirect: false


    }
  }
  updateState = (e) => {
    const target = e.target
    this.setState({ [target.name]: target.value })
  }

  postTransaction = async (toWithdraw) => {
    if (toWithdraw) {
      await this.setState({ amount: Number(`-${this.state.amount}`) })
    }
    await this.props.postTransaction(this.state)
    console.log("Operations state", this.state)
    await this.clearInputs()
    await this.setState({ toRedirect: true })
  }


  clearInputs = async () => {
    await this.setState({
      amount: '',
      category: '',
      vendor: ''
    })
  }

  render() {
    return (
      <div>
         <div> <Link to='/'>Transactions</Link> </div> 
          <Link to = '/categorized'>Categories</Link>

        {this.state.toRedirect ?
          <Redirect to={'/'} />
          :
          <div >
            <input type='number' name="amount" value={this.state.amount} onChange={this.updateState} placeholder="ex. 100"></input>
            <input name="category" value={this.state.category} onChange={this.updateState} placeholder="ex. Education"></input>
            <input name="vendor" value={this.state.vendor} onChange={this.updateState} placeholder="ex. Elevation"></input>
            <button onClick={() => this.postTransaction(false)}>Deposit</button>
            <button onClick={() => this.postTransaction(true)} >Withdraw</button>
          </div>
        }
      </div>
    );
  }
}

export default Operations;
