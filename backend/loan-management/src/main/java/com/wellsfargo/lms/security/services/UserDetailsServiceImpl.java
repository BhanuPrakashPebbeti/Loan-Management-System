package com.wellsfargo.lms.security.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.repositories.EmployeeMasterRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  EmployeeMasterRepo userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Optional<EmployeeMaster> users = userRepository.findByEmail(email);
//    System.out.println(users);
    if(users.isEmpty()) {
    	throw new UsernameNotFoundException("User Not Found with username: " + email);
    }
    else {
    	EmployeeMaster user = users.get();
//    	System.out.println(user);
    	return UserDetailsImpl.build(user);
    }
    
//        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
    
  }

}
