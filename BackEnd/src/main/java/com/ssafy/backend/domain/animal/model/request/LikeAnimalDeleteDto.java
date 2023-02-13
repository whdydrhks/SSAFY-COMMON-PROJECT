package com.ssafy.backend.domain.animal.model.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LikeAnimalDeleteDto {

    private Long animalId;
}
