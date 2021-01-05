package com.brice.corp.service;


import com.brice.corp.model.Benevole;

import java.util.List;

/**
 * Classe des services portant sur les IG
 */
public interface BenevoleService {

    void persist(Benevole benevole);



    void add(Benevole benevole, Integer evenementId);


    void update(Benevole benevole);

    List<Benevole> findByEvenementId(Integer evenementId);

    Benevole findByEmail(String email, Integer evenementId);

    Benevole updateCroisements(Integer benevoleId, List<Integer> croisementListId);

    List<Benevole> findAll();

    Benevole findById(Integer benevoleId);
}
