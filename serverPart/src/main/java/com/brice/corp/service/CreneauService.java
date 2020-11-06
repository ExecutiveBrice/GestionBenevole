package com.brice.corp.service;


import com.brice.corp.model.Config;
import com.brice.corp.model.Creneau;

import java.util.List;

/**
 * Classe des services portant sur les IG
 */
public interface CreneauService {

    void persist(Creneau child);

    List<Creneau> findByGroupeAndEvenementId(Integer groupe, Integer evenementId);

    List<Creneau> findByEvenementId(Integer evenementId);

    List<Creneau> findAll();

    Creneau findById(Integer childId);
}
