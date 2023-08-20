package com.wellsfargo.lms.controllers;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.lms.models.ItemMaster;
import com.wellsfargo.lms.payloads.ItemPayload;
import com.wellsfargo.lms.services.ItemService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/items")
public class ItemController {
	
	@Autowired
	private ItemService itemService;
	
	@PreAuthorize("hasRole('ADMIN')")
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
	public ResponseEntity<?> getAllItems(){
		return ResponseEntity.ok(itemService.getAllItems());
	}
	
	@GetMapping("/id")
	public ResponseEntity<?> getItemById(@RequestParam(value = "id") String id) {
		
		Optional<ItemMaster> items = itemService.getItemById(id);
		
		if(items.isEmpty()) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee does not exst with Id: "+id.toString());
			
		}
		else {
			return ResponseEntity.ok(items);
		}
	}

}
