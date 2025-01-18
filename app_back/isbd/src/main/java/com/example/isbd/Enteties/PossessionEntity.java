package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;


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
