package com.brice.corp.repositories;



import com.brice.corp.model.Creneau;
import com.brice.corp.model.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Classe d'encapsulation de la couche DAO PM
 */
@Repository
public interface EvenementRepository extends JpaRepository<Evenement, Integer> {


    List<Evenement> findAllById(Integer evenementId);

    void deleteById(Integer evenementId);

/*
    @Query("SELECT c FROM Child c WHERE c.name = :name AND c.firstName = :firstName")
    Evenement findByNameAndFirstname(@Param("name") String name, @Param("firstName") String firstName);
*/

    List<Evenement> findAll();
}
