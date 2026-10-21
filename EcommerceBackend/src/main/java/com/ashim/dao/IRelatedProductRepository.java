package com.ashim.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ashim.entity.RelatedProduct;
import com.ashim.entity.RelatedProductId;

public interface IRelatedProductRepository extends JpaRepository<RelatedProduct, RelatedProductId> {

	List<RelatedProduct> findByProduct_IdOrderByDisplayOrderAsc(Long productId);
}
