package com.wild.corp.service;


import com.wild.corp.model.Benevole;
import com.wild.corp.model.Evenement;
import com.wild.corp.repositories.BenevoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Classe implémentant les services IG
 */
@Service("BenevoleService")
@Transactional
public class BenevoleServiceImpl implements BenevoleService {


    @Autowired
    private BenevoleRepository benevoleRepository;

    @Autowired
    private CroisementService croisementService;

    @Autowired
    private EvenementService evenementService;

    @Override
    public void persist(Benevole benevole) {
        benevoleRepository.save(benevole);
    }


    @Override
    public void add(Benevole benevole, Integer evenementId){
        Evenement evenement = evenementService.findById(evenementId);

        benevole.setEvenement(evenement);

        persist(benevole);

    }




    @Override
    public void update(Benevole benevole) {

        Benevole pBenevole = findById(benevole.getId());
        pBenevole.setCommentaire(benevole.getCommentaire());

        pBenevole.setEmail(benevole.getEmail());
        pBenevole.setNom(benevole.getNom());
        pBenevole.setPrenom(benevole.getPrenom());
        pBenevole.setTelephone(benevole.getTelephone());
        pBenevole.setReponse(benevole.getReponse());
        persist(pBenevole);
    }




    @Override
    public Benevole updateCroisements(Integer benevoleId, List<Integer> croisementListId){

        Benevole benevole = findById(benevoleId);
        benevole.getCroisements().clear();
        for (Integer croisementId:croisementListId) {
            benevole.getCroisements().add(croisementService.findById(croisementId));
        }
        persist(benevole);
        return benevole;
    }



    /**
     * {@inheritDoc}
     */
    @Override
    public List<Benevole> findAll() {
        return benevoleRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Benevole findById(Integer benevoleId) {
        return benevoleRepository.getOne(benevoleId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Benevole findByEmail(String email, Integer evenementId){
        return benevoleRepository.findByEmailAndEvenementId(email, evenementId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Benevole> findByEvenementId(Integer evenementId){
        return benevoleRepository.findByEvenementId(evenementId);
    }


}
