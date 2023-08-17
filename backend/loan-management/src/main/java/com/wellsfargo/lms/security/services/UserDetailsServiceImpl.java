package com.wellsfargo.lms.security.services;

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
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    EmployeeMaster user = userRepository.findById(username)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

    return UserDetailsImpl.build(user);
  }

}
