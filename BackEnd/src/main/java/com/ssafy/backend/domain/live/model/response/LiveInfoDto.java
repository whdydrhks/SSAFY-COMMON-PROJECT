package com.ssafy.backend.domain.live.model.response;

import com.ssafy.backend.domain.live.entity.LiveEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LiveInfoDto {

    private Long liveId;
    private Long shelterId;
    private String shelterName;
    private String title;
    private String image;
    private String category;
    private String room;
    private LocalDateTime createdDate;

    public static LiveInfoDto of(LiveEntity live){
        return LiveInfoDto.builder()
                .liveId(live.getId())
                .shelterId(live.getShelter().getId())
                .shelterName((live.getShelter().getName()))
                .title(live.getTitle())
                .image((live.getImage()))
                .category(live.getCategory())
                .createdDate(live.getCreatedDate())
                .room(live.getRoom())
                .build();
    }

}
