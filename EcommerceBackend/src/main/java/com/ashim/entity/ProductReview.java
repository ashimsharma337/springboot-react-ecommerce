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
@Table(name = "product_review")
public class ProductReview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "review_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "initials", nullable = false, length = 12)
	private String initials;

	@Column(name = "reviewer_name", nullable = false, length = 160)
	private String reviewerName;

	@Column(name = "reviewer_role", nullable = false, length = 160)
	private String reviewerRole;

	@Column(name = "is_verified", nullable = false)
	private Boolean verified;

	@Column(name = "review_title", nullable = false, length = 240)
	private String title;

	@Column(name = "review_body", nullable = false, columnDefinition = "text")
	private String body;

	@Column(name = "reviewed_at", nullable = false)
	private OffsetDateTime reviewedAt;

	@Column(name = "created_at", insertable = false, updatable = false)
	private OffsetDateTime createdAt;
}
