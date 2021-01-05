package com.wild.corp.controller;



import com.wild.corp.model.Creneau;
import com.wild.corp.service.CreneauService;
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
@RequestMapping("/creneau")
public class CreneauController {

    public static final Logger logger = LoggerFactory.getLogger(CreneauController.class);

    @Autowired
    private CreneauService creneauService;



    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<Creneau> add(@RequestBody Creneau creneau, @RequestParam Integer eventId) {
        logger.debug("add Creneau");
        creneauService.addCreneau(creneau, eventId);

        if(creneau.getId() == null) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(creneau, HttpStatus.OK);
    }


    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<Creneau> update(@RequestBody Creneau creneau) {
        logger.debug("update Creneau");
        creneauService.updateCreneau(creneau);
        return new ResponseEntity<>(creneau, HttpStatus.OK);
    }


    @RequestMapping(value = "/getByGroup", method = RequestMethod.GET)
    public ResponseEntity<List<Creneau>> getByGroup(@RequestParam Integer group, @RequestParam Integer eventId) {
        logger.debug("getByGroup Croisement");
        List<Creneau> creneaux = creneauService.findByGroupeAndEvenementId(group, eventId);

        if(creneaux.isEmpty()) {
            return new ResponseEntity(creneaux, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(creneaux, HttpStatus.OK);
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<List<Creneau>> getAll(@RequestParam Integer eventId) {
        logger.debug("getAll Creneau");
        List<Creneau> creneaux = creneauService.findByEvenementId(eventId);

        if(creneaux.isEmpty()) {
            return new ResponseEntity(creneaux, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(creneaux, HttpStatus.OK);
    }


}
