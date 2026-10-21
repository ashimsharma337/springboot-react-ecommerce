package com.ashim.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;

@Entity
@Data
@Table(name = "related_product")
public class RelatedProduct {

	@EmbeddedId
	private RelatedProductId id;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("productId")
	@JoinColumn(name = "product_id")
	private Product product;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("relatedProductId")
	@JoinColumn(name = "related_product_id")
	private Product relatedProduct;

	@Column(name = "display_order", nullable = false)
	private Short displayOrder;
}
