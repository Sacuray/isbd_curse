package com.example.isbd.DTO;

import java.time.LocalDate;
import com.example.isbd.enumerations.Model_car;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ClientandCar {
    private String email_client;
    private LocalDate year_of_release;
    private Model_car model;
    private String colour;
}
