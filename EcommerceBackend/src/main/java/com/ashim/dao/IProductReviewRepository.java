package com.ashim.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ashim.entity.ProductReview;

public interface IProductReviewRepository extends JpaRepository<ProductReview, Long> {

	List<ProductReview> findByProduct_IdOrderByReviewedAtDesc(Long productId);
}
