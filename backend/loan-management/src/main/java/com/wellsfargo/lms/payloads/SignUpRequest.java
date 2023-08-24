package com.wellsfargo.lms.payloads;

import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {

	String name;
	String designation;
	String department;
	String gender;
	String dob;
	String doj;
	String password;
	String email;
	int isAdmin;
	Set<String> role;
	
}
