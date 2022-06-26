package com.fullstacktest.modelsisspringboot.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductResponse {

	private Long id;

	private String productType;

	private String nameProduct;

	private long productTypeId;

	private String dateCreated;

}