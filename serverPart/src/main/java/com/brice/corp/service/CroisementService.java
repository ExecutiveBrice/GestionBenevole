package com.brice.corp.service;



import com.brice.corp.model.Croisement;
import java.util.List;

/**
 * Classe des services portant sur les IG
 */
public interface CroisementService {

    void persist(Croisement parent);

    List<Croisement> findByCreneauGroupeAndCreneauEvenementId(Integer groupe, Integer eventId);

    List<Croisement> findAll();
}