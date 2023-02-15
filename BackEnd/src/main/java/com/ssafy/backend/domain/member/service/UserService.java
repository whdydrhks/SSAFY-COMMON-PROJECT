package com.ssafy.backend.domain.member.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.model.request.UserMatchPasswordDto;
import com.ssafy.backend.domain.member.model.request.UserRegisterDto;
import com.ssafy.backend.domain.member.model.request.UserUpdateDto;
import com.ssafy.backend.domain.member.model.request.UserUpdatePasswordDto;
import com.ssafy.backend.domain.member.model.response.UserHostInfoDto;
import com.ssafy.backend.domain.member.model.response.UserInfoDto;
import com.ssafy.backend.domain.member.repository.UserRepository;
import com.ssafy.backend.global.common.model.response.ResponseSuccessDto;
import com.ssafy.backend.global.error.exception.ApiErrorException;
import com.ssafy.backend.global.file.service.FileService;
import com.ssafy.backend.global.util.JwtUtil;
import com.ssafy.backend.global.util.ResponseUtil;
import com.ssafy.backend.global.util.enums.ApiStatus;
import com.ssafy.backend.global.util.enums.Role;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true) // 기본적으로 트랜잭션 안에서만 데이터 변경하게 설정(성능 향상)
@RequiredArgsConstructor // Lombok을 사용해 @Autowired 없이 의존성 주입. final 객제만 주입됨을 주의
public class UserService {

	private final PasswordEncoder passwordEncoder;

	private final JwtUtil jwtUtil;
	private final ResponseUtil responseUtil;

	private final FileService fileService;

	private final UserRepository userRepository;

	/**
	 * 유저 가입을 처리하는 메소드
	 *
	 * @param
	 * @return user id
	 * @throws IllegalStateException
	 */
	@Transactional
	public ResponseSuccessDto<?> register(UserRegisterDto signupDto) {

		signupDto.setPassword(passwordEncoder.encode(signupDto.getPassword())); // 패스워드 암호화

		UserEntity joinUser = signupDto.toEntity();

		validateDuplicateEmail(joinUser.getEmail()); // 이메일 중복검사
		validateDuplicateNickname(joinUser.getNickname()); // 닉네임 중복검사

		Long userId = userRepository.save(joinUser).getId();

		return responseUtil.buildSuccessResponse(userId);

	}

	/**
	 * 사용자의 정보를 갱신하는 메소드
	 *
	 * @param
	 * @return 업데이트 된 userId
	 */
	@Transactional
	public ResponseSuccessDto<?> update(
		Long userId,
		UserUpdateDto updateDto,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userId, request);

		UserEntity updateUser = updateDto.updateEntity(findUser);

		Long updatedUserId = userRepository.save(updateUser).getId();

		return responseUtil.buildSuccessResponse(updatedUserId);
	}

	/**
	 * 사용자의 계정 권한을 설정하는 메소드
	 *
	 * @param
	 * @return 계정 권한이 업데이트 된 userId
	 */
	public ResponseSuccessDto<?> updateRole(
		Long userId,
		String roleName,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userId, request);

		findUser.setRole(roleName);

		Long updatedUserId = userRepository.save(findUser).getId();

		return responseUtil.buildSuccessResponse(updatedUserId);
	}

	/**
	 * 사용자의 계정 만료 여부를 갱신하는 메소드
	 *
	 * @param
	 * @return 만료 정보가 업데이트 된 userId
	 */
	public ResponseSuccessDto<?> updateExpire(
		Long userId,
		Boolean expiredFlag,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userId, request);

		findUser.setExpired(expiredFlag ? "T" : "F");

		Long updatedUserId = userRepository.save(findUser).getId();

		return responseUtil.buildSuccessResponse(updatedUserId);
	}

	/**
	 * 사용자의 비밀번호를 갱신하는 메소드
	 *
	 * @param
	 * @return 만료 정보가 업데이트 된 userId
	 */
	public ResponseSuccessDto<?> updatePassword(
		Long userId,
		UserUpdatePasswordDto updatePasswordDto,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userId, request);

		Map<String, Object> res = new HashMap<>();

		res.put("matchResult", passwordEncoder.matches(updatePasswordDto.getCurPassword(), findUser.getPassword()));

		if ((boolean)res.get("matchResult")) {
			findUser.setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));

			userRepository.save(findUser);

			res.put("updateResult", true);
		}

		return responseUtil.buildSuccessResponse(res);
	}

	/**
	 * 사용자의 정보를 삭제하는 메소드
	 *
	 * @param
	 * @return 삭제된 된 userId
	 */
	@Transactional
	public ResponseSuccessDto<?> delete(
		Long userId,
		HttpServletRequest request) {

		validateAccount(userId, request);

		userRepository.deleteById(userId);

		return responseUtil.buildSuccessResponse(null);
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
			//	.map(findUser -> {
			//		return UserInfoDto.of(findUser, fileService.createDownloadUri("user", findUser.getFile()));
			//	})
			.collect(Collectors.toList());

		return responseUtil.buildSuccessResponse(userInfos);
	}

	/**
	 * id로 사용자 정보를 가져오는 메소드
	 *
	 * @param
	 * @return InfoDto
	 */
	@Transactional
	public ResponseSuccessDto<?> getInfoById(
		Long userId,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userId, request);

		ResponseSuccessDto<UserInfoDto> resp;

		UserInfoDto infoDto = UserInfoDto.of(findUser);
		//	UserInfoDto infoDto = UserInfoDto.of(findUser, fileService.createDownloadUri("user", findUser.getFile()));

		resp = responseUtil.buildSuccessResponse(infoDto);

		// host일 때 반환되는 dto
		if (findUser.getRole().equals(Role.HOST.getName())) {
			UserHostInfoDto hostInfoDto = UserHostInfoDto.of(findUser);

			//	UserHostInfoDto hostInfoDto = UserHostInfoDto.of(findUser,
			//		fileService.createDownloadUri("user", findUser.getFile()));
			resp = responseUtil.buildSuccessResponse(hostInfoDto);
		}

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
		//	UserInfoDto infoDto = UserInfoDto.of(findUser, fileService.createDownloadUri("user", findUser.getFile()));

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
		//	UserInfoDto infoDto = UserInfoDto.of(findUser, fileService.createDownloadUri("user", findUser.getFile()));

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

		if (userNickname.isEmpty() || userNickname.length() < 2) {
			throw new ApiErrorException(ApiStatus.KEYWORD_LESS_THAN_TWO);
		}

		List<UserEntity> findUsers = userRepository
			.findByNicknameContainingIgnoreCaseAndExpiredLike(userNickname, "F");

		List<UserInfoDto> userInfos = findUsers
			.stream()
			.map(UserInfoDto::of)
			//	.map(findUser -> {
			//		return UserInfoDto.of(findUser, fileService.createDownloadUri("user", findUser.getFile()));
			//	})
			.collect(Collectors.toList());

		ResponseSuccessDto<List<UserInfoDto>> resp = responseUtil
			.buildSuccessResponse(userInfos);

		return resp;
	}

	/**
	 * 사용자 비밀번호를 체크하는 메소드
	 *
	 * @param
	 * @return 비밀번호 일치 여부
	 */
	public ResponseSuccessDto<?> checkPassword(
		Long userId,
		UserMatchPasswordDto matchPasswordDto,
		HttpServletRequest request) {

		UserEntity findUser = validateAccount(userId, request);

		Map<String, Object> res = new HashMap<>();

		res.put("passwordMatch", passwordEncoder.matches(matchPasswordDto.getPassword(), findUser.getPassword()));

		return responseUtil.buildSuccessResponse(res);
	}

	/**
	 * 접근한 사용자 정보를 검증하는 메소드
	 *
	 * @param
	 */
	private UserEntity validateAccount(Long userId, HttpServletRequest request) {

		String tokenEmail = jwtUtil.getUserEmail(request);

		UserEntity validateUser = userRepository.findByEmailAndExpiredLike(tokenEmail, "F")
			.orElseThrow(() -> new ApiErrorException(ApiStatus.RESOURCE_NOT_FOUND));

		if (!validateUser.getId().equals(userId)) {
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

}
