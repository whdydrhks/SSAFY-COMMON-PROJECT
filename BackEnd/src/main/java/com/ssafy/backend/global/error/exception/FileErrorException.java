package com.ssafy.backend.global.error.exception;

import com.ssafy.backend.global.util.enums.ApiStatus;

import lombok.Getter;

@Getter
public class FileErrorException extends DefaultErrorException {

	private static final long serialVersionUID = 1L;

	private ApiStatus exception;

	public FileErrorException(ApiStatus e) {
		super(e.getMessage());
		this.exception = e;
	}

	public FileErrorException(ApiStatus e, String file) {
		super(e.getMessage() + "\nfile name : " + file);
		this.exception = e;
	}

}
