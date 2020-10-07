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
                <td>{c.category}</td>
                <td>{c.sum}</td>
            </tr>
        )
    }
}

export default Category;
