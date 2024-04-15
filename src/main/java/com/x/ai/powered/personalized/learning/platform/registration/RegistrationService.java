package com.x.ai.powered.personalized.learning.platform.registration;

import com.x.ai.powered.personalized.learning.platform.doa.dto.StudentDto;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

@Service
public interface RegistrationService {
    String register(StudentDto studentDto) throws MessagingException;

    String confirm(String token);

    String regenerate(String token) throws MessagingException;
}
