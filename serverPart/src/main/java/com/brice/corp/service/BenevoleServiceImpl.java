package com.brice.corp.service;


import com.brice.corp.model.Benevole;
import com.brice.corp.model.Config;
import com.brice.corp.repositories.BenevoleRepository;
import com.brice.corp.repositories.ConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Classe implémentant les services IG
 */
@Service("BenevoleService")
@Transactional
public class BenevoleServiceImpl implements BenevoleService {


    @Autowired
    private BenevoleRepository benevoleRepository;


    @Override
    public void persist(Benevole child) {
        benevoleRepository.save(child);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Benevole> findAll() {
        return benevoleRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Benevole findById(Integer childId) {
        return benevoleRepository.getOne(childId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Benevole findByEmail(String email, Integer evenementId){
        return benevoleRepository.findByEmailAndEvenementId(email, evenementId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Benevole> findByEvenementId(Integer evenementId){
        return benevoleRepository.findByEvenementId(evenementId);
    }


}
