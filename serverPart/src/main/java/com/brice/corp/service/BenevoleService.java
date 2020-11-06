package com.brice.corp.service;


import com.brice.corp.model.Benevole;
import com.brice.corp.model.Config;

import java.util.List;

/**
 * Classe des services portant sur les IG
 */
public interface BenevoleService {

    void persist(Benevole child);

    List<Benevole> findByEvenementId(Integer evenementId);

    Benevole findByEmail(String email, Integer evenementId);



    List<Benevole> findAll();

    Benevole findById(Integer childId);
}
