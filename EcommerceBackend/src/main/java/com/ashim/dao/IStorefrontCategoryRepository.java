package com.ashim.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ashim.entity.StorefrontCategory;

public interface IStorefrontCategoryRepository extends JpaRepository<StorefrontCategory, Long> {

	List<StorefrontCategory> findAllByOrderByDisplayOrderAsc();
}
