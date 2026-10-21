package com.ashim.entity;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;



@Entity
@Data
@Table(name="product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="product_id")
	private Long id;

	@Column(name="name")
	private String name;

	@Column(name="price", precision = 12, scale = 2)
	private BigDecimal price;

	@Column(name = "description", columnDefinition = "text")
	private String description;

	@Column(name="stock")
	private Integer stock;

	@Column(name="category")
	private String category;

	@Column(name = "slug", length = 160)
	private String slug;

	@Column(name = "image_url", columnDefinition = "text")
	private String imageUrl;

	@Column(name = "image_alt", columnDefinition = "text")
	private String imageAlt;

	@Column(name = "rating", precision = 2, scale = 1)
	private BigDecimal rating;

	@Column(name = "review_count")
	private Integer reviewCount;

	@Column(name = "badge")
	private String badge;

	@Column(name = "badge_tone")
	private String badgeTone;

	@Column(name = "specs")
	private String specs;

	@Column(name = "series")
	private String series;

	@Column(name = "subcategory")
	private String subcategory;

	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "attributes", columnDefinition = "jsonb", nullable = false)
	private Map<String, Object> attributes;

	@Column(name = "connectivities", columnDefinition = "text[]", nullable = false)
	private String[] connectivities = new String[0];

	@Column(name = "finishes", columnDefinition = "text[]", nullable = false)
	private String[] finishes = new String[0];

	@Column(name = "in_stock", nullable = false)
	private Boolean inStock = true;

	@Column(name = "noise_cancelling")
	private Boolean noiseCancelling;

	@Column(name = "created_at", insertable = false, updatable = false)
	private OffsetDateTime createdAt;

	@Column(name = "updated_at", insertable = false, updatable = false)
	private OffsetDateTime updatedAt;
}
