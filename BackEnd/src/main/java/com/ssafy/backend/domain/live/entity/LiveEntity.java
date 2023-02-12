package com.ssafy.backend.domain.live.entity;

import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.global.common.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@DynamicInsert
@Table(name = "live")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class LiveEntity extends BaseTimeEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelter_id")
    private ShelterEntity shelter;

    @Column(name = "title", nullable = false, length = 30)
    private String title;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name ="image")
    private String image;
}
