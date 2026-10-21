package com.ashim.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ashim.entity.ProductGallery;

public interface IProductGalleryRepository extends JpaRepository<ProductGallery, Long> {

	List<ProductGallery> findByProduct_IdOrderByDisplayOrderAsc(Long productId);
}
