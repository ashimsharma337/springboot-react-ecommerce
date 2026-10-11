package com.ashim.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ashim.entity.User;
import com.ashim.service.UserServiceImpl;

@RestController
@RequestMapping("api/users")
public class UserController {

	private final UserServiceImpl service;

	private final Logger logger = LoggerFactory.getLogger(UserController.class);

	public UserController(UserServiceImpl service) {
		this.service = service;
	}

	@PostMapping()
	public User addUser(@RequestBody User newUser) {
		logger.info("POST request received: creating user with username "+newUser.getUsername());
		return service.createUser(newUser);
	}

	@GetMapping("/{id}")
	public User getUserById(@PathVariable Long id) {
		logger.info("GET request received: fetching user with id "+id);
		return service.getUserById(id);
	}

	@GetMapping()
	public List<User> getAllUsers() {
		logger.info("GET request received: fetching all user ...");
		return service.getAllUsers();
	}

	@PutMapping("/{id}")
	public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
		logger.info("PUT request received: updating user with ID "+updatedUser.getId());
		if(!id.equals(updatedUser.getId())) {
			throw new IllegalArgumentException("Id provided does not match with existing user id!");
		} else {
			return service.updateUser(updatedUser);
		}
	}

	@DeleteMapping("/{id}")
	public String deleteUser(@PathVariable Long id) {
		logger.info("Delete request received: deleting user with id "+id);
		return service.deleteUserById(id);
	}

	@PostMapping("/login")
	public String login(@RequestBody User user) {
		return service.verify(user);
	}
}
