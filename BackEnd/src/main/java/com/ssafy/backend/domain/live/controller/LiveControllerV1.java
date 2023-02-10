package com.ssafy.backend.domain.live.controller;

import com.ssafy.backend.domain.live.model.request.LiveDeleteDto;
import com.ssafy.backend.domain.live.model.request.LiveRegistDto;
import com.ssafy.backend.domain.live.service.LiveService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "LiveController v1")
@RequestMapping("/v1/live")
public class LiveControllerV1 {

    private final LiveService liveService;

    @PostMapping
    @ApiOperation(value = "라이브방 등록")
    public ResponseEntity<?> registLive(
            @RequestBody LiveRegistDto registDto,
            HttpServletRequest request){

        return ResponseEntity.ok(liveService.registLive(registDto, request));
    }

    @GetMapping("/all")
    @ApiOperation(value = "라이브 전체 조회")
    public ResponseEntity<?> getLiveList(){

        return ResponseEntity.ok(liveService.getLiveAll());
    }

    @GetMapping("/{liveId}")
    @ApiOperation(value = "라이브 하나 조회")
    public ResponseEntity<?> getLive(@PathVariable Long liveId){

        return ResponseEntity.ok(liveService.getLive(liveId));
    }

    @DeleteMapping
    @ApiOperation(value = "라이브 방 삭제")
    public ResponseEntity<?> deleteLive(
            @RequestBody LiveDeleteDto deleteDto,
            HttpServletRequest request){

        return ResponseEntity.ok(liveService.deleteLive(deleteDto, request));
    }
}
