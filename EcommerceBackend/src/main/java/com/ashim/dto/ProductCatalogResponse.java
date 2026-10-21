package com.ashim.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;

import com.ashim.entity.Product;
import com.ashim.entity.ProductBoxContent;
import com.ashim.entity.ProductGallery;
import com.ashim.entity.ProductReview;
import com.ashim.entity.ProductSpecification;
import com.ashim.entity.ProductSpecificationGroup;
import com.ashim.entity.RelatedProduct;
import com.ashim.entity.StorefrontCategory;

public final class ProductCatalogResponse {

	private ProductCatalogResponse() {
	}

	public record ProductResponse(
			Long id,
			String slug,
			String name,
			String category,
			String subcategory,
			String description,
			String image,
			String imageAlt,
			BigDecimal price,
			String rating,
			Integer reviews,
			String badge,
			String badgeTone,
			String specs,
			String series,
			List<String> connectivities,
			List<String> finishes,
			Integer stock,
			Boolean inStock,
			Boolean noiseCancelling,
			Map<String, Object> attributes) {

		public static ProductResponse from(Product product) {
			return new ProductResponse(
					product.getId(),
					product.getSlug(),
					product.getName(),
					product.getCategory(),
					product.getSubcategory(),
					product.getDescription(),
					product.getImageUrl(),
					product.getImageAlt(),
					product.getPrice(),
					product.getRating() == null ? null : product.getRating().toPlainString(),
					product.getReviewCount(),
					product.getBadge(),
					product.getBadgeTone(),
					product.getSpecs(),
					product.getSeries(),
					product.getConnectivities() == null ? List.of() : List.of(product.getConnectivities()),
					product.getFinishes() == null ? List.of() : List.of(product.getFinishes()),
					product.getStock(),
					product.getInStock(),
					product.getNoiseCancelling(),
					product.getAttributes());
		}
	}

	public record CategoryResponse(
			Long id,
			String slug,
			String name,
			String eyebrow,
			String description,
			String units,
			String image,
			Short displayOrder,
			List<ProductResponse> products) {

		public static CategoryResponse from(StorefrontCategory category, List<ProductResponse> products) {
			return new CategoryResponse(category.getId(), category.getSlug(), category.getName(),
					category.getEyebrow(), category.getDescription(), category.getUnitLabel(),
					category.getImageUrl(), category.getDisplayOrder(), products);
		}
	}

	public record GalleryImageResponse(String image, String alt, String label, Short displayOrder) {

		public static GalleryImageResponse from(ProductGallery image) {
			return new GalleryImageResponse(image.getImageUrl(), image.getAltText(),
					image.getLabel(), image.getDisplayOrder());
		}
	}

	public record SpecificationResponse(String name, String value, Short displayOrder) {

		public static SpecificationResponse from(ProductSpecification specification) {
			return new SpecificationResponse(specification.getName(), specification.getValue(),
					specification.getDisplayOrder());
		}
	}

	public record SpecificationGroupResponse(
			String group,
			String title,
			Short displayOrder,
			List<SpecificationResponse> rows) {

		public static SpecificationGroupResponse from(
				ProductSpecificationGroup group,
				List<ProductSpecification> specifications) {
			return new SpecificationGroupResponse(
					group.getGroupName(),
					group.getTitle(),
					group.getDisplayOrder(),
					specifications.stream().map(SpecificationResponse::from).toList());
		}
	}

	public record BoxContentResponse(
			String title,
			String description,
			String icon,
			Short displayOrder) {

		public static BoxContentResponse from(ProductBoxContent content) {
			return new BoxContentResponse(content.getTitle(), content.getDescription(),
					content.getIcon(), content.getDisplayOrder());
		}
	}

	public record ReviewResponse(
			String initials,
			String name,
			String role,
			boolean verified,
			String title,
			String body,
			OffsetDateTime reviewedAt) {

		public static ReviewResponse from(ProductReview review) {
			return new ReviewResponse(review.getInitials(), review.getReviewerName(),
					review.getReviewerRole(), Boolean.TRUE.equals(review.getVerified()),
					review.getTitle(), review.getBody(), review.getReviewedAt());
		}
	}

	public record RelatedProductResponse(ProductResponse product, Short displayOrder) {

		public static RelatedProductResponse from(RelatedProduct relatedProduct) {
			return new RelatedProductResponse(
					ProductResponse.from(relatedProduct.getRelatedProduct()),
					relatedProduct.getDisplayOrder());
		}
	}

	public record ProductDetailResponse(
			ProductResponse product,
			List<GalleryImageResponse> gallery,
			List<SpecificationGroupResponse> specifications,
			List<BoxContentResponse> boxContents,
			List<ReviewResponse> reviews,
			List<RelatedProductResponse> relatedProducts) {
	}
}
