package com.wild.corp.repositories;


import com.wild.corp.model.Creneau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Classe d'encapsulation de la couche DAO PM
 */
@Repository
public interface CreneauRepository extends JpaRepository<Creneau, Integer> {

    List<Creneau> findByGroupeAndEvenementId(Integer groupe, Integer evenementId);

    List<Creneau> findByEvenementId(Integer evenementId);

    List<Creneau> findAll();
}
