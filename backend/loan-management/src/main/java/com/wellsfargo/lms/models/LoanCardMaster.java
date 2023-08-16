package com.wellsfargo.lms.models;

import java.util.UUID;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "loan_card_master")
public class LoanCardMaster {
	@Id
	@Column(name = "loan_id")
	@NotNull
	private String id;
	
	@Column(name = "loan_type")
	@NotNull
	private String loanType;
	
	@Column(name = "duration_in_months")
	@NotNull
	private int duration;


	public LoanCardMaster(String loan_type, int duration) {
		super();
		this.id = UUID.randomUUID().toString();
		this.loanType = loan_type;
		this.duration = duration;
	}

	
	

}
