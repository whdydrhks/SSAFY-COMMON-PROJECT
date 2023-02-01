package com.ssafy.backend.global.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.domain.member.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	/**
	 * 유저의 정보를 불러와서 UserDetails로 리턴
	 *
	 * @param
	 * @return UserDetails
	 * @throws UsernameNotFoundException
	 */
	@Override
	public UserDetails loadUserByUsername(String loginEmail) throws UsernameNotFoundException {
		UserEntity loadUser = userRepository.findByEmail(loginEmail)
			.orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다. email=" + loginEmail));

		PrincipalDetails principalDetails = new PrincipalDetails(loadUser);

		return principalDetails;
	}

}
