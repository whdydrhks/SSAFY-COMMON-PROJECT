package com.ssafy.backend.domain.live.model.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LiveDeleteDto {

    private Long liveId;

}
