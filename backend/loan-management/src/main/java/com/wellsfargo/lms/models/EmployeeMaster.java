package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Table(name = "employee_master")
public class EmployeeMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "employee_id")
	private String id;

	@Column(name = "employee_name")
	private String name;

	@Column(name = "designation")
	private String designation;

	@Column(name = "department")
	private String department;
	
	@Column(name="gender")
	private String gender;
	
	@Column(name="dob")
	private String dob;
	
	@Column(name="doj")
	private String doj;
	
	@Column(name="password")
	private String password;
	
	@Column(name="isAdmin")
	private int isAdmin;

	public EmployeeMaster() {
		super();
	}

	public EmployeeMaster(String name, String designation, String department, String gender, String dob,
			String doj, String password, int isAdmin) {
		super();
		this.id = UUID.randomUUID().toString();
		this.name = name;
		this.designation = designation;
		this.department = department;
		this.gender = gender;
		this.dob = dob;
		this.doj = doj;
		this.password = password;
		this.isAdmin = isAdmin;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getDoj() {
		return doj;
	}

	public void setDoj(String doj) {
		this.doj = doj;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(int isAdmin) {
		this.isAdmin = isAdmin;
	}
	
	
	
}
