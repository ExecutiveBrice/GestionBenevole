package com.wild.corp.service;


import com.wild.corp.model.Evenement;
import com.wild.corp.repositories.EvenementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Classe implémentant les services IG
 */
@Service("EvenementService")
@Transactional
public class EvenementServiceImpl implements EvenementService {

    public static final Logger logger = LoggerFactory.getLogger(EvenementService.class);

    @Autowired
    private EvenementRepository evenementRepository;
    @Autowired
    private Environment environment;



    @Override
    public void persist(Evenement evenement) {

        evenement.setLock(Boolean.valueOf(environment.getRequiredProperty("evenement.default.lock")));
        evenement.setValidation(environment.getRequiredProperty("evenement.default.messages.validation"));
        evenement.setRetour(environment.getRequiredProperty("evenement.default.messages.retour"));
        evenement.setSignature(environment.getRequiredProperty("appparam.messages.creation.signature"));

        evenement.setRappel(replaceText(environment.getRequiredProperty("evenement.default.messages.rappel"), evenement));
        evenement.setRappelDate(new Date(evenement.getStartDate().getTime() - Integer.valueOf(environment.getRequiredProperty("evenement.default.recallDaysBeforeStartDate"))*24*60*60));
        evenementRepository.save(evenement);
    }

    String replaceText(String text, Evenement evenement){

        text = text.replaceAll("<start_date>", String.valueOf(evenement.getStartDate()) );
        text = text.replaceAll("<event_name>", String.valueOf(evenement.getEventName()) );

        return text;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Evenement update(Evenement evenement) {

        Evenement event = findById(evenement.getId());
        event.setStartDate(evenement.getStartDate());
        event.setRappelDate(evenement.getRappelDate());
        event.setEndDate(evenement.getEndDate());
        event.setEventName(evenement.getEventName());
        event.setContactTel(evenement.getContactTel());
        event.setContact(evenement.getContact());
        event.setContactEmail(evenement.getContactEmail());

        event.setPassword(evenement.getPassword());
        event.setRetour(evenement.getRetour());
        event.setRappel(evenement.getRappel());
        event.setSignature(evenement.getSignature());
        event.setValidation(evenement.getValidation());
        event.setLock(evenement.isLock());

        return evenementRepository.save(event);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public List<Evenement> findAll() {
        return evenementRepository.findAll();
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public Evenement findById(Integer evenementId) {
        List<Evenement> evenements = evenementRepository.findAllById(evenementId);
        if(evenements == null){
            return null;
        }else{
            return evenements.get(0);
        }

    }


    /**
     * {@inheritDoc}
     */
    @Override
    public void deleteById(Integer evenementId) {
        evenementRepository.deleteById(evenementId);
    }

}
