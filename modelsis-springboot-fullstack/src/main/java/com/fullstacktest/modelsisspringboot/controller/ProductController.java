package com.fullstacktest.modelsisspringboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstacktest.modelsisspringboot.entity.Product;
import com.fullstacktest.modelsisspringboot.entity.ProductType;
import com.fullstacktest.modelsisspringboot.exception.ResourceNotFoundException;
import com.fullstacktest.modelsisspringboot.repository.ProductRepository;
import com.fullstacktest.modelsisspringboot.repository.ProductTypeRepository;
import com.fullstacktest.modelsisspringboot.response.ProductResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class ProductController {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductTypeRepository productTypeRepository;

	// Get all products
	@GetMapping("/products")
	public List<ProductResponse> getProducts() {
		List<Product> list = productRepository.findAll();
		List<ProductResponse> responseList = new ArrayList<>();
		list.forEach(c -> {
			ProductResponse response = new ProductResponse();
			response.setId(c.getId());
			response.setProductType(c.getProductType().getNameTypeProduct());
			response.setProductTypeId(c.getProductType().getId());
			response.setDateCreated(c.dateCreated(c.getDateCreated()));
			response.setNameProduct(c.getNameProduct());
			responseList.add(response);
		});
		return responseList;
	}

	// Get product with type
	@GetMapping("/products/{productTypeId}/productTypes")
	public ResponseEntity<List<Product>> getAllProductsByProductTypeId(
			@PathVariable(value = "productTypeId") Long productTypeId) {
		if (!productTypeRepository.existsById(productTypeId)) {
			throw new ResourceNotFoundException("Not found Product Type with id = " + productTypeId);
		}
		List<Product> products = productRepository.findByProductTypeId(productTypeId);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	// Get Product by id product and id product type view product details
	@GetMapping("/products/{id}")
	public ProductResponse getProductById(@PathVariable(value = "id") Long id) {

		Product productEntity = productRepository.findById(id).get();
		ProductResponse response = new ProductResponse();
		response.setId(productEntity.getId());
		response.setNameProduct(productEntity.getNameProduct());
		response.setProductType(productEntity.getProductType().getNameTypeProduct());

		return response;
	}

	// Create a new product
	@PostMapping("/products/{productTypeId}")
	public ResponseEntity<Product> createProduct(@PathVariable(value = "productTypeId") Long productTypeId,
			@RequestBody Product productRequest) {
		Product product = productTypeRepository.findById(productTypeId).map(productType -> {
			productRequest.setProductType(productType);
			return productRepository.save(productRequest);
		}).orElseThrow(() -> new ResourceNotFoundException("Not found Product Type with id = " + productTypeId));
		return new ResponseEntity<>(product, HttpStatus.CREATED);
	}

	//Edit a product
	@PutMapping("/products/{id}/{productTypeId}")
	public ResponseEntity<Product> updateProduct(@PathVariable(value = "id") Long id,
			@PathVariable(value = "productTypeId") Long productTypeId, @RequestBody Product product) {

		Product productEntity = productRepository.findById(id).get();
		ProductType Found = productTypeRepository.findById(productTypeId).get();

		productEntity.setNameProduct(product.getNameProduct());
		productEntity.setProductType(Found);
		productEntity.setDateCreated(productEntity.getDateCreated());

		productRepository.save(productEntity);

		return ResponseEntity.ok(product);
	}

	// Delete a Product by id product
	@DeleteMapping("/products/{id}")
	public ResponseEntity<HttpStatus> deleteProduct(@PathVariable("id") long id) {
		productRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
