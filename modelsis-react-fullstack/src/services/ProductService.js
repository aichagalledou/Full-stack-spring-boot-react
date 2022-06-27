import axios from 'axios';

const PRODUCT_API_BASE_URL = "http://localhost:8080/products";

class ProductService {

    getProducts() {
        return axios.get(PRODUCT_API_BASE_URL);
    }

    createProduct(data, productTypeId) {
        return axios.post(PRODUCT_API_BASE_URL + '/' + productTypeId + '', data);
    }

    getProductById(productId) {
        return axios.get(PRODUCT_API_BASE_URL + '/' + productId);
    }

    updateProduct(data, productId, productTypeId) {
        return axios.put(PRODUCT_API_BASE_URL + '/' + productId + '/' + productTypeId, data);
    }

    deleteProduct(productId) {
        return axios.delete(PRODUCT_API_BASE_URL + '/' + productId);
    }

}

export default new ProductService()