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

    List<Croisement> findByStandTypeAndStandEvenementId(Integer etat, Integer evenementId);

    List<Croisement> findAll();

    List<Croisement> findAllById(Integer croisementId);

    List<Croisement> findByStandId(Integer standId);

    List<Croisement> findByCreneauId(Integer creneauId);

    List<Croisement> findByBenevolesId(Integer benevoleId);


}
