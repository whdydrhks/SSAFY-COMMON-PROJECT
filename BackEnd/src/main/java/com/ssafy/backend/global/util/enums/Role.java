package com.ssafy.backend.global.util.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {

	ADMIN(1, "ADMIN", new String[] {"ADMIN"}),
	HOST(2, "HOST", new String[] {"ADMIN", "HOST"}),
	USER(3, "USER", new String[] {"ADMIN", "HOST", "USER"}),
	NONE(0, "NONE", new String[] {"ADMIN", "HOST", "USER", "NONE"});

	private int code;
	private String name;
	private String[] highRoles;
}
