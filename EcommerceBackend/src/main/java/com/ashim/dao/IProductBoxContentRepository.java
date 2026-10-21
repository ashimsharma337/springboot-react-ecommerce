package com.ashim.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ashim.entity.ProductBoxContent;

public interface IProductBoxContentRepository extends JpaRepository<ProductBoxContent, Long> {

	List<ProductBoxContent> findByProduct_IdOrderByDisplayOrderAsc(Long productId);
}
