package com.ashim.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class StorefrontCategoryProductId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "category_id")
	private Long categoryId;

	@Column(name = "product_id")
	private Long productId;

	public StorefrontCategoryProductId() {
	}

	public StorefrontCategoryProductId(Long categoryId, Long productId) {
		this.categoryId = categoryId;
		this.productId = productId;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public Long getProductId() {
		return productId;
	}

	@Override
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof StorefrontCategoryProductId that)) {
			return false;
		}
		return Objects.equals(categoryId, that.categoryId)
				&& Objects.equals(productId, that.productId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(categoryId, productId);
	}
}
