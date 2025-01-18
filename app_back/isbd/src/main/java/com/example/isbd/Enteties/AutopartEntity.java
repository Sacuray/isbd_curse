package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;
import com.example.isbd.enumerations.Model_car;
import org.hibernate.annotations.ColumnTransformer;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "autopart")
public class AutopartEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @Column(name = "name_autopart", nullable = false)
    private String name_autopart;
    @Column(name = "description_autopart")
    private String description_autopart;
    @Enumerated(EnumType.STRING)
    @ColumnTransformer(write = "?::model_car")
    @Column(name = "model", columnDefinition = "model_car", nullable = false)
    private Model_car model;
    @Column(name = "price")
    private Integer price;
    @Column(name = "count")
    private Integer count;
}
