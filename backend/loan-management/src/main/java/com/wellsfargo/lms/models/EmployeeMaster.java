package com.wellsfargo.lms.models;


import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.ColumnDefault;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "employee_master")
public class EmployeeMaster {
	
	@Id
	@Column(name = "employee_id")
	private String id;

	@Column(name = "employee_name")
	@NotNull(message = "Name cannot be blank")
	@Size(min = 2,message = "Name too short")
	private String name;
	
	@Column(name="email",unique = true)
	@NotNull(message = "email cannot be blank")
	@Size(min = 2,message = "email too short")
	private String email;

	@Column(name = "designation")
	@NotNull
	private String designation;

	@Column(name = "department")
	@NotNull
	private String department;
	
	@Column(name="gender")
	@NotNull
	private String gender;
	
	@Column(name="dob")
	@NotNull
	private String dob;
	
	@Column(name="doj")
	@NotNull
	private String doj;
	
	@Column(name="password")
	@NotNull
	private String password;
	
	@Column(name="isAdmin")
	@ColumnDefault("0")
	private int isAdmin;
	
	@JsonProperty
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Roles> roles = new HashSet<>();

	public EmployeeMaster() {
		super();
	}
	
	

	public EmployeeMaster(String name, String email, String designation, String department, String gender, String dob,
			String doj, String password, int isAdmin) {
		super();
		this.id = UUID.randomUUID().toString().substring(0,6);
		this.name = name;
		this.email = email;
		this.designation = designation;
		this.department = department;
		this.gender = gender;
		this.dob = dob;
		this.doj = doj;
		this.password = password;
		this.isAdmin = isAdmin;
	}

		
}
