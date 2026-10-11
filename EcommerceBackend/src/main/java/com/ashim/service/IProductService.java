package com.ashim.service;

import java.util.List;

import com.ashim.entity.Product;

public interface IProductService {

	Product createProduct(Product newProduct);
	Product getProductById(Long id);
	List<Product> getAllProducts();
    Product updateProduct(Product updatedProduct);
    String deleteProductById(Long id);

}
