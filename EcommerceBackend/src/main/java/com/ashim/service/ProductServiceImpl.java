package com.ashim.service;

import java.text.Normalizer;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
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
		prepareProduct(newProduct);
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
			existingProduct.setSlug(updatedProduct.getSlug());
			existingProduct.setImageUrl(updatedProduct.getImageUrl());
			existingProduct.setImageAlt(updatedProduct.getImageAlt());
			existingProduct.setRating(updatedProduct.getRating());
			existingProduct.setReviewCount(updatedProduct.getReviewCount());
			existingProduct.setBadge(updatedProduct.getBadge());
			existingProduct.setBadgeTone(updatedProduct.getBadgeTone());
			existingProduct.setSpecs(updatedProduct.getSpecs());
			existingProduct.setSeries(updatedProduct.getSeries());
			existingProduct.setSubcategory(updatedProduct.getSubcategory());
			existingProduct.setAttributes(updatedProduct.getAttributes());
			existingProduct.setConnectivities(updatedProduct.getConnectivities());
			existingProduct.setFinishes(updatedProduct.getFinishes());
			existingProduct.setInStock(updatedProduct.getInStock());
			existingProduct.setNoiseCancelling(updatedProduct.getNoiseCancelling());

			prepareProduct(existingProduct);
			return repo.save(existingProduct);
		} else {
			throw new ProductNotFoundException("Product with ID "+productId+" not found!");
		}
	}

	private void prepareProduct(Product product) {
		if (product.getSlug() == null || product.getSlug().isBlank()) {
			product.setSlug(toSlug(product.getName()));
		} else {
			product.setSlug(toSlug(product.getSlug()));
		}
		if (product.getAttributes() == null) {
			product.setAttributes(new HashMap<>());
		}
		if (product.getConnectivities() == null) {
			product.setConnectivities(new String[0]);
		}
		if (product.getFinishes() == null) {
			product.setFinishes(new String[0]);
		}
		if (product.getInStock() == null) {
			product.setInStock(product.getStock() != null && product.getStock() > 0);
		}
	}

	private String toSlug(String value) {
		if (value == null || value.isBlank()) {
			throw new IllegalArgumentException("Product name and slug must not be blank");
		}
		String slug = Normalizer.normalize(value.trim(), Normalizer.Form.NFD)
				.replaceAll("\\p{M}", "")
				.toLowerCase(Locale.ROOT)
				.replaceAll("[^a-z0-9]+", "-")
				.replaceAll("(^-|-$)", "");
		if (slug.isBlank()) {
			throw new IllegalArgumentException("Product name and slug must contain letters or numbers");
		}
		if (slug.length() > 160) {
			throw new IllegalArgumentException("Product slug must be 160 characters or fewer");
		}
		return slug;
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
