package com.ashim.entity;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "product_gallery")
public class ProductGallery {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@Column(name = "image_url", nullable = false, columnDefinition = "text")
	private String imageUrl;

	@Column(name = "alt_text", nullable = false, columnDefinition = "text")
	private String altText;

	@Column(name = "label", nullable = false, length = 120)
	private String label;

	@Column(name = "display_order", nullable = false)
	private Short displayOrder;

	@Column(name = "created_at", insertable = false, updatable = false)
	private OffsetDateTime createdAt;
}
