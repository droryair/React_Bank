import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import Transaction from './Transection'
import * as ReactBootStrap from 'react-bootstrap'



class Categories extends Component {
  constructor() {
    super()
    this.state = {
        categories:''
    }
  }


  async componentWillReceiveProps(nextProps){
      const transactions = nextProps.transactions
      let categoriesObj = {}
    transactions.forEach(t => {

      if (categoriesObj[t.category]){
          categoriesObj[t.category]['sum'] += t.amount
      }else{
          categoriesObj[t.category]= {category: t.category,sum: t.amount, _id:t._id} 
      }
  })
    const categoriesArr=Object.values(categoriesObj)
    await this.setState({categories:categoriesArr})
  }
  
  reload=()=>{
    window.location.reload()
  }

  render() {
    const categories = this.state.categories
    return (
      <div className="App">

        <Link to='/'>Transactions</Link>
        <Link to='/operations'>Operations</Link>
        <p>Don't see anything? try <button onClick={this.reload}>Reloading</button></p>
        {categories ?
          <ReactBootStrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Sum</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c =>
                <Category key={c._id} category={c} />
              )}
            </tbody>
          </ReactBootStrap.Table>
          : null}
      </div>
    );
  }
}

export default Categories;

