package com.wild.corp.controller;



import com.wild.corp.model.Email;
import com.wild.corp.model.Stand;
import com.wild.corp.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller de la vue globale
 */
@RestController
@RequestMapping("/email")
public class mailController {

    public static final Logger logger = LoggerFactory.getLogger(mailController.class);

    @Autowired
    private EmailService emailService;



    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Stand> send(@RequestBody Email mail) {
        logger.debug("send mail "+mail.getTo());

        emailService.sendSimpleMessage(mail);

        return new ResponseEntity<>(HttpStatus.OK);
    }



}
