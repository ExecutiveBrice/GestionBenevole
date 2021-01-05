package com.wild.corp.service;


import com.wild.corp.model.Croisement;
import com.wild.corp.repositories.CroisementRepository;
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
    public class NotFoundException extends RuntimeException{}

    @Autowired
    private CroisementRepository croisementRepository;

    @Override
    public void persist(Croisement croisement) {
        croisementRepository.save(croisement);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public List<Croisement> findByEtatAndEvenementId(Integer etat, Integer eventId) {
        return croisementRepository.findByStandTypeAndStandEvenementId(etat, eventId);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public void delete(Integer croisementId) {
        Croisement croisement = findById(croisementId);


        croisementRepository.delete(croisement);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public Croisement findById(Integer croisementId){
        return croisementRepository.findAllById(croisementId).get(0);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Croisement> getCroisementByStand(Integer standId){
        return croisementRepository.findByStandId(standId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Croisement> getCroisementByCreneau(Integer creneauId){
        return croisementRepository.findByCreneauId(creneauId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Croisement> getCroisementByBenveole(Integer benevoleId){
        return croisementRepository.findByBenevolesId(benevoleId);
    }
    /**
     * {@inheritDoc}
     */
    @Override
    public List<Croisement> findAll() {
        return croisementRepository.findAll();
    }

}
