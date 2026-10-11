package com.ashim.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ashim.dao.IProductRepository;
import com.ashim.entity.Product;
import com.ashim.exceptions.ProductNotFoundException;

@Service
public class ProductServiceImpl implements IProductService {

	private final IProductRepository repo;

	public ProductServiceImpl(IProductRepository repo) {
		this.repo = repo;
	}

	@Override
	public Product createProduct(Product newProduct) {
		return repo.save(newProduct);
	}

	@Override
	public Product getProductById(Long id) {
		Optional<Product> product = repo.findById(id);
		if(product.isPresent()) {
			return product.get();
		} else {
			return product.orElseThrow(()-> new ProductNotFoundException("Product with id: "+id+" not found!"));
		}
	}

	@Override
	public List<Product> getAllProducts() {
		return repo.findAll();
	}

	@Override
	public Product updateProduct(Product updatedProduct) {

		Long productId = updatedProduct.getId();

		Optional<Product> optional = repo.findById(productId);
		if(optional.isPresent()) {
			Product existingProduct = optional.get();

			existingProduct.setName(updatedProduct.getName());
			existingProduct.setPrice(updatedProduct.getPrice());
			existingProduct.setDescription(updatedProduct.getDescription());
			existingProduct.setStock(updatedProduct.getStock());
			existingProduct.setCategory(updatedProduct.getCategory());

			return repo.save(existingProduct);
		} else {
			throw new ProductNotFoundException("Product with ID "+productId+" not found!");
		}
	}

	@Override
	public String deleteProductById(Long id) {
		Optional<Product> product = repo.findById(id);
		if(product.isPresent()) {
			Product productToBeDeleted = product.get();
			repo.delete(productToBeDeleted);
			return "Product with ID "+id+" deleted successfully!";
		} else {
			throw new ProductNotFoundException("Product with ID "+id+" not found!");
		}
	}

}
