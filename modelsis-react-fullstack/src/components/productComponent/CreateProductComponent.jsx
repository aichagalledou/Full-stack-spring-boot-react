import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import ProductService from '../../services/ProductService';
import {withRouter} from '../../withRouter';

class CreateProductComponent extends Component {
    constructor(props){ 
        super(props)
        this.state = {
            selectOptions : [],
            product: {
                id: this.props.params.id,
                nameProduct: '',
                productType: ''
            },
          productTypes: {
            id : '',
            nameTypeProduct: '',
            dateCreate: ''
          }
        }
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this); 
        this.changeProductTypeNameSelectedHandler = this.changeProductTypeNameSelectedHandler.bind(this); 

    }
     
    async getOptions() {
        const res = await axios.get('http://localhost:8080/productTypes');
        const data = res.data
        const options = data.map(d => ({
                "value" : d.id,
                "label" : d.nameTypeProduct
              }))
        
        this.setState({selectOptions: options})
     
    }
      
    /*  
    handleChange(e){
    this.setState({id:e.value, nameTypeProduct:e.label})
    }*/
    handleChange(e) {
        console.log(e);
        this.setState({
            id:e.value, nameTypeProduct:e.label,
        });
      }

      
    componentDidMount(){
        this.getOptions()
        if(this.state.product.id === '_add'){
            return
        }
        else{
            ProductService.getProductById(this.state.product.id).then( (res) =>{
                let product = res.data;

                this.setState({product: res.data});
                    
                this.setState({
                    nameProduct: product.nameProduct,
                    productType: this.state.product.productType
                });
            });
        }     
    }

    saveOrUpdateProduct = (e) => {
        e.preventDefault();
        let product = {nameProduct: this.state.nameProduct, nameTypeProduct: this.state.nameTypeProduct};
        console.log('product => ' + JSON.stringify(product));

        if(this.state.product.id === '_add'){
            ProductService.createProduct(product, this.state.id).then(res =>{
                this.props.navigate('/products');
            });
        }
        else{
           // let product = {nameProduct: this.state.nameProduct, productType:{id : this.state.productTypes.id, nameTypeProduct: this.state.productTypes.nameTypeProduct}};
            ProductService.updateProduct(product, this.state.product.id, this.state.id).then( res => {
                console.log(product, this.state.product.id, this.state.id);
                this.props.navigate('/products');
            });
        }
    }

    changeProductTypeHandler= (event) => {
        this.setState({productTypeId: event.target.value});
    }

    changeProductNameHandler= (event) => {
        this.setState({nameProduct: event.target.value});
    }

    changeProductTypeNameSelectedHandler= (event) => {
        this.setState({productType: event.target.value});
    }
     
    cancel(){
        this.props.navigate('/products');
    }

    getTitle(){
        if(this.state.product.id === '_add'){
            return <h3 className="text-center">Add Product</h3>
        }else{
            return <h3 className="text-center">Edit Product</h3>
        }
    }
    render() {
        console.log(this.state.selectOptions);
        if(this.state.product.id === '_add'){

            return (
                <div>
                    <br></br>
                    <div className = "container">
                            <div className = "row">
                                <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    {
                                        this.getTitle()
                                    }
                                    <div className = "card-body">
                                        <form>
                                            <div className = "form-group">
                                                <label> Name *: </label>
                                                <input placeholder="Name" name="name" className="form-control" value={this.state.nameProduct} onChange={this.changeProductNameHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                    <label> Type *: </label>
                                                <Select placeholder="Choose..." name="productTypes" options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
                                            </div>
                                            <p><strong>* required</strong></p>
                                            <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            )
        }

        else{

            return (
                <div>
                    <br></br>
                    <div className = "container">
                            <div className = "row">
                                <div className = "card col-md-6 offset-md-3 offset-md-3">
                                    {
                                        this.getTitle()
                                    }
                                    <div className = "card-body">
                                        <form  onSubmit={this.handleSubmit}>
                                            <div className = "form-group">
                                                <label> Name *: </label>
                                                <input placeholder="Name" name="name" className="form-control" value={this.state.nameProduct} onChange={this.changeProductNameHandler}/>
                                            </div>
                                            <div className = "form-group">
                                                    <label> Type *: </label>
                                                    {/* <Select  name="productTypes" options={this.state.selectOptions} inputValue={this.state.product.productType} onChange={this.handleChange.bind(this)}/> */}
                                                    <Select placeholder="Choose..."   name="productTypes" options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
                                                <p>You have selected <strong>{this.state.product.productType}</strong></p>
                                            </div>
                                            <p><strong>* required</strong></p>
                                            <button className="btn btn-success" onClick={this.saveOrUpdateProduct}>Save</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            )
        }

    } 
}

export default withRouter (CreateProductComponent);
