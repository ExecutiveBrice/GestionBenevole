package com.brice.corp.service;


import com.brice.corp.model.Croisement;
import com.brice.corp.repositories.CroisementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

/**
 * Classe implémentant les services IG
 */
@Service("CroisementService")
@Transactional
public class CroisementServiceImpl implements CroisementService {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class NotFoundException extends RuntimeException{
    }

    @Autowired
    private CroisementRepository croisementRepository;

    @Autowired
    private StandService childService;

    @Override
    public void persist(Croisement parent) {
        croisementRepository.save(parent);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public List<Croisement> findByCreneauGroupeAndCreneauEvenementId(Integer groupe, Integer eventId) {
        return croisementRepository.findByCreneauGroupeAndCreneauEvenementId(groupe, eventId);
    }



    /**
     * {@inheritDoc}
     */
    @Override
    public List<Croisement> findAll() {
        return croisementRepository.findAll();
    }




}
