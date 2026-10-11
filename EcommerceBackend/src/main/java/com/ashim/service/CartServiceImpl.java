package com.ashim.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ashim.dao.ICartRepository;
import com.ashim.entity.Cart;

@Service
public class CartServiceImpl implements ICartService {

	private final ICartRepository repo;

	public CartServiceImpl(ICartRepository repo) {
		this.repo = repo;
	}

	@Override
	public Cart addToCart(Cart cart) {
		return repo.save(cart);
	}

	@Override
	public List<Cart> getCartItemsByUserId(Long userId) {
		return repo.findByUserId(userId);
	}

	@Override
	public Cart updateCartItem(Long cartId, Cart updatedCart) {
		Cart cart = repo.findById(cartId).orElseThrow(() -> new IllegalArgumentException("Invalid cart ID"));
		cart.setQuantity(updatedCart.getQuantity());
		return repo.save(cart);
	}

	@Override
	public String removeCartItem(Long cartId) {
		repo.deleteById(cartId);
		return "Car deleted successfully with ID "+cartId;
	}

}
