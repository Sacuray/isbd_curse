package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.example.isbd.enumerations.Model_car;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "car")
public class CarEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @Column(name = "year_of_release", columnDefinition = "DATE", nullable = false)
    private LocalDate year_of_release;
    @Enumerated(EnumType.STRING)
    @ColumnTransformer(write = "?::model_car")
    @Column(name = "model", columnDefinition = "model_car", nullable = false)
    private Model_car model;
    @Column(name = "colour")
    private String colour;
}
