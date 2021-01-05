package com.wild.corp.service;

import com.wild.corp.model.Evenement;

import java.util.List;

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
