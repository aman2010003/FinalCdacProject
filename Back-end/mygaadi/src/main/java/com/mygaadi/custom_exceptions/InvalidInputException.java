package com.mygaadi.custom_exceptions;

public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String mesg) {
        super(mesg);
    }
}