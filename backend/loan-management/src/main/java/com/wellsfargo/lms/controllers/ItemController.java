package com.wellsfargo.lms.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.payloads.ItemPayload;
import com.wellsfargo.lms.services.ItemService;


@RestController
@RequestMapping("/items")
public class ItemController {
	
	@Autowired
	private ItemService itemService;
	
	@PostMapping("createItem")
	public ResponseEntity<?> createItem(@RequestBody @Valid ItemPayload item){
		try {
			return(itemService.createItem(item));
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().body("Some error");
		}
	}
	
	@GetMapping
	public ResponseEntity<?> getAllLoans(){
		return ResponseEntity.ok(itemService.getAllItems());
	}

}
