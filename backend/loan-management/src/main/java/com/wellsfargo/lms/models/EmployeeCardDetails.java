package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Table(name = "employee_card_details")
public class EmployeeCardDetails {
	@Id
	@Column(name = "employee_id")
	private String id;
	
	@Column(name = "loan_id")
	private String loan_id;
	
	@Column(name = "card_issuse_date")
	private String issuse_date;
	
	@Column(name = "item_id")
	private String item_id;
	
	@Column(name = "approval_status")
	private int approval_status;

	public EmployeeCardDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public EmployeeCardDetails( String loan_id, String issuse_date, String item_id, int approval_status) {
		super();
		this.id = UUID.randomUUID().toString();
		this.loan_id = loan_id;
		this.issuse_date = issuse_date;
		this.item_id = item_id;
		this.approval_status = approval_status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLoan_id() {
		return loan_id;
	}

	public void setLoan_id(String loan_id) {
		this.loan_id = loan_id;
	}

	public String getIssuse_date() {
		return issuse_date;
	}

	public void setIssuse_date(String issuse_date) {
		this.issuse_date = issuse_date;
	}

	public String getItem_id() {
		return item_id;
	}

	public void setItem_id(String item_id) {
		this.item_id = item_id;
	}

	public int getApproval_status() {
		return approval_status;
	}

	public void setApproval_status(int approval_status) {
		this.approval_status = approval_status;
	}
	
	
	

}
