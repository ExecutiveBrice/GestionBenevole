package com.wild.corp.service;


import com.wild.corp.model.Evenement;
import com.wild.corp.model.Stand;

import com.wild.corp.repositories.StandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

/**
 * Classe implémentant les services IG
 */
@Service("StandService")
@Transactional
public class StandServiceImpl implements StandService {


    @Autowired
    private StandRepository standRepository;

    @Autowired
    private CreneauService creneauService;

    @Autowired
    private EvenementService evenementService;

    @Override
    public void persist(Stand child) {
        standRepository.save(child);
    }

    @Override
    public void addStand(Stand stand, Integer eventId){
        Evenement evenvement  = evenementService.findById(eventId);
        stand.setEvenement(evenvement);
        persist(stand);
    }



    @Override
    public void delete(Integer standId) {
        Stand stand = findById(standId);

        standRepository.delete(stand);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Stand> findAll() {
        return standRepository.findAll();
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public Stand findById(Integer childId) {
        return standRepository.getOne(childId);
    }


    @Override
    public void update(Stand stand) {
        Stand realStand = findById(stand.getId());

        realStand.setNom(stand.getNom());
        realStand.setBulle(stand.getBulle());
        realStand.setDescription(stand.getDescription());
        realStand.setOrdre(stand.getOrdre());

        realStand.setType(stand.getType());
        standRepository.save(realStand);
    }



    /**
     * {@inheritDoc}
     */
    @Override
    public List<Stand> findByEvenementId(Integer evenementId) {
        return standRepository.findByEvenementId(evenementId);
    }


}
