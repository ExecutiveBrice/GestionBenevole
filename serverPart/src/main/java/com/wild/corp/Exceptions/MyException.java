package com.wild.corp.Exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class MyException extends Exception {
    public MyException(String errorMessage) {
        super(errorMessage);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class NotFoundException extends RuntimeException{
    }

}