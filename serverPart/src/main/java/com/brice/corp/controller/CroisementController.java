package com.brice.corp.controller;


import com.brice.corp.model.Croisement;
import com.brice.corp.service.CroisementService;
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
@RequestMapping("/croisement")
public class CroisementController {

    public static final Logger logger = LoggerFactory.getLogger(CroisementController.class);

    @Autowired
    private CroisementService croisementService;



    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Croisement> add(@RequestBody Croisement croisement) {
        logger.debug("add Croisement");
        croisementService.persist(croisement);

        if(croisement.getId() == null) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(croisement, HttpStatus.OK);
    }


    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<Croisement> update(@RequestBody Croisement croisement) {
        logger.debug("update Croisement");
        croisementService.persist(croisement);
        return new ResponseEntity<>(croisement, HttpStatus.OK);
    }


    @RequestMapping(value = "/getByGroup", method = RequestMethod.GET)
    public ResponseEntity<List<Croisement>> getByGroup(@RequestParam Integer group, @RequestParam Integer eventId) {
        logger.debug("getByGroup Croisement");
        List<Croisement> croisements = croisementService.findByCreneauGroupeAndCreneauEvenementId(group, eventId);

        if(croisements.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(croisements, HttpStatus.OK);
    }


    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<List<Croisement>> getAll(@RequestParam Integer eventId) {
        logger.debug("getAll Croisement");
        List<Croisement> croisements = croisementService.findAll();

        if(croisements.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(croisements, HttpStatus.OK);
    }


}
