import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';
import * as ReactBootStrap from 'react-bootstrap'



class Categories extends Component {

  initCategories () {

    const transactions = this.props.transactions
      let categoriesObj = {}
    transactions.forEach(t => {

      if (categoriesObj[t.category]){
          categoriesObj[t.category]['sum'] += t.amount
      }else{
          categoriesObj[t.category]= {category: t.category,sum: t.amount, _id:t._id} 
      }
  })
    const categoriesArr=Object.values(categoriesObj)
    return categoriesArr
  }



  render() {
    const categories = this.initCategories()
    return (
      <div className="App container">
          <ReactBootStrap.Table striped bordered hover className="table">
            <thead>
              <tr className='table-header'>
                <th>Sum</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(c =>
                <Category key={c._id} category={c} />
              )}
            </tbody>
          </ReactBootStrap.Table>
      </div>
    );
  }
}

export default Categories;

