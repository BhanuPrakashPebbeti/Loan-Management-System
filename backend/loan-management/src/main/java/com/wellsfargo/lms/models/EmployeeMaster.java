package com.wellsfargo.lms.models;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.lang.NonNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "employee_master")
public class EmployeeMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "employee_id")
	private long employeeId;

	@Column(name = "employee_name",unique = true)
	@NotNull(message = "Name cannot be blank")
	@Size(min = 2,message = "Name too short")
	private String name;

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

	public EmployeeMaster() {
		super();
	}
	
	

	public EmployeeMaster(String name, String designation, String department, String gender, String dob,
			String doj, String password, int isAdmin) {
		super();
		this.name = name;
		this.designation = designation;
		this.department = department;
		this.gender = gender;
		this.dob = dob;
		this.doj = doj;
		this.password = password;
		this.isAdmin = isAdmin;
	}

		
}
