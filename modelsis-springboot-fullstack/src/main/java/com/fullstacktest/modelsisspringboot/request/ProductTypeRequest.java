package com.fullstacktest.modelsisspringboot.request;

import java.sql.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductTypeRequest {

	private String nameTypeProduct;

	private List<String> products;

	private Date dateCreated;

}
