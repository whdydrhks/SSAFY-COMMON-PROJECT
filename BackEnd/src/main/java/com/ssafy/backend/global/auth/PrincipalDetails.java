package com.ssafy.backend.global.auth;

import java.io.Serializable;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ssafy.backend.domain.member.entity.OAuthEntity;
import com.ssafy.backend.domain.member.entity.UserEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class PrincipalDetails implements UserDetails, OAuth2User, Serializable {

	private static final long serialVersionUID = 1L;

	private UserEntity user;
	private OAuthEntity oauth;
	private Collection<SimpleGrantedAuthority> authorities;
	//	private Map<String, Object> attributes;

	// UserDetails - Form 로그인 시 사용
	public PrincipalDetails(UserEntity user) {
		this.user = user;
	}

	// OAuth2User - OAuth2 로그인 시 사용
	public PrincipalDetails(UserEntity user, OAuthEntity oauth) {

	}

	// common fields
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	// UserDetails Fields
	@Override
	public String getPassword() {
		return this.user.getPassword();
	}

	@Override
	public String getUsername() {
		return this.user.getEmail();
	}

	/**
	 * 계정 만료 여부
	 * true : 만료 안됨
	 * false : 만료
	 * @return
	 */
	@Override
	public boolean isAccountNonExpired() {
		if ("F".equals(this.user.getExpired())) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 계정 잠김 여부
	 * true : 잠기지 않음
	 * false : 잠김
	 * @return
	 */
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	/**
	 * 비밀번호 만료 여부
	 * true : 만료 안됨
	 * false : 만료
	 * @return
	 */
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/**
	 * 사용자 활성화 여부
	 * true : 활성화
	 * false : 비활성화
	 * @return
	 */
	@Override
	public boolean isEnabled() {
		return true;
	}

	// OAuth2 Fields
	@Override
	public Map<String, Object> getAttributes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getName() {
		// TODO Auto-generated method stub
		return null;
	}

}
