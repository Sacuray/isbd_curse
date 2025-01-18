package com.example.isbd.controllers;

import com.example.isbd.services.LoginService;
import org.springframework.web.bind.annotation.RestController;
import com.example.isbd.Enteties.ClientEntity;
import com.example.isbd.Enteties.EmployeeEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/auth")
@CrossOrigin
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/register_client")
    @CrossOrigin
    public ResponseEntity newClient(@RequestBody ClientEntity clientEntity) {
            String result = loginService.newClient(clientEntity);
            if(result.equals("ok")) {
                return ResponseEntity.ok().body(clientEntity);
            }else{
                return ResponseEntity.badRequest().body(result);
            }
    }

    @PostMapping("/login_client")
    @CrossOrigin
    public ResponseEntity selectClient(@RequestBody ClientEntity clientEntity) {
        String res = loginService.selectClient(clientEntity);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/login_worker")
    @CrossOrigin
    public ResponseEntity selectWorker(@RequestBody EmployeeEntity employeeEntity) {
        String res = loginService.selectWorker(employeeEntity);
        return ResponseEntity.ok().body(res);
    }
    
}
