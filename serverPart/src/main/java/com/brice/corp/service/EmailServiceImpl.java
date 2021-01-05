package com.brice.corp.service;


import com.brice.corp.model.Email;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
    public class EmailServiceImpl implements EmailService {
    public static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage2(Email mail) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("alod.section.fete@gmail.com");
        message.setTo(mail.getTo());
        message.setSubject(mail.getSubject());
        message.setText(mail.getText());

        try {
            emailSender.send(message);
        } catch (MailException e) {
            logger.debug("send mail " + e);
        }


    }

    public void sendSimpleMessage(Email mail) {
        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true);
            helper.setFrom("alod.section.fete@gmail.com");
            helper.setTo(mail.getTo());
            helper.setSubject(mail.getSubject());
            helper.setText(mail.getText(),true);


        } catch (MessagingException e) {
            e.printStackTrace();
        }



        try {
            emailSender.send(message);
        } catch (MailException e) {
            logger.debug("send mail " + e);
        }
    }
}
