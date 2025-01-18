package com.example.isbd.DTO;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Order {
    private Integer car_id;
    private String service_name;
    private List<String> service;
}
