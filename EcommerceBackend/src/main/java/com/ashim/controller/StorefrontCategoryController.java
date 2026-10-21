package com.ashim.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ashim.dto.ProductCatalogResponse.CategoryResponse;
import com.ashim.service.ProductCatalogService;

@RestController
@RequestMapping("/api/storefront/categories")
public class StorefrontCategoryController {

	private final ProductCatalogService catalogService;

	public StorefrontCategoryController(ProductCatalogService catalogService) {
		this.catalogService = catalogService;
	}

	@GetMapping
	public List<CategoryResponse> getCategories() {
		return catalogService.getCategories();
	}
}
