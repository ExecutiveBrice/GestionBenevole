package com.brice.corp.service;

import com.brice.corp.model.Evenement;

import java.util.List;
import java.util.Map;

/**
 * Classe des services portant sur les IG
 */
public interface EvenementService {

    void persist(Evenement evenement);

    List<Evenement> findAll();

    Evenement update(Evenement evenement);

    Evenement findById(Integer evenementId);



    void deleteById(Integer evenementId);
}
