package com.example.isbd.DTO;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.ColumnTransformer;

import com.example.isbd.enumerations.Model_car;

import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Services {
    private List<String> services;
}
