import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';



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
  updateState = async (e) => {
    const target = e.target
    await this.setState({ [target.name]: target.value })
  }

  postTransaction = async (toWithdraw) => {
    if (toWithdraw) {
      await this.setState({ amount: Number(`-${this.state.amount}`) })
    }
    await this.props.postTransaction(this.state)
     this.clearInputs()
     this.setState({ toRedirect: true })
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
      <div className="App">
        {this.state.toRedirect ?
          <Redirect to={'/'} />
          :
          <div id="op-card">
            <span className="op-input-name amount-in"> Amount </span> <input className="input" type='number' name="amount" value={this.state.amount} onChange={this.updateState} placeholder="ex. 100"></input>
            <br></br>
            <span className="op-input-name category-in"> category </span> <input className="input" name="category" value={this.state.category} onChange={this.updateState} placeholder="ex. Education"></input>
            <br></br>
            <span className="op-input-name vendor-in"> vendor </span> <input className="input" name="vendor" value={this.state.vendor} onChange={this.updateState} placeholder="ex. Elevation"></input> 
            
            <Button  id="link-wise" onClick={async() => await this.postTransaction(false)}>Deposit</Button>
            <Button  id="link-wise" onClick={async() => await this.postTransaction(true)} >Withdraw</Button>

          </div>

        }
      </div>
    );
  }
}

export default Operations;
