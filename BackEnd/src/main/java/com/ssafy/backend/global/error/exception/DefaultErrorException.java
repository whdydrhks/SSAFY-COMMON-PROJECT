package com.ssafy.backend.global.error.exception;

public class DefaultErrorException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public static final String DEFAULT_MESSAGE = "Unknown error exception";

	public DefaultErrorException() {
		super(DEFAULT_MESSAGE);
	}

	public DefaultErrorException(String msg) {
		super(msg);
	}

	public DefaultErrorException(String msg, Throwable cause) {
		super(msg, cause);
	}

	public DefaultErrorException(Throwable cause) {
		super(cause);
	}

}
