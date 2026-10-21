package com.ashim.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ashim.dao.IProductBoxContentRepository;
import com.ashim.dao.IProductGalleryRepository;
import com.ashim.dao.IProductRepository;
import com.ashim.dao.IProductReviewRepository;
import com.ashim.dao.IProductSpecificationGroupRepository;
import com.ashim.dao.IProductSpecificationRepository;
import com.ashim.dao.IRelatedProductRepository;
import com.ashim.dao.IStorefrontCategoryProductRepository;
import com.ashim.dao.IStorefrontCategoryRepository;
import com.ashim.dto.ProductCatalogResponse.BoxContentResponse;
import com.ashim.dto.ProductCatalogResponse.CategoryResponse;
import com.ashim.dto.ProductCatalogResponse.GalleryImageResponse;
import com.ashim.dto.ProductCatalogResponse.ProductDetailResponse;
import com.ashim.dto.ProductCatalogResponse.ProductResponse;
import com.ashim.dto.ProductCatalogResponse.RelatedProductResponse;
import com.ashim.dto.ProductCatalogResponse.ReviewResponse;
import com.ashim.dto.ProductCatalogResponse.SpecificationGroupResponse;
import com.ashim.entity.Product;
import com.ashim.entity.ProductSpecificationGroup;
import com.ashim.entity.StorefrontCategoryProduct;
import com.ashim.exceptions.ProductNotFoundException;

import jakarta.persistence.criteria.Predicate;
@Service
@Transactional(readOnly = true)
public class ProductCatalogService {

	private final IProductRepository productRepository;
	private final IStorefrontCategoryRepository categoryRepository;
	private final IStorefrontCategoryProductRepository categoryProductRepository;
	private final IProductGalleryRepository galleryRepository;
	private final IProductSpecificationGroupRepository specificationGroupRepository;
	private final IProductSpecificationRepository specificationRepository;
	private final IProductBoxContentRepository boxContentRepository;
	private final IProductReviewRepository reviewRepository;
	private final IRelatedProductRepository relatedProductRepository;

	public ProductCatalogService(
			IProductRepository productRepository,
			IStorefrontCategoryRepository categoryRepository,
			IStorefrontCategoryProductRepository categoryProductRepository,
			IProductGalleryRepository galleryRepository,
			IProductSpecificationGroupRepository specificationGroupRepository,
			IProductSpecificationRepository specificationRepository,
			IProductBoxContentRepository boxContentRepository,
			IProductReviewRepository reviewRepository,
			IRelatedProductRepository relatedProductRepository) {
		this.productRepository = productRepository;
		this.categoryRepository = categoryRepository;
		this.categoryProductRepository = categoryProductRepository;
		this.galleryRepository = galleryRepository;
		this.specificationGroupRepository = specificationGroupRepository;
		this.specificationRepository = specificationRepository;
		this.boxContentRepository = boxContentRepository;
		this.reviewRepository = reviewRepository;
		this.relatedProductRepository = relatedProductRepository;
	}

	public List<ProductResponse> searchProducts(
			String category,
			String subcategory,
			Boolean inStock,
			BigDecimal minPrice,
			BigDecimal maxPrice,
			String search) {
		if (minPrice != null && maxPrice != null && minPrice.compareTo(maxPrice) > 0) {
			throw new IllegalArgumentException("minPrice must be less than or equal to maxPrice");
		}
		Specification<Product> filters = catalogFilters(
				normalize(category),
				normalize(subcategory),
				inStock,
				minPrice,
				maxPrice,
				normalize(search));
		return productRepository.findAll(filters, Sort.by(Sort.Direction.ASC, "name")).stream()
				.map(ProductResponse::from)
				.toList();
	}

	private Specification<Product> catalogFilters(
			String category,
			String subcategory,
			Boolean inStock,
			BigDecimal minPrice,
			BigDecimal maxPrice,
			String search) {
		return (root, query, criteriaBuilder) -> {
			List<Predicate> predicates = new java.util.ArrayList<>();

			if (category != null) {
				String normalizedCategory = category.toLowerCase(java.util.Locale.ROOT);
				var categoryPredicate = criteriaBuilder.equal(
						criteriaBuilder.lower(root.get("category")), normalizedCategory);
				var categorySubquery = query.subquery(Long.class);
				var categoryProduct = categorySubquery.from(StorefrontCategoryProduct.class);
				categorySubquery.select(categoryProduct.get("id").get("productId"))
						.where(
								criteriaBuilder.equal(categoryProduct.get("product").get("id"), root.get("id")),
								criteriaBuilder.or(
										criteriaBuilder.equal(
												criteriaBuilder.lower(categoryProduct.get("category").get("slug")),
												normalizedCategory),
										criteriaBuilder.equal(
												criteriaBuilder.lower(categoryProduct.get("category").get("name")),
												normalizedCategory)));
				predicates.add(criteriaBuilder.or(
						categoryPredicate,
						criteriaBuilder.exists(categorySubquery)));
			}

			if (subcategory != null) {
				predicates.add(criteriaBuilder.equal(
						criteriaBuilder.lower(root.get("subcategory")),
						subcategory.toLowerCase(java.util.Locale.ROOT)));
			}
			if (inStock != null) {
				predicates.add(criteriaBuilder.equal(root.get("inStock"), inStock));
			}
			if (minPrice != null) {
				predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
			}
			if (maxPrice != null) {
				predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
			}
			if (search != null) {
				String pattern = "%" + search.toLowerCase(java.util.Locale.ROOT) + "%";
				predicates.add(criteriaBuilder.or(
						criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), pattern),
						criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), pattern)));
			}

			return criteriaBuilder.and(predicates.toArray(Predicate[]::new));
		};
	}

	public List<CategoryResponse> getCategories() {
		return categoryRepository.findAllByOrderByDisplayOrderAsc().stream()
				.map(category -> CategoryResponse.from(
						category,
						categoryProductRepository.findByCategory_IdOrderByDisplayOrderAsc(category.getId())
								.stream()
								.map(categoryProduct -> ProductResponse.from(categoryProduct.getProduct()))
								.toList()))
				.toList();
	}

	@Transactional(readOnly = true)
	public ProductDetailResponse getProductDetails(String slug) {
		Product product = productRepository.findBySlugIgnoreCase(slug)
				.orElseThrow(() -> new ProductNotFoundException("Product with slug '" + slug + "' not found."));

		List<SpecificationGroupResponse> specifications =
				specificationGroupRepository.findByProduct_IdOrderByDisplayOrderAsc(product.getId())
						.stream()
						.map(this::toSpecificationGroup)
						.toList();

		return new ProductDetailResponse(
				ProductResponse.from(product),
				galleryRepository.findByProduct_IdOrderByDisplayOrderAsc(product.getId()).stream()
						.map(GalleryImageResponse::from).toList(),
				specifications,
				boxContentRepository.findByProduct_IdOrderByDisplayOrderAsc(product.getId()).stream()
						.map(BoxContentResponse::from).toList(),
				reviewRepository.findByProduct_IdOrderByReviewedAtDesc(product.getId()).stream()
						.map(ReviewResponse::from).toList(),
				relatedProductRepository.findByProduct_IdOrderByDisplayOrderAsc(product.getId()).stream()
						.map(RelatedProductResponse::from).toList());
	}

	private SpecificationGroupResponse toSpecificationGroup(ProductSpecificationGroup group) {
		return SpecificationGroupResponse.from(
				group,
				specificationRepository.findByGroup_IdOrderByDisplayOrderAsc(group.getId()));
	}

	private String normalize(String value) {
		return value == null || value.isBlank() ? null : value.trim();
	}
}
