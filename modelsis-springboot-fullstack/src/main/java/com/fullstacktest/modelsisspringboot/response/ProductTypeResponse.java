package com.fullstacktest.modelsisspringboot.response;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductTypeResponse {

	private Long id;

	private String productType;

	private String nameTypeProduct;

	private List<String> products;

	private Date dateCreated;

}
