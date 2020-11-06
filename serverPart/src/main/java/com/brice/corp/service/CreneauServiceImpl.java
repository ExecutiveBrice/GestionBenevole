package com.brice.corp.service;


import com.brice.corp.model.Creneau;
import com.brice.corp.repositories.CreneauRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Classe implémentant les services IG
 */
@Service("CreneauService")
@Transactional
public class CreneauServiceImpl implements CreneauService {


    @Autowired
    private CreneauRepository creneauRepository;


    @Override
    public void persist(Creneau child) {
        creneauRepository.save(child);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Creneau> findAll() {
        return creneauRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Creneau findById(Integer childId) {
        return creneauRepository.getOne(childId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Creneau> findByGroupeAndEvenementId(Integer groupe, Integer evenementId){
        return creneauRepository.findByEvenementId(evenementId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Creneau> findByEvenementId(Integer evenementId){
        return creneauRepository.findByEvenementId(evenementId);
    }

}
