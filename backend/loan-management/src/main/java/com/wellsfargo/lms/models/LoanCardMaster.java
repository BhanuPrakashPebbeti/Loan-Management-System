package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Table(name = "loan_card_master")
public class LoanCardMaster {
	@Id
	@Column(name = "load_id")
	private String id;
	
	@Column(name = "loan_type")
	private String loan_type;
	
	@Column(name = "duration_in_years")
	private int duration;

	public LoanCardMaster() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LoanCardMaster(String loan_type, int duration) {
		super();
		this.id = UUID.randomUUID().toString();
		this.loan_type = loan_type;
		this.duration = duration;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLoan_type() {
		return loan_type;
	}

	public void setLoan_type(String loan_type) {
		this.loan_type = loan_type;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	

}
