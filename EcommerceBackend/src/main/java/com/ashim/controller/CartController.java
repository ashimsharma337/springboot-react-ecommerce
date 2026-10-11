package com.ashim.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ashim.entity.Cart;
import com.ashim.service.CartServiceImpl;

@RestController
@RequestMapping("/api/carts")
public class CartController {

	private final CartServiceImpl service;

	private final Logger logger = LoggerFactory.getLogger(CartController.class);

	public CartController(CartServiceImpl service) {
		this.service = service;
	}

	@PostMapping
	public ResponseEntity<Cart> addToCart(@RequestBody Cart cart) {
		logger.info("POST request received: creating cart....");
		Cart newCart = service.addToCart(cart);
		return new ResponseEntity<>(newCart, HttpStatus.CREATED);
	}

	// Get cart items for a specific user
	@GetMapping("/user/{id}")
	public ResponseEntity<List<Cart>> getCartItems(@PathVariable Long id) {
		logger.info("GET request received: Geting cart items for user with ID: "+id);
		List<Cart> cartItems = service.getCartItemsByUserId(id);
		return new ResponseEntity<>(cartItems, HttpStatus.OK);
	}

	@PutMapping("/{cartId}")
	public ResponseEntity<Cart> updateCartItem(@PathVariable Long cartId, @RequestBody Cart cart) {
		logger.info("PUT request received: updating cart with ID {}",cartId);
		Cart updatedCart = service.updateCartItem(cartId, cart);
		return new ResponseEntity<>(updatedCart, HttpStatus.OK);
	}

	@DeleteMapping("/{cartId}")
	public ResponseEntity<String> removeCartItem(@PathVariable Long cartId) {
		logger.info("DELETE request received: deleting cart with ID {}",cartId);
		service.removeCartItem(cartId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
