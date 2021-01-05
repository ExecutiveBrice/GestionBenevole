package com.wild.corp.controller;



import com.wild.corp.service.ConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Controller de la vue globale
 */
@RestController
@RequestMapping("/config")
public class configController {

    public static final Logger logger = LoggerFactory.getLogger(configController.class);

    @Autowired
    private ConfigService configService;

    @RequestMapping(value = "/getParams", method = RequestMethod.GET)
    public ResponseEntity< Map<String, String>> getParams() {
        logger.debug("getParams ");

        Map<String, String> params = configService.getParams();

        return new ResponseEntity<>(params, HttpStatus.OK);
    }



}
