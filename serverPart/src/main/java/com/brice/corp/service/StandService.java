package com.brice.corp.service;


import com.brice.corp.model.Stand;


import java.util.List;

/**
 * Classe des services portant sur les IG
 */
public interface StandService {

    void persist(Stand stand);

    void addStand(Stand stand, Integer eventId);

    List<Stand> findByEvenementId(Integer evenementId);

    List<Stand> findAll();

    void delete(Integer standId);

    Stand findById(Integer standId);

    void update(Stand stand);

}
