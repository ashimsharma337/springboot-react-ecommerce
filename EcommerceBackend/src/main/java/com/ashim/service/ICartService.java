package com.ashim.service;

import java.util.List;

import com.ashim.entity.Cart;

public interface ICartService {

	Cart addToCart(Cart cart);
	List<Cart> getCartItemsByUserId(Long userId);
	Cart updateCartItem(Long cartId, Cart updatedCart);
	String removeCartItem(Long cartId);

}
