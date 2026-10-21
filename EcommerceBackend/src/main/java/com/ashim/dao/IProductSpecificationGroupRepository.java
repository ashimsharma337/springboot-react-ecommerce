package com.ashim.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ashim.entity.ProductSpecificationGroup;

public interface IProductSpecificationGroupRepository extends JpaRepository<ProductSpecificationGroup, Long> {

	List<ProductSpecificationGroup> findByProduct_IdOrderByDisplayOrderAsc(Long productId);
}
