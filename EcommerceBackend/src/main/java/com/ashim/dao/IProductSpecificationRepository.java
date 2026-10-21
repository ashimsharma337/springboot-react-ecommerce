package com.ashim.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ashim.entity.ProductSpecification;

public interface IProductSpecificationRepository extends JpaRepository<ProductSpecification, Long> {

	List<ProductSpecification> findByGroup_IdOrderByDisplayOrderAsc(Long groupId);
}
