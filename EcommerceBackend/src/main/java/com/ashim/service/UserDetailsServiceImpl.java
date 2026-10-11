package com.ashim.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ashim.dao.IUserRepository;
import com.ashim.entity.User;
import com.ashim.entity.UserPrincipal;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{


	private final IUserRepository repo;

	public UserDetailsServiceImpl(IUserRepository repo) {
		this.repo = repo;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user  = repo.findByUsername(username);
		if(user == null) {
			throw new UsernameNotFoundException("User does not exits with username: "+username);
		}
		return new UserPrincipal(user);
	}

}
