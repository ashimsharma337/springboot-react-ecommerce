package com.ashim.service;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Map;

import org.junit.jupiter.api.Test;

import com.ashim.dao.IProductRepository;
import com.ashim.entity.Product;

class ProductServiceImplTest {

	private final IProductRepository productRepository = mock(IProductRepository.class);
	private final ProductServiceImpl productService = new ProductServiceImpl(productRepository);

	@Test
	void createProductNormalizesSlugAndDatabaseDefaults() {
		Product product = new Product();
		product.setName("Élan Headphones");
		product.setPrice(new BigDecimal("49.99"));
		product.setStock(5);
		when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

		Product created = productService.createProduct(product);

		assertEquals("elan-headphones", created.getSlug());
		assertEquals(Map.of(), created.getAttributes());
		assertArrayEquals(new String[0], created.getConnectivities());
		assertArrayEquals(new String[0], created.getFinishes());
		assertTrue(created.getInStock());
		verify(productRepository).save(product);
	}

	@Test
	void createProductRejectsNameWithoutSlugCharacters() {
		Product product = new Product();
		product.setName("!!!");

		assertThrows(IllegalArgumentException.class, () -> productService.createProduct(product));
		verifyNoInteractions(productRepository);
	}

	@Test
	void createProductUsesDatabaseDefaultForAvailabilityWhenUnspecified() {
		Product product = new Product();
		product.setName("Out of stock product");
		product.setStock(0);
		when(productRepository.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

		Product created = productService.createProduct(product);

		assertNotNull(created.getInStock());
		assertTrue(created.getInStock());
	}
}
