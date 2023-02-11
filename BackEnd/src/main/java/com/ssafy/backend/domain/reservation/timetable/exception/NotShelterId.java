package com.ssafy.backend.domain.reservation.timetable.exception;

public class NotShelterId extends RuntimeException {
	public NotShelterId() {
		super();
	}

	public NotShelterId(String message) {
		super(message);
	}


	public NotShelterId(String message, Throwable cause) {
		super(message, cause);
	}

	public NotShelterId(Throwable cause) {
		super(cause);
	}

	protected NotShelterId(String message, Throwable cause, boolean enableSupression, boolean writableStackTrace) {
		super(message, cause, enableSupression, writableStackTrace);
	}
}
