package com.ashim.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ashim.entity.Product;
import com.ashim.service.ProductServiceImpl;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	private final ProductServiceImpl productService;

	private final Logger logger = LoggerFactory.getLogger(ProductController.class);

	public ProductController(ProductServiceImpl productService) {
		this.productService = productService;
	}


	@PostMapping()
	public Product addProduct(@RequestBody Product newProduct) {
		logger.info("POST request received: Adding new product with name = {}", newProduct.getName());
		return productService.createProduct(newProduct);
	}

	@GetMapping("/{id}")
	public Product getProductById(@PathVariable Long id) {
		logger.info("GET request received: Fetching product details for productID = {}", id);
		return productService.getProductById(id);
	}

	@GetMapping()
	public List<Product> getAllProducts() {
		logger.info("GET request received for all products: Fetching all products....");
		return productService.getAllProducts();
	}

	@PutMapping("/{id}")
	public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
		logger.info("PUT request received: Updating product with id ", updatedProduct.getId());
		if(!id.equals(updatedProduct.getId())) {
			throw new IllegalArgumentException("Id provided does not match with existing product id!");
		}
		return productService.updateProduct(updatedProduct);
	}

	@DeleteMapping("/{id}")
	public String deleteStudentById(@PathVariable Long id) {
		logger.info("DELETE request received: deleting product with id ", id);
		return productService.deleteProductById(id);
	}

}
