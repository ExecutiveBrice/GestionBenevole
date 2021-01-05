package com.wild.corp.repositories;


import com.wild.corp.model.Benevole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Classe d'encapsulation de la couche DAO PM
 */
@Repository
public interface BenevoleRepository extends JpaRepository<Benevole, Integer> {

    Benevole getOne(Integer benevoleId);

    Benevole findByEmailAndEvenementId(String email, Integer evenementId);


    List<Benevole> findByEvenementId(Integer evenementId);

    List<Benevole> findAll();
}
