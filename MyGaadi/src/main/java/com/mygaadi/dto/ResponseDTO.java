package com.mygaadi.dto;

public class ResponseDTO<T> {
    private String status;
    private T data;

    public ResponseDTO() {
    }

    public ResponseDTO(String status, T data) {
        this.status = status;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
