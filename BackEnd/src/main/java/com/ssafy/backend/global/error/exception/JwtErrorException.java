package com.ssafy.backend.global.error.exception;

import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.Getter;

@Getter
public class JwtErrorException extends DefaultErrorException {

	private static final long serialVersionUID = 1L;

	private ApiStatus exception;

	public JwtErrorException(ApiStatus e) {
		super(e.getMessage());
		this.exception = e;
	}

	public JwtErrorException(ApiStatus e, String jwt) {
		super(e.getMessage() + "\njwt token : " + jwt);
		this.exception = e;
	}

}
