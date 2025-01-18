package com.example.isbd.Enteties;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import com.example.isbd.enumerations.Gender_enum;
import org.hibernate.annotations.ColumnTransformer;


@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "client")
public class ClientEntity {
    @Id
    @Column(name="id", columnDefinition = "serial")
    private Integer id;
    @Column(name = "full_name", nullable = false)
    private String full_name;
    @Column(name = "birth_date", columnDefinition = "DATE", nullable = false)
    private LocalDate birth_date;
    @Enumerated(EnumType.STRING)
    @ColumnTransformer(write = "?::gender_enum")
    @Column(name = "gender", columnDefinition = "gender_enum", nullable = false)
    private Gender_enum gender;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "phone_number", nullable = false)
    private String phone_number;
    @Column(name = "password", nullable = false)
    private String password;
    
}
