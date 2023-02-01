package com.ssafy.backend.domain.member.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.model.request.UserLoginDto;
import com.ssafy.backend.domain.member.model.request.UserSignupDto;
import com.ssafy.backend.domain.member.model.request.UserUpdateDto;
import com.ssafy.backend.domain.member.model.response.UserInfoDto;
import com.ssafy.backend.domain.member.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true) // 기본적으로 트랜잭션 안에서만 데이터 변경하게 설정(성능 향상)
@RequiredArgsConstructor // Lombok을 사용해 @Autowired 없이 의존성 주입. final 객제만 주입됨을 주의
public class UserService {

	private final PasswordEncoder passwordEncoder;

	private final UserRepository userRepository;

	/**
	 * 유저 가입을 처리하는 메소드
	 *
	 * @param
	 * @return user id
	 * @throws IllegalStateException
	 */
	@Transactional
	public Long join(UserSignupDto signupDto) {
		// 패스워드 암호화
		signupDto.setPassword(passwordEncoder.encode(signupDto.getPassword()));

		UserEntity joinUser = signupDto.toEntity();

		// 중복검사
		validateDuplicateUser(joinUser);
		UserEntity user = userRepository.save(joinUser);

		System.out.println(user);
		return user.getId();
	}

	/**
	 * 일반 로그인을 처리하는 메소드
	 *
	 * @param
	 * @return Optional<>
	 * @throws IllegalAccessException
	 */
	@Transactional
	public UserEntity login(UserLoginDto loginDto) throws IllegalAccessException {
		UserEntity findUser = userRepository.findByEmail(loginDto.getEmail())
			.orElseThrow(() -> new IllegalAccessException("존재하지 않는 회원입니다."));

		// 로그인을 시도한 이메일과 동일한 이메일이 없거나,
		// 비밀번호가 일치하지 않는다면 빈 Optional객체를 보냄
		if (!passwordEncoder.matches(loginDto.getPassword(), findUser.getPassword())) {
			throw new IllegalAccessException("비밀번호가 일치하지 않습니다.");
		}

		return findUser;

	}

	/**
	 * 사용자의 정보를 갱신하는 메소드
	 *
	 * @param
	 * @return 업데이트 된 userId
	 * @throws IllegalAccessException
	 */
	@Transactional
	public Long update(String userEmail, UserUpdateDto updateDto) throws IllegalAccessException {

		UserEntity findUser = userRepository.findByEmail(userEmail)
			.orElseThrow(() -> new IllegalAccessException("존재하지 않는 회원입니다."));

		UserEntity updateUser = UserEntity.builder()
			.id(findUser.getId())
			.email(findUser.getEmail())
			.password(updateDto.getPassword())
			.role(findUser.getRole())
			.name(updateDto.getName())
			.phoneNumber(updateDto.getPhoneNumber())
			.nickname(updateDto.getNickname())
			.profileImage(findUser.getProfileImage())
			.build();

		return userRepository.save(updateUser).getId();
	}

	/**
	 * 사용자의 계정 권한을 설정하는 메소드
	 *
	 * @param
	 * @return 계정 권한이 업데이트 된 userId
	 * @throws IllegalAccessException
	 */
	public Long updateRole(String userEmail, String roleName) throws IllegalAccessException {

		UserEntity findUser = userRepository.findByEmail(userEmail)
			.orElseThrow(() -> new IllegalAccessException("존재하지 않는 회원입니다."));

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
			.build();

		return userRepository.save(updateUser).getId();
	}

	/**
	 * 사용자의 계정 만료 여부를 갱신하는 메소드
	 *
	 * @param
	 * @return 만료 정보가 업데이트 된 userId
	 * @throws IllegalAccessException
	 */
	public Long updateExpire(String userEmail, Boolean expiredFlag) throws IllegalAccessException {

		UserEntity findUser = userRepository.findByEmail(userEmail)
			.orElseThrow(() -> new IllegalAccessException("존재하지 않는 회원입니다."));

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
			.build();

		return userRepository.save(updateUser).getId();
	}

	/**
	 * 사용자의 정보를 삭제하는 메소드
	 *
	 * @param
	 * @return 삭제된 된 userId
	 */
	@Transactional
	public Long delete(String userEmail) {
		return userRepository.deleteByEmail(userEmail);
	}

	/**
	 * email로 사용자 정보를 가져오는 메소드
	 *
	 * @param
	 * @return UserInfoDto
	 * @throws IllegalAccessException
	 */
	@Transactional
	public UserInfoDto getInfoByEmail(String userEmail) throws IllegalAccessException {
		UserEntity findUser = userRepository.findByEmail(userEmail)
			.orElseThrow(() -> new IllegalAccessException("존재하지 않는 회원입니다."));

		return UserInfoDto.of(findUser);
	}

	/**
	 * nickname으로 사용자 정보를 가져오는 메소드
	 *
	 * @param
	 * @return UserInfoDto
	 * @throws IllegalAccessException
	 */
	@Transactional
	public UserInfoDto getInfoByNickname(String userNickname) throws IllegalAccessException {
		UserEntity findUser = userRepository.findByNickname(userNickname)
			.orElseThrow(() -> new IllegalAccessException("존재하지 않는 회원입니다."));

		return UserInfoDto.of(findUser);
	}

	/**
	 * 유저의 가입 정보가 이미 있는지 확인하는 메소드
	 *
	 * @param
	 * @throws IllegalStateException
	 */
	private void validateDuplicateUser(UserEntity user) {
		Optional<UserEntity> findUser = userRepository.findByEmail(user.getEmail());
		if (findUser.isPresent()) {
			throw new IllegalStateException("일치하는 아이디가 이미 존재합니다.");
		}
	}
}
