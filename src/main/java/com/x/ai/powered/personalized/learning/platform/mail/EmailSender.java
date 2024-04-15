package com.x.ai.powered.personalized.learning.platform.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@Service
public class EmailSender {

  private JavaMailSender mailSender;

    public void sendmail(String body,String receiver,String topic) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setText(body,true);
        mimeMessageHelper.setTo(receiver);
        mimeMessageHelper.setSentDate(new Date(String.valueOf(LocalDate.now())));
        mimeMessageHelper.setSubject(topic);
        mailSender.send(mimeMessage);
    }
}
