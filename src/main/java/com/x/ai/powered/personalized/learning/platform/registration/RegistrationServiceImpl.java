package com.x.ai.powered.personalized.learning.platform.registration;

import com.x.ai.powered.personalized.learning.platform.doa.Student;
import com.x.ai.powered.personalized.learning.platform.doa.dto.StudentDto;
import com.x.ai.powered.personalized.learning.platform.mail.EmailSender;
import com.x.ai.powered.personalized.learning.platform.repo.StudentRepo;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.UUID;

@AllArgsConstructor
public class RegistrationServiceImpl implements RegistrationService, UserDetailsService {

    private final StudentRepo studentRepo;
    private final RegistrationTokenRepo tokenRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailSender;
    @Override
    public String register(StudentDto studentDto) throws MessagingException {

        if(studentRepo.findByemail(studentDto.email()).isEmpty()){
           return "this email is already registered";
        }
        String regToken = UUID.randomUUID().toString();
        RegistrationToken token = RegistrationToken.builder()
                .token(regToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .student(Student.builder()
                        .firstname(studentDto.firstname())
                        .lastname(studentDto.lastname())
                        .age(Period.between(studentDto.dob().toLocalDate(), LocalDate.now()).getYears())
                        .email(studentDto.email())
                        .password(passwordEncoder.encode(studentDto.password()))
                        .build()
                )
                .build();
        String mail = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "  <head>\n" +
                "    <meta charset=\"UTF-8\" />\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
                "    <title>Email Confirmation</title>\n" +
                "    <style>\n" +
                "      body {\n" +
                "        font-family: Arial, sans-serif;\n" +
                "        background-color: #f4f4f4;\n" +
                "        margin: 0;\n" +
                "        padding: 0;\n" +
                "      }\n" +
                "      .email-container {\n" +
                "        max-width: 600px;\n" +
                "        margin: 20px auto;\n" +
                "        background-color: #ffffff;\n" +
                "        padding: 20px;\n" +
                "        text-align: center;\n" +
                "      }\n" +
                "      .email-header {\n" +
                "        background-color: white;\n" +
                "        padding: 10px;\n" +
                "      }\n" +
                "      .email-logo {\n" +
                "        height: 50px;\n" +
                "      }\n" +
                "      .email-body {\n" +
                "        padding: 20px;\n" +
                "      }\n" +
                "      .email-title {\n" +
                "        font-size: 24px;\n" +
                "        font-weight: bold;\n" +
                "        margin-bottom: 10px;\n" +
                "      }\n" +
                "      .email-button {\n" +
                "        display: inline-block;\n" +
                "        padding: 10px 20px;\n" +
                "        margin: 20px 0;\n" +
                "        background-color: #007bff;\n" +
                "        color: #ffffff;\n" +
                "        text-decoration: none;\n" +
                "        border-radius: 5px;\n" +
                "      }\n" +
                "      .email-footer {\n" +
                "        font-size: 12px;\n" +
                "        color: #777777;\n" +
                "        margin-top: 20px;\n" +
                "      }\n" +
                "    </style>\n" +
                "  </head>\n" +
                "  <body>\n" +
                "    <div class=\"email-container\">\n" +
                "      <div class=\"email-header\">\n" +
                "        <div style=\"border: 2px solid blue\"></div>\n" +
                "      </div>\n" +
                "      <div class=\"email-body\">\n" +
                "        <div class=\"email-title\">Confirm Your Email Address</div>\n" +
                "        <p>Hi there,</p>\n" +
                "        <p>\n" +
                "          Tap the button below to confirm your email address. If you didn't\n" +
                "          create an account with us, you can safely delete this email.\n" +
                "        </p>\n" +
                "        <!-- Replace '#' with your actual verification link -->\n" +
                "        <a\n" +
                "          href=\"http://localhost:8181/api/hackerX/registration/confirm?token="+regToken+
                "\"\n" +
                "          class=\"email-button\"\n" +
                "          >Click to Verify Email</a\n" +
                "        >\n" +
                "        <p>\n" +
                "          If that doesn't work, copy and paste the following link in your\n" +
                "          browser:\n" +
                "        </p>\n" +
                "        <!-- Replace '#' with your actual verification link -->\n" +
                "        <p>\n" +
                "          <a href=\"#\"\n" +
                "            >http://localhost:8181/api/hackerX/registration/confirm?token=" +regToken +
                "</a\n" +
                "          >\n" +
                "        </p>\n" +
                "      </div>\n" +
                "      <div class=\"email-footer\">\n" +
                "        The GroupX Team<br />\n" +
                "        You received this email because you requested for creation of your\n" +
                "        account.\n" +
                "      </div>\n" +
                "    </div>\n" +
                "  </body>\n" +
                "</html>\n";
        emailSender.sendmail(mail,studentDto.email(),"Email Confirmation");
        tokenRepo.save(token);

        return "check email for confirmation email";
    }

    @Override
    public String confirm(String token) {
        RegistrationToken bytoken = tokenRepo.findBytoken(token);
        if(bytoken == null){
            return "invalid token";
        }
        else {
            if(!(bytoken.getConfirmedAt() == null)){
                return " your email is already verified";
            }
            else if (bytoken.getExpiresAt().isBefore(LocalDateTime.now())) {
                return "your token has expired click"+
                        "<a href=\"http://localhost:8181/api/hackerX/registration/regenerate?token="+bytoken.getToken()+
                        "\">here</a>" +
                        " to regenerate confirmation email";
            }
        }
        bytoken.setConfirmedAt(LocalDateTime.now());
        Student student = bytoken.getStudent();
        student.setEnabled(true);
        tokenRepo.save(bytoken);
        return "your account has been confirmed";
    }

    @Override
    public String regenerate(String token) throws MessagingException {
        RegistrationToken token1 = tokenRepo.findBytoken(token);
        if (token1 == null){
          return "invalid token";
        }  else {
            if (!(token1.getConfirmedAt() == null)){
               return "email already confirmed";
            }
            String regToken = UUID.randomUUID().toString();
          RegistrationToken registrationToken = RegistrationToken.builder()
                  .student(token1.getStudent())
                    .token(regToken)
                    .createdAt(LocalDateTime.now())
                    .expiresAt(LocalDateTime.now().plusMinutes(15))
                    .build();
          String body = "<!DOCTYPE html>\n" +
                  "<html lang=\"en\">\n" +
                  "  <head>\n" +
                  "    <meta charset=\"UTF-8\" />\n" +
                  "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n" +
                  "    <title>Email Confirmation</title>\n" +
                  "    <style>\n" +
                  "      body {\n" +
                  "        font-family: Arial, sans-serif;\n" +
                  "        background-color: #f4f4f4;\n" +
                  "        margin: 0;\n" +
                  "        padding: 0;\n" +
                  "      }\n" +
                  "      .email-container {\n" +
                  "        max-width: 600px;\n" +
                  "        margin: 20px auto;\n" +
                  "        background-color: #ffffff;\n" +
                  "        padding: 20px;\n" +
                  "        text-align: center;\n" +
                  "      }\n" +
                  "      .email-header {\n" +
                  "        background-color: white;\n" +
                  "        padding: 10px;\n" +
                  "      }\n" +
                  "      .email-logo {\n" +
                  "        height: 50px;\n" +
                  "      }\n" +
                  "      .email-body {\n" +
                  "        padding: 20px;\n" +
                  "      }\n" +
                  "      .email-title {\n" +
                  "        font-size: 24px;\n" +
                  "        font-weight: bold;\n" +
                  "        margin-bottom: 10px;\n" +
                  "      }\n" +
                  "      .email-button {\n" +
                  "        display: inline-block;\n" +
                  "        padding: 10px 20px;\n" +
                  "        margin: 20px 0;\n" +
                  "        background-color: #007bff;\n" +
                  "        color: #ffffff;\n" +
                  "        text-decoration: none;\n" +
                  "        border-radius: 5px;\n" +
                  "      }\n" +
                  "      .email-footer {\n" +
                  "        font-size: 12px;\n" +
                  "        color: #777777;\n" +
                  "        margin-top: 20px;\n" +
                  "      }\n" +
                  "    </style>\n" +
                  "  </head>\n" +
                  "  <body>\n" +
                  "    <div class=\"email-container\">\n" +
                  "      <div class=\"email-header\">\n" +
                  "        <div style=\"border: 2px solid blue\"></div>\n" +
                  "      </div>\n" +
                  "      <div class=\"email-body\">\n" +
                  "        <div class=\"email-title\">Confirm Your Email Address</div>\n" +
                  "        <p>Hi there,</p>\n" +
                  "        <p>\n" +
                  "          Tap the button below to confirm your email address. If you didn't\n" +
                  "          create an account with us, you can safely delete this email.\n" +
                  "        </p>\n" +
                  "        <!-- Replace '#' with your actual verification link -->\n" +
                  "        <a\n" +
                  "          href=\"http://localhost:8181/api/hackerX/registration/confirm?token="+regToken+
                  "\"\n" +
                  "          class=\"email-button\"\n" +
                  "          >Click to Verify Email</a\n" +
                  "        >\n" +
                  "        <p>\n" +
                  "          If that doesn't work, copy and paste the following link in your\n" +
                  "          browser:\n" +
                  "        </p>\n" +
                  "        <!-- Replace '#' with your actual verification link -->\n" +
                  "        <p>\n" +
                  "          <a href=\"#\"\n" +
                  "            >http://localhost:8181/api/hackerX/registration/confirm?token=" +regToken +
                  "</a\n" +
                  "          >\n" +
                  "        </p>\n" +
                  "      </div>\n" +
                  "      <div class=\"email-footer\">\n" +
                  "        The GroupX Team<br />\n" +
                  "        You received this email because you requested for creation of your\n" +
                  "        account.\n" +
                  "      </div>\n" +
                  "    </div>\n" +
                  "  </body>\n" +
                  "</html>\n";
          emailSender.sendmail(body,token1.getStudent().getEmail(),"Email Confirm");
           tokenRepo.save(registrationToken);
           return "check email for new confirmation email";
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return studentRepo.findByemail(username).orElseThrow(()-> new RuntimeException("user not found"));
    }
}
