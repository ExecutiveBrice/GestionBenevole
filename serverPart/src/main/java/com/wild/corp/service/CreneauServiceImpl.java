package com.wild.corp.service;


import com.wild.corp.model.Creneau;
import com.wild.corp.model.Evenement;
import com.wild.corp.repositories.CreneauRepository;
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

    @Autowired
    private EvenementService evenementService;


    @Override
    public void persist(Creneau creneau) {
        creneauRepository.save(creneau);
    }


    @Override
    public void addCreneau(Creneau creneau, Integer evenementId){
        Evenement evenement = evenementService.findById(evenementId);

        creneau.setEvenement(evenement);

        persist(creneau);
    }

    @Override
    public void updateCreneau(Creneau newCreneau){
        Creneau creneau = findById(newCreneau.getId());

        creneau.setOrdre(newCreneau.getOrdre());
        creneau.setPlage(newCreneau.getPlage());
        creneau.setChevauchement(newCreneau.getChevauchement());
        persist(creneau);
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
