import axios from 'axios';

const PRODUCT_TYPE_API_BASE_URL = "http://localhost:8080/productTypes";

class ProductTypeService {

    getProductType() {
        return axios.get(PRODUCT_TYPE_API_BASE_URL);
    }

    createProductType(productType) {
        return axios.post(PRODUCT_TYPE_API_BASE_URL, productType);
    }

    getProductTypeById(productTypeId) {
        return axios.get(PRODUCT_TYPE_API_BASE_URL + '/' + productTypeId);
    }

    updateProductType(productType, productTypeId) {
        return axios.put(PRODUCT_TYPE_API_BASE_URL + '/' + productTypeId, productType);
    }

    deleteProductType(productTypeId) {
        return axios.delete(PRODUCT_TYPE_API_BASE_URL + '/' + productTypeId);
    }


}

export default new ProductTypeService()