package com.ashim.entity;

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
@Table(name = "product_specification")
public class ProductSpecification {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "specification_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "group_id", nullable = false)
	private ProductSpecificationGroup group;

	@Column(name = "specification_name", nullable = false, length = 160)
	private String name;

	@Column(name = "specification_value", nullable = false, columnDefinition = "text")
	private String value;

	@Column(name = "display_order", nullable = false)
	private Short displayOrder;
}
