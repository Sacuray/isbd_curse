package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.example.isbd.enumerations.Gender_enum;
import org.hibernate.annotations.ColumnTransformer;
import org.hibernate.annotations.CreationTimestamp;
import com.example.isbd.Enteties.AutopartEntity;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "service")
public class ServiceEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @Column(name = "name_service", nullable = false)
    private String nameService;
    @Column(name = "description_service")
    private String description_service;
    @Column(name = "price")
    private Integer price;
    @OneToOne
    @JoinColumn(name = "autopart_id")
    private AutopartEntity autopart;
}
