import React, { Component } from 'react';

class Transaction extends Component {
  constructor() {
    super()
    this.state = {}
  }

  deleteTranaction = () => {
    this.props.deleteTranaction(this.props.transaction)
  }
  render() {
    const t = this.props.transaction
    return (
      // <div>
      <tr>
        {t.amount ?
          <td className="negative-amount tam">{t.amount}</td>
          : <td className="negative-amount tam">{t.amount}</td>
        }
        <td>{t.category}</td>
        <td>{t.vendor}</td>
        <td>
          <button onClick={this.deleteTranaction}>delete</button>
        </td>
      </tr>
      //   {/* {transaction.amount < 0 ?
      //     <span className="negative-amount tam">Amount: {transaction.amount} </span>
      //     :
      //     <span className="positive-amount tam">Amount: {transaction.amount} </span>
      //   }
      //   <span className="tca"> {transaction.category}</span>
      //   <span className="tva"> {transaction.vendor}</span>
      //   <button onClick={this.deleteTranaction}>delete</button>
      // </div> */}
    );

    //     <ReactBootStrap.Table striped bordered hover>
    //     <thead>
    //         <tr>
    //             <th>Category</th>
    //             <th>Sum</th>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {categories.map((c, i) => {
    //             return (
    //                 <tr key={i}>
    //                     <td>{c.category}</td>
    //                     <td>{c.sum}</td>
    //                 </tr>
    //             )
    //         })}
    //     </tbody>
    // </ReactBootStrap.Table>
  }
}

export default Transaction;
