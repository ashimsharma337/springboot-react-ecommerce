package com.ashim.entity;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "storefront_category")
public class StorefrontCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "category_id")
	private Long id;

	@Column(name = "slug", nullable = false, length = 120)
	private String slug;

	@Column(name = "name", nullable = false, length = 160)
	private String name;

	@Column(name = "eyebrow", nullable = false, length = 160)
	private String eyebrow;

	@Column(name = "description", nullable = false, columnDefinition = "text")
	private String description;

	@Column(name = "unit_label", nullable = false, length = 80)
	private String unitLabel;

	@Column(name = "image_url", nullable = false, columnDefinition = "text")
	private String imageUrl;

	@Column(name = "display_order", nullable = false)
	private Short displayOrder;

	@Column(name = "created_at", insertable = false, updatable = false)
	private OffsetDateTime createdAt;

	@Column(name = "updated_at", insertable = false, updatable = false)
	private OffsetDateTime updatedAt;
}
