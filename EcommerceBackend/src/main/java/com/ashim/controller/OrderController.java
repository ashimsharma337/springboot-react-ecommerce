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

import com.ashim.entity.Order;
import com.ashim.service.OrderServiceImpl;

@RestController
@RequestMapping("api/orders")
public class OrderController {

	private final OrderServiceImpl service;

	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

	public OrderController(OrderServiceImpl service) {
		this.service = service;
	}

	@PostMapping
	public ResponseEntity<Order> addOrder(@RequestBody Order newOrder) {
		logger.info("POST request received: creating new order for {}", newOrder.getUser().getUsername());
		Order order = service.createOrder(newOrder);
		return new ResponseEntity<>(order, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
		logger.info("GET request received: Fetching order with ID {}", id);
		Order order = service.getOrderById(id);
		return new ResponseEntity<>(order, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<Order>> getAllOrders() {
		logger.info("GET request received: fetching all orders ....");
		List<Order> orders = service.getAllOrders();
		return new ResponseEntity<>(orders, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
		logger.info("PUT request received: updating order with ID {}", id);
		Order updatedOrder = service.updateOrder(id, orderDetails);
		return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Order> updateOrder(@PathVariable Long id) {
		logger.info("Delete request received: deleting order with ID {}", id);
		service.removeOrder(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
