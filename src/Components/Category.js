import React, { Component } from 'react';


class Category extends Component {
    constructor() {
        super()
        this.state = {}
    }


    render() {
        const c = this.props.category
        return (
            <tr >
                {c.sum<0?
                <td className="negative-amount table-item amount">${c.sum}</td>
                :<td className="positive-amount table-item amount">${c.sum}</td>
                }
                <td className='table-item'>{c.category}</td>
            </tr>
        )
    }
}

export default Category