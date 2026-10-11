package com.ashim.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ashim.dao.IOrderRepository;
import com.ashim.entity.Order;
import com.ashim.exceptions.OrderNotFoundException;

@Service
public class OrderServiceImpl implements IOrderService {

	private final IOrderRepository repo;

	public OrderServiceImpl(IOrderRepository repo) {
		this.repo = repo;
	}

	@Override
	public Order createOrder(Order newOrder) {
		return repo.save(newOrder);
	}

	@Override
	public Order getOrderById(Long id) {
		Optional<Order> optional = repo.findById(id);
		if(optional.isPresent()) {
			return optional.get();
		} else {
			return optional.orElseThrow(() -> new OrderNotFoundException("Order Not Found with ID "+id));
		}
	}

	@Override
	public List<Order> getAllOrders() {
		return repo.findAll();
	}

	@Override
	public Order updateOrder(Long id, Order orderDetails) {

		return repo.findById(id).map(order -> {

			order.setStatus(orderDetails.getStatus());
			order.setTotalPrice(orderDetails.getTotalPrice());
			return repo.save(order);
		}).orElseThrow(() -> new IllegalArgumentException("Order not found with ID: "+id));
	}

	@Override
	public String removeOrder(Long id) {
		Optional<Order> optional = repo.findById(id);
		if(optional.isPresent()) {
			repo.delete(optional.get());
			return "Order deleted with ID: "+id;
		} else {
			return "Order not found with ID: "+id;
		}
	}

}
