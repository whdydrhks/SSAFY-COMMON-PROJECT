package com.ssafy.backend.domain.member.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.model.request.UserSignupDto;
import com.ssafy.backend.domain.member.model.request.UserUpdateDto;
import com.ssafy.backend.domain.member.model.response.UserInfoDto;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.domain.shelter.entity.ShelterEntity;
import com.ssafy.backend.global.common.model.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true) // 기본적으로 트랜잭션 안에서만 데이터 변경하게 설정(성능 향상)
@RequiredArgsConstructor // Lombok을 사용해 @Autowired 없이 의존성 주입. final 객제만 주입됨을 주의
public class UserService {

	private final PasswordEncoder passwordEncoder;

	private final JwtUtil jwtUtil;
	private final ResponseUtil responseUtil;

	private final UserRepository userRepository;

	/**
	 * 유저 가입을 처리하는 메소드
	 *
	 * @param
	 * @return user id
	 * @throws IllegalStateException
	 */
	@Transactional
	public ResponseSuccessDto<?> register(UserSignupDto signupDto) {
		// 패스워드 암호화
		signupDto.setPassword(passwordEncoder.encode(signupDto.getPassword()));

		UserEntity joinUser = signupDto.toEntity();

		// 이메일 중복검사
		validateDuplicateEmail(joinUser.getEmail());

		// 닉네임 중복검사
		validateDuplicateNickname(joinUser.getNickname());

		Long userId = userRepository.save(joinUser).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(userId);

		return resp;
	}

	/**
	 * 사용자의 정보를 갱신하는 메소드
	 *
	 * @param
	 * @return 업데이트 된 userId
	 */
	@Transactional
	public ResponseSuccessDto<?> update(
		String userNickname,
		UserUpdateDto updateDto,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userNickname, request);

		UserEntity updateUser = UserEntity.builder()
			.id(findUser.getId())
			.email(findUser.getEmail())
			.password(updateDto.getPassword())
			.role(findUser.getRole())
			.name(updateDto.getName())
			.phoneNumber(updateDto.getPhoneNumber())
			.nickname(updateDto.getNickname())
			.profileImage(findUser.getProfileImage())
			.expired(findUser.getExpired())
			.createdDate(findUser.getCreatedDate())
			.build();

		Long userId = userRepository.save(updateUser).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(userId);

		return resp;
	}

	/**
	 * 사용자의 계정 권한을 설정하는 메소드
	 *
	 * @param
	 * @return 계정 권한이 업데이트 된 userId
	 */
	public ResponseSuccessDto<?> updateRole(
		String userNickname,
		String roleName,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userNickname, request);

		UserEntity updateUser = UserEntity.builder()
			.id(findUser.getId())
			.email(findUser.getEmail())
			.password(findUser.getPassword())
			.role(roleName)
			.name(findUser.getName())
			.phoneNumber(findUser.getPhoneNumber())
			.nickname(findUser.getNickname())
			.profileImage(findUser.getProfileImage())
			.expired(findUser.getExpired())
			.createdDate(findUser.getCreatedDate())
			.build();

		Long userId = userRepository.save(updateUser).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(userId);

		return resp;
	}

	/**
	 * 사용자의 계정 만료 여부를 갱신하는 메소드
	 *
	 * @param
	 * @return 만료 정보가 업데이트 된 userId
	 */
	public ResponseSuccessDto<?> updateExpire(
		String userNickname,
		Boolean expiredFlag,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userNickname, request);

		UserEntity updateUser = UserEntity.builder()
			.id(findUser.getId())
			.email(findUser.getEmail())
			.password(findUser.getPassword())
			.role(findUser.getRole())
			.name(findUser.getName())
			.phoneNumber(findUser.getPhoneNumber())
			.nickname(findUser.getNickname())
			.profileImage(findUser.getProfileImage())
			.expired(expiredFlag ? "T" : "F") // expiredFlag에 따라 변경 true:"T" / false:"F"
			.createdDate(findUser.getCreatedDate())
			.build();

		Long userId = userRepository.save(updateUser).getId();

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(userId);

		return resp;
	}

	/**
	 * 사용자의 정보를 삭제하는 메소드
	 *
	 * @param
	 * @return 삭제된 된 userId
	 */
	@Transactional
	public ResponseSuccessDto<?> delete(
		String userNickname,
		HttpServletRequest request) {

		validateAccount(userNickname, request);

		Long count = userRepository.deleteByEmail(userNickname);

		ResponseSuccessDto<Long> resp = responseUtil
			.buildSuccessResponse(count);

		return resp;
	}

	/**
	 * 사용자 정보를 전부 가져오는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltUserInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoAll() {

		List<UserEntity> findUsers = userRepository.findAllByExpiredLike("F");

		List<UserInfoDto> userInfos = findUsers
			.stream()
			.map(UserInfoDto::of)
			.collect(Collectors.toList());

		ResponseSuccessDto<List<ShelterEntity>> resp = responseUtil
			.buildSuccessResponse(userInfos);

		return resp;
	}

	/**
	 * email로 사용자 정보를 가져오는 메소드
	 *
	 * @param
	 * @return UserInfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoByEmail(String userEmail) {

		UserEntity findUser = userRepository.findByEmailAndExpiredLike(userEmail, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		UserInfoDto infoDto = UserInfoDto.of(findUser);

		ResponseSuccessDto<UserInfoDto> resp = responseUtil
			.buildSuccessResponse(infoDto);

		return resp;
	}

	/**
	 * nickname으로 사용자 정보를 가져오는 메소드
	 *
	 * @param
	 * @return UserInfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoByNickname(String userNickname) {

		UserEntity findUser = userRepository.findByNicknameAndExpiredLike(userNickname, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		UserInfoDto infoDto = UserInfoDto.of(findUser);

		ResponseSuccessDto<UserInfoDto> resp = responseUtil
			.buildSuccessResponse(infoDto);

		return resp;
	}

	/**
	 * name으로 사용자 정보를 검색하는 메소드
	 *
	 * @param
	 * @return ResponseSuccessDto&ltList&ltUserInfoDto&gt&gt
	 */
	@Transactional
	public ResponseSuccessDto<?> searchInfoByNickname(String userNickname) {

		List<UserEntity> findUsers = userRepository
			.findByNicknameContainingIgnoreCaseAndExpiredLike(userNickname, "F");

		List<UserInfoDto> userInfos = findUsers
			.stream()
			.map(UserInfoDto::of)
			.collect(Collectors.toList());

		ResponseSuccessDto<List<ShelterEntity>> resp = responseUtil
			.buildSuccessResponse(userInfos);

		return resp;
	}

	/**
	 * 접근한 사용자 정보를 검증하는 메소드
	 *
	 * @param
	 */
	private UserEntity validateAccount(String userNickname, HttpServletRequest request) {

		String tokenEmail = getEmailInAuthToken(request);

		UserEntity validateUser = userRepository.findByEmailAndExpiredLike(tokenEmail, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		if (!validateUser.getNickname().equals(userNickname)) {
			throw new ApiErrorException(ApiStatus.BAD_REQUEST);
		}

		return validateUser;
	}

	/**
	 * 같은 이메일의 유저 가입 정보가 이미 있는지 확인하는 메소드
	 *
	 * @param
	 */
	private void validateDuplicateEmail(String email) {

		userRepository.findByEmail(email)
			.ifPresent(e -> {
				throw new ApiErrorException(ApiStatus.EMAIL_DUPLICATION);
			});
	}

	/**
	 * 같은 닉네임의 유저 가입 정보가 이미 있는지 확인하는 메소드
	 *
	 * @param
	 */
	private void validateDuplicateNickname(String nickname) {

		userRepository.findByNickname(nickname)
			.ifPresent(e -> {
				throw new ApiErrorException(ApiStatus.NICKNAME_DUPLICATION);
			});
	}

	/**
	 * 헤더의 Authorization 자리에 있는 AccessToken 정보를 가지고온다.
	 *
	 * @param
	 * @return accessToken의 정보
	 */
	private String getAuthToken(HttpServletRequest request) {

		return Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
			.orElseThrow(() -> new ApiErrorException(ApiStatus.NOT_LOGGED_IN));
	}

	/**
	 * 헤더의 Authorization 자리에 있는 AccessToken의 id 정보를 가지고온다.
	 *
	 * @param
	 * @return String accessToken의 id 정보
	 */
	private String getIdInAuthToken(HttpServletRequest request) {

		return jwtUtil.getUserId(getAuthToken(request));
	}

	/**
	 * 헤더의 Authorization 자리에 있는 AccessToken의 email 정보를 가지고온다.
	 *
	 * @param
	 * @return String accessToken의 email정보
	 */
	private String getEmailInAuthToken(HttpServletRequest request) {

		return jwtUtil.getUserEmail(getAuthToken(request));
	}

	// 테스트용 더미 데이터 생성용
	@PostConstruct
	public void testInitializing() {

		for (int i = 1; i <= 25; i++) {
			String name = "사용자_" + String.format("%03d", i);
			UserEntity user = UserEntity.builder()
				.email("user" + i + "@gmail.com")
				.password(passwordEncoder.encode("user" + i))
				.name(name)
				.phoneNumber("010-" + String.format("%04d", i) + "-1234")
				.nickname("닉네임" + i)
				.build();
			userRepository.save(user);
		}
	}
}
