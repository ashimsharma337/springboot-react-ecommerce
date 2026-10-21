package com.ashim.controller;

import java.math.BigDecimal;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ashim.dto.ProductCatalogResponse.ProductDetailResponse;
import com.ashim.dto.ProductCatalogResponse.ProductResponse;
import com.ashim.entity.Product;
import com.ashim.service.ProductCatalogService;
import com.ashim.service.ProductServiceImpl;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	private final ProductServiceImpl productService;
	private final ProductCatalogService catalogService;

	private final Logger logger = LoggerFactory.getLogger(ProductController.class);

	public ProductController(ProductServiceImpl productService, ProductCatalogService catalogService) {
		this.productService = productService;
		this.catalogService = catalogService;
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
	public List<ProductResponse> getAllProducts(
			@RequestParam(required = false) String category,
			@RequestParam(required = false) String subcategory,
			@RequestParam(required = false) Boolean inStock,
			@RequestParam(required = false) BigDecimal minPrice,
			@RequestParam(required = false) BigDecimal maxPrice,
			@RequestParam(required = false) String search) {
		logger.info("GET request received for all products: Fetching all products....");
		return catalogService.searchProducts(category, subcategory, inStock, minPrice, maxPrice, search);
	}

	@GetMapping("/slug/{slug}")
	public ProductDetailResponse getProductDetailsBySlug(@PathVariable String slug) {
		return catalogService.getProductDetails(slug);
	}

	@PutMapping("/{id}")
	public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
		logger.info("PUT request received: Updating product with id {}", id);
		if(!id.equals(updatedProduct.getId())) {
			throw new IllegalArgumentException("Id provided does not match with existing product id!");
		}
		return productService.updateProduct(updatedProduct);
	}

	@DeleteMapping("/{id}")
	public String deleteStudentById(@PathVariable Long id) {
		logger.info("DELETE request received: deleting product with id {}", id);
		return productService.deleteProductById(id);
	}

}
