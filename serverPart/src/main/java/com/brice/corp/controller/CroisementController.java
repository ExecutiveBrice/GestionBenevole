package com.brice.corp.controller;


import com.brice.corp.model.Croisement;
import com.brice.corp.model.Stand;
import com.brice.corp.service.CroisementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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


    @RequestMapping(value = "/", method = RequestMethod.DELETE)
    public ResponseEntity<Integer> delete(@RequestParam Integer croisementId) {
        logger.debug("delete standId "+croisementId);
        croisementService.delete(croisementId);

        return new ResponseEntity<>(croisementId, HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.PUT)
    public ResponseEntity<Croisement> update(@RequestBody Croisement croisement) {
        logger.debug("update Croisement");
        croisementService.persist(croisement);
        return new ResponseEntity<>(croisement, HttpStatus.OK);
    }



    @RequestMapping(value = "/getById", method = RequestMethod.GET)
    public ResponseEntity<Croisement> getById(@RequestParam Integer croisementId) {
        logger.debug("getCroisementp Croisement by croisementId "+croisementId);
        Croisement croisements = croisementService.findById(croisementId);

        if(croisements == null) {
            return new ResponseEntity(croisements, HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(croisements, HttpStatus.OK);
    }



    @RequestMapping(value = "/getByCreneau", method = RequestMethod.GET)
    public ResponseEntity<List<Croisement>> getByCreneau(@RequestParam Integer creneauId) {
        logger.debug("getByCreneau Croisement by creneau "+creneauId);
        List<Croisement> croisements = croisementService.getCroisementByCreneau(creneauId);

        if(croisements.isEmpty()) {
            return new ResponseEntity(croisements, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(croisements, HttpStatus.OK);
    }



    @RequestMapping(value = "/getByBenevole", method = RequestMethod.GET)
    public ResponseEntity<List<Croisement>> getByBenevole(@RequestParam Integer benevoleId) {
        logger.debug("getByBenevole Croisement by benevole "+benevoleId);
        List<Croisement> croisements = croisementService.getCroisementByBenveole(benevoleId);

        if(croisements.isEmpty()) {
            return new ResponseEntity(croisements, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(croisements, HttpStatus.OK);
    }



    @RequestMapping(value = "/getByStand", method = RequestMethod.GET)
    public ResponseEntity<List<Croisement>> getByStand(@RequestParam Integer standId) {
        logger.debug("getByStand Croisement by stand "+standId);
        List<Croisement> croisements = croisementService.getCroisementByStand(standId);

        if(croisements.isEmpty()) {
            return new ResponseEntity(croisements, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(croisements, HttpStatus.OK);
    }

    @RequestMapping(value = "/getByEtat", method = RequestMethod.GET)
    public ResponseEntity<List<Croisement>> getByEtat(@RequestParam Integer etat, @RequestParam Integer eventId) {
        logger.debug("getByEtat Croisement");
        List<Croisement> croisements = croisementService.findByEtatAndEvenementId(etat, eventId);

        if(croisements.isEmpty()) {
            return new ResponseEntity(croisements, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(croisements, HttpStatus.OK);
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public ResponseEntity<List<Croisement>> getAll(@RequestParam Integer eventId) {
        logger.debug("getAll Croisement");
        List<Croisement> croisements = croisementService.findAll();

        if(croisements.isEmpty()) {
            return new ResponseEntity(croisements, HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(croisements, HttpStatus.OK);
    }


}
