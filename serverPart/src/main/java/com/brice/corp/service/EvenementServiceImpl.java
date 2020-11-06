package com.brice.corp.service;


import com.brice.corp.controller.EvenementController;
import com.brice.corp.model.Evenement;
import com.brice.corp.repositories.EvenementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Classe implémentant les services IG
 */
@Service("EvenementService")
@Transactional
public class EvenementServiceImpl implements EvenementService {

    public static final Logger logger = LoggerFactory.getLogger(EvenementService.class);

    @Autowired
    private EvenementRepository evenementRepository;


    @Override
    public void persist(Evenement evenement) {

        evenementRepository.save(evenement);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Evenement> findAll() {
        return evenementRepository.findAll();
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public Evenement findById(Integer evenementId) {
        Evenement evn = evenementRepository.getOne(evenementId);
        logger.debug(evn.toString());
        return evn;
    }

}
