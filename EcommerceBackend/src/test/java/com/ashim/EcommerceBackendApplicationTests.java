package com.ashim;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;

import com.ashim.service.ProductCatalogService;

@SpringBootTest
class EcommerceBackendApplicationTests {

	@Autowired
	private ProductCatalogService productCatalogService;

	@Test
	void contextLoads() {
	}

	@Test
	void catalogSearchSupportsOmittedAndProvidedFilters() {
		productCatalogService.searchProducts(null, null, null, null, null, null);
		productCatalogService.searchProducts("premium-audio", "over-ear monitors", true,
				null, null, "studio");
	}

}
