package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employee_issue_details")
public class EmployeeIssueDetails {
	@Id
	@Column(name = "issue_id")
	private String id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "employee_id")
	@NotNull
	private EmployeeMaster employee;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="item_id")
	@NotNull
	private ItemMaster item;
	
	@Column(name = "issue_date")
	@NotNull
	private String issueDate;
	
	@Column(name = "return_date")
	@NotNull
	private String returnDate;

	public EmployeeIssueDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmployeeIssueDetails( EmployeeMaster employee, ItemMaster item, String issue_date, String return_date) {
		super();
		String[] str = UUID.randomUUID().toString().split("-");
		this.id = str[0];
		this.employee = employee;
		this.item = item;
		this.issueDate = issue_date;
		this.returnDate = return_date;
	}

	

}
