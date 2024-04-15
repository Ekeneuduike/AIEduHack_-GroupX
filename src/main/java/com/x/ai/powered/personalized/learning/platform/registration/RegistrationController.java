package com.x.ai.powered.personalized.learning.platform.registration;

import com.x.ai.powered.personalized.learning.platform.doa.Student;
import com.x.ai.powered.personalized.learning.platform.doa.dto.StudentDto;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("api/hackerX/registration")
public class RegistrationController {
    private final RegistrationService service;

    @PostMapping("/register")
    public String register(@RequestBody StudentDto studentDto) throws MessagingException {
        return service.register(studentDto);
    }

    @GetMapping("/confirm")
    public String confirmUser(@RequestParam String token){
        return service.confirm(token);
    }
    @GetMapping("/regenerate")
    public String regenerate(@RequestParam String token) throws MessagingException {
        return service.regenerate(token);
    }
}
