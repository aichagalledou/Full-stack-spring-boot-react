package com.fullstacktest.modelsisspringboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fullstacktest.modelsisspringboot.entity.ProductType;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Long>{
	List<ProductType> findById(long id);

	List<ProductType> findByNameTypeProduct(String nameTypeProduct);	
	

}