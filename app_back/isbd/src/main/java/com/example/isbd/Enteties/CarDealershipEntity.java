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
@Table(name = "car_dealership")
public class CarDealershipEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @Column(name = "name_car_dealership", nullable = false)
    private String name_car_dealership;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "phone_number")
    private String phone_number;
    @Column(name = "passcode", nullable = false)
    private String passcode;
}
