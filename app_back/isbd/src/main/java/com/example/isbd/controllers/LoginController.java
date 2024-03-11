package com.example.isbd.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.isbd.Enteties.CarEntity;
import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import com.example.isbd.Repositories.CarRepo;
import com.example.isbd.Repositories.ClientRepo;
import com.example.isbd.Repositories.EmployeeRepo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/auth")
@CrossOrigin
public class LoginController {
    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private EmployeeRepo employeeRepo;
    @PostMapping("/register_client")
    @CrossOrigin
    public ResponseEntity newClient(@RequestBody ClientEntity clientEntity) {
        System.out.println(clientEntity.getGender());
        System.out.println(clientEntity.toString());
        ClientEntity lastClient = clientRepo.findTopByOrderByIdDesc();
        System.out.println(lastClient.getId());
        boolean isEmailValid = clientEntity.getEmail().contains("@") && clientEntity.getEmail().contains(".");
        boolean isNotNull = clientEntity.getFull_name() != null && clientEntity.getBirth_date() != null && clientEntity.getEmail() != null && clientEntity.getGender() != null && clientEntity.getPassword() != null && clientEntity.getPhone_number() != null;
        boolean isPhoneValid = true;
        for(int i = 0; i<clientEntity.getPhone_number().length(); i++){
            if (!Character.isDigit(clientEntity.getPhone_number().charAt(i))){
                isPhoneValid = false;
            }
        }
        System.out.println(isNotNull);
        if(!isNotNull){
            return ResponseEntity.ok("isnull");
        }else if(!isEmailValid){
            return ResponseEntity.ok("wrong email");
        }
        else if(!isPhoneValid){
            return ResponseEntity.ok("wrong phone");
        }
        else{
            clientEntity.setId(lastClient.getId() + 1);
            clientRepo.save(clientEntity);
            clientRepo.flush();
            return ResponseEntity.ok(clientEntity);
        }
        
    }
    @PostMapping("/login_client")
    @CrossOrigin
    public ResponseEntity selectClient(@RequestBody ClientEntity clientEntity) {
        String email = "";
        email = clientEntity.getEmail();
        String pass = clientEntity.getPassword();
        System.out.println(pass);
        System.out.println(email);
        if(email == "" || pass == ""){
            return ResponseEntity.ok("isnull");
        }
        if(clientRepo.findByEmail(email) == null){
            return ResponseEntity.ok("Wrong email or password");
        }
        String right_password = clientRepo.findByEmail(email).getPassword();
        System.out.println(pass);
        System.out.println(right_password);
        if(right_password.equals(pass)){
            System.out.println("ok");
            return ResponseEntity.ok("ok");
        }else{
            System.out.println("no ok");
            return ResponseEntity.ok("Wrong email or password");
        }
    }
    @PostMapping("/login_worker")
    @CrossOrigin
    public ResponseEntity selectWorker(@RequestBody EmployeeEntity employeeEntity) {
        String email = "";
        email = employeeEntity.getEmail();
        String pass = employeeEntity.getPasscode();
        if(email == "" || pass == ""){
            return ResponseEntity.ok("isnull");
        }
        if(employeeRepo.findByEmail(email) == null){
            return ResponseEntity.ok("Wrong email or password");
        }
        String right_password = employeeRepo.findByEmail(email).getPasscode();
        System.out.println(pass);
        System.out.println(right_password);
        System.out.println(email);
        System.out.println("Suzdal");
        if(right_password.equals(pass)){
            System.out.println("oklok");
            return ResponseEntity.ok("ok");
        }else{
            System.out.println("no ok");
            System.out.println(employeeRepo.findAll().toString());
            return ResponseEntity.ok("Wrong email or password");
        }
    }
    
}
