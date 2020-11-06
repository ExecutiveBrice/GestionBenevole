package com.brice.corp.controller;



import com.brice.corp.model.Benevole;
import com.brice.corp.service.BenevoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller de la vue globale
 */
@RestController
@RequestMapping("/benevole")
public class BenevoleController {

    public static final Logger logger = LoggerFactory.getLogger(BenevoleController.class);

    @Autowired
    private BenevoleService benevoleService;



    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Benevole> add(@RequestBody Benevole benevole) {
        logger.debug("add Benevole");
        benevoleService.persist(benevole);

        if(benevole.getId() == null) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(benevole, HttpStatus.OK);
    }


    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<Benevole> update(@RequestBody Benevole benevole) {
        logger.debug("update Benevole");
        benevoleService.persist(benevole);
        return new ResponseEntity<>(benevole, HttpStatus.OK);
    }


    @RequestMapping(value = "/byMail", method = RequestMethod.GET)
    public ResponseEntity<Benevole> getByMail(@RequestParam String email, @RequestParam Integer eventId) {
        logger.debug("getByMail Benevole");
        Benevole benevole = benevoleService.findByEmail(email,eventId );

        if(benevole == null) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(benevole, HttpStatus.OK);
    }


    @RequestMapping(value = "/getByEvenementId", method = RequestMethod.GET)
    public ResponseEntity<List<Benevole>> getByEvenementId(@RequestParam Integer eventId) {
        logger.debug("getAll Benevole");
        List<Benevole> benevoles = benevoleService.findAll();

        if(benevoles.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(benevoles, HttpStatus.OK);
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<List<Benevole>> getAll() {
        logger.debug("getAll Benevole");
        List<Benevole> benevoles = benevoleService.findAll();

        if(benevoles.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(benevoles, HttpStatus.OK);
    }


}
