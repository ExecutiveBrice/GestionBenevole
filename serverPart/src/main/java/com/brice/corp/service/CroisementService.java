package com.brice.corp.service;



import com.brice.corp.model.Croisement;
import java.util.List;

/**
 * Classe des services portant sur les IG
 */
public interface CroisementService {

    void persist(Croisement croisement);

    List<Croisement> findByEtatAndEvenementId(Integer etat, Integer eventId);

    List<Croisement> findAll();

    void delete(Integer croisementId);

    Croisement findById(Integer croisementId);

    List<Croisement> getCroisementByStand(Integer standId);

    List<Croisement> getCroisementByCreneau(Integer creneauId);

    List<Croisement> getCroisementByBenveole(Integer benevoleId);


}