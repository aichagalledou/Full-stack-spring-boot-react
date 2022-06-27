import React, { Component } from 'react'
import ProductTypeService from  '../../services/ProductTypeService';
import {withRouter} from '../../withRouter';

class CreateProductTypeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productType: {
            id: this.props.params.id,
            nameTypeProduct: ''
            }
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
    }

    componentDidMount(){
        return     
    }
    
    saveOrUpdateProductType = (e) => {
        e.preventDefault();
        let productType = {nameTypeProduct: this.state.nameTypeProduct};
        console.log('productType => ' + JSON.stringify(productType));
            ProductTypeService.createProductType(productType).then(res =>{
                this.props.navigate('/products');
            });
    }
    
    changeNameHandler= (event) => {
        this.setState({nameTypeProduct: event.target.value});
    }

    cancel(){
        this.props.navigate('/products');
    }

    getTitle(){
        return <h3 className="text-center">Add Product Type</h3>
    }
    render() {
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
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.nameTypeProduct} onChange={this.changeNameHandler}/>
                                        </div>
                                        <p><strong>* required</strong></p>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateProductType}>Save</button>
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

export default withRouter (CreateProductTypeComponent);
