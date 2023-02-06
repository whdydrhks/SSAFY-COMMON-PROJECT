package com.ssafy.backend.global.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafy.backend.domain.member.entity.UserEntity;
import com.ssafy.backend.global.auth.model.PrincipalDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtUtil {

	public final String ISSUER = "ssafy.com";
	public final String ACCESS_TOKEN = "accessToken";
	public final String REFRESH_TOKEN = "refreshToken";

	public final String USER_ID = "userId";
	public final String USER_NICKNAME = "userNickname";
	public final String USER_EMAIL = "userEmail";
	public final String USER_PERMISSION = "userRole";

	@Value("${jwt.validity-second.access}")
	private long ACCESS_TOKEN_VALIDATION_SECOND;

	@Value("${jwt.validity-second.refresh}")
	private long REFRESH_TOKEN_VALIDATION_SECOND;

	@Value("${jwt.secret}")
	private String SECRET_KEY;

	private final RedisUtil redisUtil;

	/**
	 * 서명 키를 생성하는 메소드
	 *
	 * @param secretKey
	 * @return SecretKey(생성된 서명 키)
	 */
	private Key getSigningKey(String secretKey) {
		byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	/**
	 * 서명 키를 사용해 토큰의 claims영역을 parsing하는 메소드
	 *
	 * @param
	 * @return parsing된 claims
	 * @throws ExpiredJwtException
	 */
	public Claims extractAllClaims(String token) throws ExpiredJwtException {
		return Jwts.parserBuilder()
			.setSigningKey(getSigningKey(SECRET_KEY))
			.build()
			.parseClaimsJws(token)
			.getBody();
	}

	/**
	 * claims에서 key에 해당하는 value를 가져오는 메소드
	 *
	 * @param
	 * @return key값이 일치한 value
	 */
	public String getValue(String token, String key) {
		return extractAllClaims(token).get(key, String.class);
	}

	/**
	 * claims에서 key가 id에 해당하는 value를 가져오는 메소드
	 *
	 * @param
	 * @return key값이 id인  value
	 */
	public String getUserId(String token) {
		return getValue(token, USER_ID);
	}

	/**
	 * claims에서 key가 nickname에 해당하는 value를 가져오는 메소드
	 *
	 * @param
	 * @return key값이 nickname인  value
	 */
	public String getUserNickname(String token) {
		return getValue(token, USER_NICKNAME);
	}

	/**
	 * claims에서 key가 email에 해당하는 value를 가져오는 메소드
	 *
	 * @param
	 * @return key값이 email인  value
	 */
	public String getUserEmail(String token) {
		return getValue(token, USER_EMAIL);
	}

	/**
	 * claims에서 key가 permission에 해당하는 value를 가져오는 메소드
	 *
	 * @param
	 * @return key값이 permission인  value
	 */
	public String getUserPermission(String token) {
		return getValue(token, USER_PERMISSION);
	}

	/**
	 * 토큰의 만료 여부를 확인하는 메소드
	 *
	 * @param
	 * @return 만료여부에 따라 true/false로 반환
	 */
	public Boolean isTokenExpired(String token) {
		final Date expiration = extractAllClaims(token).getExpiration();
		return expiration.before(new Date());
	}

	public String createAccessToken(UserEntity user) {
		HashMap<String, String> payload = new HashMap<>();
		//		payload.put(USER_ID, user.getId().toString());
		payload.put(USER_EMAIL, user.getEmail());
		payload.put(USER_NICKNAME, user.getNickname());
		payload.put(USER_PERMISSION, user.getRole().toString());

		String accessToken = doCreateToken(ACCESS_TOKEN, payload, ACCESS_TOKEN_VALIDATION_SECOND * 1000L);

		return accessToken;
	}

	public String createRefreshToken(UserEntity user) {
		HashMap<String, String> payload = new HashMap<>();
		//payload.put(USER_ID, user.getId().toString());
		payload.put(USER_EMAIL, user.getEmail());
		payload.put(USER_NICKNAME, user.getNickname());
		//payload.put(USER_PERMISSION, user.getRole().toString());

		String refreshToken = doCreateToken(REFRESH_TOKEN, payload, REFRESH_TOKEN_VALIDATION_SECOND * 1000L);

		//생성한 refresh token은 redis에 바로 삽입
		deleteRefreshToken(user.getEmail());
		redisUtil.setDataExpire(user.getEmail(), refreshToken, REFRESH_TOKEN_VALIDATION_SECOND * 1000L);

		return refreshToken;
	}

	public String doCreateToken(String tokenType, HashMap<String, String> payload, long expireTime) {
		// JWT Header Setting
		Map<String, Object> headers = new HashMap<>();
		headers.put("alg", "HS512");
		headers.put("typ", "JWT");

		// JWT Payload Setting
		Claims claims = Jwts.claims();
		claims.setIssuer(ISSUER); // 토큰 발행자
		claims.setSubject(tokenType); // 토큰 타입을 토큰 제목으로
		claims.putAll(payload);

		// JWT Build
		String jwt = Jwts.builder()
			.setHeader(headers) // header
			.setClaims(claims) // claims
			.setIssuedAt(new Date(System.currentTimeMillis())) // 생성 시간
			.setExpiration(new Date(System.currentTimeMillis() + expireTime)) // 만료시간
			.signWith(getSigningKey(SECRET_KEY), SignatureAlgorithm.HS512) // 사용할 암호화 알고리즘과 signature에 들어갈 secret key 세팅
			.compact();

		return jwt;
	}

	public void updateRefreshToken(String userEmail, String token) {
		deleteRefreshToken(userEmail);
		redisUtil.setDataExpire(userEmail, token, REFRESH_TOKEN_VALIDATION_SECOND * 1000L);
	}

	public void deleteRefreshToken(String userEmail) {
		redisUtil.deleteData(userEmail);
	}

	public Boolean validateToken(String token, PrincipalDetails principalDetails) {
		final String userEmail = getValue(token, USER_EMAIL);

		return (userEmail.equals(principalDetails.getUsername()) && !isTokenExpired(token));
	}

}