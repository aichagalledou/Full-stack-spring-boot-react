package com.fullstacktest.modelsisspringboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fullstacktest.modelsisspringboot.entity.ProductType;
import com.fullstacktest.modelsisspringboot.exception.ResourceNotFoundException;
import com.fullstacktest.modelsisspringboot.repository.ProductTypeRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class ProductTypeController {

	@Autowired
	ProductTypeRepository productTypeRepository;
	//Get all product Type
	@GetMapping("/productTypes")
	public ResponseEntity<List<ProductType>> getAllProductTypes(@RequestParam(required = false) String nameTypeProduct) {
		List<ProductType> productTypes = new ArrayList<ProductType>();
		if (nameTypeProduct == null)
			productTypeRepository.findAll().forEach(productTypes::add);
		else
			productTypeRepository.findByNameTypeProduct(nameTypeProduct).forEach(productTypes::add);
		if (productTypes.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(productTypes, HttpStatus.OK);
	}
	
	//Get product Type with id
	@GetMapping("/productTypes/{id}")
	public ResponseEntity<ProductType> getProductTypeById(@PathVariable("id") Long id) {
		ProductType productType = productTypeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Not found ProductType with id = " + id));
		return new ResponseEntity<>(productType, HttpStatus.OK);
	}
	//Créate a product Type
	@PostMapping("/productTypes")
	public ResponseEntity<ProductType> createProductType(@RequestBody ProductType productType) {
		// ProductType _productType = productTypeRepository.save(new ProductType());

		ProductType _productType = productTypeRepository.save(new ProductType(productType.getId(),
				productType.getNameTypeProduct(), productType.getProducts(), productType.getDateCreated()));
		return new ResponseEntity<>(_productType, HttpStatus.CREATED);
	}


}