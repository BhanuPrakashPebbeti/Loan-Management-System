package com.wellsfargo.lms.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "otp")
public class OTPModel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	Long id;
	
	@Column(name = "eid")
	String eid;
	
	@Column(name="otp")
	String otp;
	
	@Column(name="created")
	Date date;

	public OTPModel(String eid, String otp, Date date) {
		super();
		this.eid = eid;
		this.otp = otp;
		this.date = date;
	}
	
	
	
}
