package com.example.isbd.controllers;

import com.example.isbd.services.ClientService;
import org.springframework.web.bind.annotation.RestController;
import com.example.isbd.DTO.ClientandCar;
import com.example.isbd.DTO.Order;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/client")
@CrossOrigin
public class ClientController {
    @Autowired
    private ClientService clientService;
    @PostMapping("/add_car")
    @CrossOrigin
    public ResponseEntity getCars(@RequestBody ClientandCar body) {
        String res = clientService.getCars(body);
        return ResponseEntity.ok(res);
    }
    @GetMapping("/get_services")
    @CrossOrigin
    public List<String> getServices() {
        return clientService.getServices();
    }
    @PostMapping("/add_order")
    @CrossOrigin
    public ResponseEntity addOrder(@RequestBody Order order) {
        String res = clientService.addOrder(order);
        return ResponseEntity.ok(res);
    }
    @PostMapping("/delete_order")
    @CrossOrigin
    public ResponseEntity deleteOrder(@RequestBody String order_id) {
        String res = clientService.deleteOrder(order_id);
        return ResponseEntity.ok(res);
    }
    @PostMapping("/delete_car")
    @CrossOrigin
    public ResponseEntity deleteCar(@RequestBody String car_id) {
        String res = clientService.deleteCar(car_id);
        return ResponseEntity.ok(res);
    }

}