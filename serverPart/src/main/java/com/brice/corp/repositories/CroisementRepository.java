package com.brice.corp.repositories;



import com.brice.corp.model.Creneau;
import com.brice.corp.model.Croisement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Classe d'encapsulation de la couche DAO PM
 */
@Repository
public interface CroisementRepository extends JpaRepository<Croisement, Integer> {

    List<Croisement> findByCreneauGroupeAndCreneauEvenementId(Integer groupe, Integer evenementId);

    List<Croisement> findAll();
}
