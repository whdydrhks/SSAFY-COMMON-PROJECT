package com.ssafy.backend.domain.animal.controller;

import com.ssafy.backend.domain.animal.model.request.LikeAnimalDeleteDto;
import com.ssafy.backend.domain.animal.model.request.LikeAnimalRegisterDto;
import com.ssafy.backend.domain.animal.service.AnimalService;
import com.ssafy.backend.domain.animal.service.LikeAnimalService;
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
@Api(tags = "AniamlController v1")
@RequestMapping("/v1/like/animal")
public class LikeAnimalControllerV1 {

    private final LikeAnimalService likeAnimalService;

    @GetMapping
    @ApiOperation(value = "관심동물 조회")
    public ResponseEntity<?> getLikeAnimal(HttpServletRequest request){

        return ResponseEntity.ok(likeAnimalService.getAll(request));
    }

    @GetMapping("/all")
    @ApiOperation(value = "관심동물 전체 조회")
    public ResponseEntity<?> getAllLikeAnimal(HttpServletRequest request){

        return ResponseEntity.ok(likeAnimalService.get(request));
    }


    @PostMapping
    @ApiOperation(value = "보호소가 유저에대한 관심동물 등록")
    public ResponseEntity<?> registerLikeAnimal(
            @RequestBody LikeAnimalRegisterDto registerDto,
            HttpServletRequest request){

        return ResponseEntity.ok(likeAnimalService.regist(registerDto, request));
    }

    @DeleteMapping
    @ApiOperation(value = "보호소가 입양공고중 동물이 입양되었을 떄")
    public ResponseEntity<?> deleteLikeAnimal(
            @RequestBody LikeAnimalDeleteDto deleteDto,
            HttpServletRequest request){

        return ResponseEntity.ok(likeAnimalService.delete(deleteDto, request));
    }
}
