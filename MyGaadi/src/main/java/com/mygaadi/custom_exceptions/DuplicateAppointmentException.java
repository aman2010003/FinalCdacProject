package com.mygaadi.custom_exceptions;

public class DuplicateAppointmentException extends RuntimeException {

	public DuplicateAppointmentException(String msg) {
		super(msg);
	}

}
