package com.wellsfargo.lms.payloads;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
public class LoanPayload {
	String type;
	int duration;
	
	public LoanPayload(String type, int duration) {
		super();
		this.type = type;
		this.duration = duration;
	}

	public String getLoanType() {
		return type;
	}

	public void setLoanType(String type) {
		this.type = type;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
	
}
