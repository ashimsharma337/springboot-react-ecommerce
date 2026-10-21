package com.ashim.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class RelatedProductId implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "product_id")
	private Long productId;

	@Column(name = "related_product_id")
	private Long relatedProductId;

	public RelatedProductId() {
	}

	public RelatedProductId(Long productId, Long relatedProductId) {
		this.productId = productId;
		this.relatedProductId = relatedProductId;
	}

	public Long getProductId() {
		return productId;
	}

	public Long getRelatedProductId() {
		return relatedProductId;
	}

	@Override
	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof RelatedProductId that)) {
			return false;
		}
		return Objects.equals(productId, that.productId)
				&& Objects.equals(relatedProductId, that.relatedProductId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(productId, relatedProductId);
	}
}
