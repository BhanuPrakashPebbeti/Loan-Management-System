package com.wellsfargo.lms.payloads;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private String id;
  private List<String> roles;
public JwtResponse(String token, String id, List<String> roles) {
	super();
	this.token = token;
	this.id = id;
	this.roles = roles;
}
  
  

}
