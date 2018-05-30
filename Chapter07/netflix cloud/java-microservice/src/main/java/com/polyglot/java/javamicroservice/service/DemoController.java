package com.polyglot.java.javamicroservice.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.polyglot.java.javamicroservice.model.ProductModel;

@RestController
public class DemoController {

	@GetMapping(value = "/product")
	public ProductModel firstPage() {

		ProductModel prm = new ProductModel();
		prm.setName("parth");
		prm.setDescription("demo product 1");
		prm.setProductId("#12345463e56");
		return prm;
	}
}
