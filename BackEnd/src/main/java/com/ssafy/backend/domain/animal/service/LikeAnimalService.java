package com.ssafy.backend.domain.animal.service;

import com.ssafy.backend.domain.animal.entity.AnimalEntity;
import com.ssafy.backend.domain.animal.entity.LikeAnimalEntity;
import com.ssafy.backend.domain.animal.model.request.LikeAnimalDeleteDto;
import com.ssafy.backend.domain.animal.model.request.LikeAnimalRegisterDto;
import com.ssafy.backend.domain.animal.model.response.AnimalInfoDto;
import com.ssafy.backend.domain.animal.model.response.LikeAnimalInfoDto;
import com.ssafy.backend.domain.animal.repository.AnimalRepository;
import com.ssafy.backend.domain.animal.repository.LikeAnimalRepository;
import com.ssafy.backend.domain.live.model.response.LiveInfoDto;
import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.domain.shelter.repository.ShelterRepository;
import com.ssafy.backend.global.common.model.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeAnimalService {

    private final ResponseUtil responseUtil;
    private final JwtUtil jwtUtil;

    private final ShelterRepository shelterRepository;
    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;
    private final LikeAnimalRepository likeAnimalRepository;

    @Transactional
    public ResponseSuccessDto<?> regist(LikeAnimalRegisterDto registerDto, HttpServletRequest request){

        String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

        String tokenId = jwtUtil.getUserId(token);

        UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        ShelterEntity findShelter = shelterRepository.findByUser(loginUser)
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        AnimalEntity findAnimal = animalRepository.findById(registerDto.getAnimalId())
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        UserEntity findUser = userRepository.findById(registerDto.getUserId())
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        LikeAnimalEntity likeAnimal = registerDto.toEntity(findUser, findAnimal);

        Long likeAnimalId = likeAnimalRepository.save(likeAnimal).getId();

        ResponseSuccessDto<Long> resp = responseUtil
                .buildSuccessResponse(likeAnimalId);

        return resp;
    }

    @Transactional
    public ResponseSuccessDto<?> delete(LikeAnimalDeleteDto deleteDto, HttpServletRequest request){

        String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

        String tokenId = jwtUtil.getUserId(token);

        UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        ShelterEntity findShelter = shelterRepository.findByUser(loginUser)
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        AnimalEntity findAnimal = animalRepository.findById(deleteDto.getAnimalId())
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        if(findAnimal.getShelter().getId() != findShelter.getId()){
            throw new ApiErrorException(ApiStatus.BAD_REQUEST);
        }

        List<LikeAnimalEntity> likeAnimalList = likeAnimalRepository.findByAnimal(findAnimal);

        likeAnimalRepository.deleteAll(likeAnimalList);

        ResponseSuccessDto resp = responseUtil
                .buildSuccessResponse(null);

        return resp;

    }

    @Transactional
    public ResponseSuccessDto<?> getAll(HttpServletRequest request){

        String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

        String tokenId = jwtUtil.getUserId(token);

        UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        List<LikeAnimalEntity> likeAnimalList = likeAnimalRepository.findAllByUser(loginUser);

        List<LikeAnimalInfoDto> likeAnimalInfos = likeAnimalList
                .stream()
                .map(LikeAnimalInfoDto::of)
                .collect(Collectors.toList());

        ResponseSuccessDto<List<LikeAnimalInfoDto>> resp = responseUtil
                .buildSuccessResponse(likeAnimalInfos);

        return resp;
    }

    @Transactional
    public ResponseSuccessDto<?> get(HttpServletRequest request){
        String token = Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .orElseThrow(() -> new ApiErrorException(ApiStatus.UNAUTHORIZED));

        String tokenId = jwtUtil.getUserId(token);

        UserEntity loginUser = userRepository.findByIdAndExpiredLike(Long.valueOf( tokenId), "F")
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        LikeAnimalEntity likeAnimal = likeAnimalRepository.findByUser(loginUser)
                .orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

        LikeAnimalInfoDto likeAnimalInfo = LikeAnimalInfoDto.of(likeAnimal);

        ResponseSuccessDto<LikeAnimalInfoDto> resp = responseUtil
                .buildSuccessResponse(likeAnimalInfo);

        return resp;
    }
}
