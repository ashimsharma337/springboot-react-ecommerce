package com.ashim.entity;

import java.math.BigDecimal;

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

	@Column(name="price")
	private BigDecimal price;

	@Column(name="description")
	private String description;

	@Column(name="stock")
	private Integer stock;

	@Column(name="category")
	private String category;
}
