package com.wellsfargo.lms.payloads;

import java.util.Set;

import com.wellsfargo.lms.models.EmployeeMaster;
import com.wellsfargo.lms.models.Roles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsPayload {
	String id;
	String name;
	String designation;
	String department;
	String gender;
	String dob;
	String doj;
	String email;
	int isAdmin;
	Set<Roles> role;
	
	public UserDetailsPayload(EmployeeMaster employee) {
		this.id = employee.getId();
		this.name = employee.getName();
		this.designation = employee.getDesignation();
		this.department = employee.getDepartment();
		this.gender = employee.getGender();
		this.dob = employee.getDob();
		this.doj = employee.getDoj();
		this.isAdmin = employee.getIsAdmin();
		this.role = employee.getRoles();
		this.email = employee.getEmail();
	}
}
