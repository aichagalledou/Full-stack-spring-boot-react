import React, { Component } from 'react'
import ProductService from '../../services/ProductService'
import {withRouter} from '../../withRouter';

class ListProductComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
                products: [],
        }

        // Get it from props
        this.addProduct = this.addProduct.bind(this);
        this.addProductType = this.addProductType.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        
    }

    deleteProduct(id){
        ProductService.deleteProduct(id).then( res => {
            this.setState({products: this.state.products.filter(product => product.id !== id)});
        });
    }
    viewProduct(id){
        this.props.navigate(`/view-product/${id}`);
    }
    editProduct(id){
        this.props.navigate(`/add-product/${id}`);
    }

    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({ products: res.data});
        });
    }

    addProduct(){
        this.props.navigate('/add-product/_add');
    }
    
    addProductType(){
        this.props.navigate('/add-productType/_add');
    }
    render() {
        return (
            <div>
                    <h2 className="text-center">Products List</h2>
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                            <tr>
                                <th> ID </th>
                                <th> Name </th>
                                <th> Date created </th>
                                <th> Type </th>
                                <th> Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map(
                                        product => 
                                        <tr key = {product.id}>
                                            <td> {product.id} </td>   
                                            <td> {product.nameProduct}</td>   
                                            <td> {product.dateCreated}</td>
                                            <td> {product.productType}</td>
                                            <td>
                                                <button onClick={ () => this.editProduct(product.id)} className="btn btn-info">Edit</button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProduct(product.id)} className="btn btn-danger">Delete </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewProduct(product.id)} className="btn btn-info">View </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                    </div>
                 <div className = "row float-right">
                    <button className="btn btn-primary" onClick={this.addProduct}> Add Product</button>
                 </div>
                 <div>
                    <button className="btn btn-primary" onClick={this.addProductType}> Add Type</button>
                 </div>
                 <br></br>
                 <br></br>

            </div>
        )
    }
}

export default withRouter(ListProductComponent);
