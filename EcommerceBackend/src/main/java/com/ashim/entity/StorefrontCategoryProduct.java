package com.ashim.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "storefront_category_product")
public class StorefrontCategoryProduct {

	@EmbeddedId
	private StorefrontCategoryProductId id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("categoryId")
	@JoinColumn(name = "category_id", nullable = false)
	private StorefrontCategory category;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("productId")
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@Column(name = "display_order", nullable = false)
	private Short displayOrder;
}
