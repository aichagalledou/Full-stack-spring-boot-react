import React, { Component } from 'react'
import ProductService from '../../services/ProductService'
import {withRouter} from '../../withRouter';

class ViewProductComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id,
            product: {}
        }
    }
    
    componentDidMount(){
        ProductService.getProductById(this.state.id).then( res => {
            this.setState({product: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Product Details </h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Name :  </label>
                            <div> { this.state.product.nameProduct } </div>
                        </div>
                        <div className = "row">
                            <label> Type :  </label>
                            <div> { this.state.product.productType } </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default withRouter (ViewProductComponent);
