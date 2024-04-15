package com.x.ai.powered.personalized.learning.platform.doa.dto;

import java.sql.Date;

public record StudentDto(String firstname, String lastname,
                         String password , String email, Date dob) {
}
