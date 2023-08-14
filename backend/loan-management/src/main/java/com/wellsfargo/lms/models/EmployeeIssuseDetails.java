package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Table(name = "employee_issuse_details")
public class EmployeeIssuseDetails {
	@Id
	@Column(name = "issue_id")
	private String id;
	
	@Column(name = "employee_id")
	private String employee_id;
	
	@Column(name = "item_id")
	private String item_id;
	
	@Column(name = "issue_date")
	private String issue_date;
	
	@Column(name = "return_date")
	private String return_date;

	public EmployeeIssuseDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmployeeIssuseDetails( String employee_id, String item_id, String issue_date, String return_date) {
		super();
		this.id = UUID.randomUUID().toString();
		this.employee_id = employee_id;
		this.item_id = item_id;
		this.issue_date = issue_date;
		this.return_date = return_date;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmployee_id() {
		return employee_id;
	}

	public void setEmployee_id(String employee_id) {
		this.employee_id = employee_id;
	}

	public String getItem_id() {
		return item_id;
	}

	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}

	public String getIssue_date() {
		return issue_date;
	}

	public void setIssue_date(String issue_date) {
		this.issue_date = issue_date;
	}

	public String getReturn_date() {
		return return_date;
	}

	public void setReturn_date(String return_date) {
		this.return_date = return_date;
	}
	
	

}
