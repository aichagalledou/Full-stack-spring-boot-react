package com.fullstacktest.modelsisspringboot.request;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductRequest {

	private Long id;

	private String productType;

	private String nameProduct;

	private long productTypeId;

	private Date dateCreated;

}
