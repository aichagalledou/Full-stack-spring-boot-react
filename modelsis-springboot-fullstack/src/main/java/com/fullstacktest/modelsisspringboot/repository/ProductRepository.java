package com.fullstacktest.modelsisspringboot.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fullstacktest.modelsisspringboot.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findByProductTypeId(Long productId);

	Product findById(long id);

	List<Product> findByNameProduct(String name);

	@Transactional
	void deleteByProductTypeId(long productTypeId);

}
