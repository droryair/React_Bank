import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';


class Transaction extends Component {
  constructor() {
    super()
    this.state = {}
  }

  deleteTranaction = async () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await this.props.deleteTranaction(this.props.transaction)
    }
  }
  render() {
    const t = this.props.transaction
    return (
      <tr>
        {t.amount < 0 ?
          <td className="negative-amount table-item amount">${t.amount}</td>
          : <td className="positive-amount table-item amount">${t.amount}</td>
        }
        <td class="table-item">{t.category}</td>
        <td class="table-item">{t.vendor}</td>
        <td className='table-item'>


          <Button className="shadow p-3 mb-5 rounded" onClick={this.deleteTranaction}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z" />
            </svg></Button>
        </td>
      </tr>
    );
  }
}

export default Transaction;
