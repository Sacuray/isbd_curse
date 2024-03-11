package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.example.isbd.enumerations.Job_title_enum;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;
import com.example.isbd.Enteties.CarDealershipEntity;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "possession")
public class PossessionEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private ClientEntity clientId;
    @ManyToOne
    @JoinColumn(name = "car_id")
    private CarEntity carId;
}
