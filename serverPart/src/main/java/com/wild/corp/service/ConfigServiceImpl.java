package com.wild.corp.service;

import com.wild.corp.repositories.EvenementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

/**
 * Classe implémentant les services IG
 */
@Service("ConfigService")
@Transactional
public class ConfigServiceImpl implements ConfigService {

    public static final Logger logger = LoggerFactory.getLogger(EvenementService.class);

    @Autowired
    private EvenementRepository evenementRepository;
    @Autowired
    private Environment environment;



    @Override
    public Map<String, String> getParams() {
        Map<String, String> params = new HashMap<>();

        params.put("url", environment.getRequiredProperty("appparam.url"));
        params.put("title", environment.getRequiredProperty("appparam.messages.creation.title"));
        params.put("header", environment.getRequiredProperty("appparam.messages.creation.header"));
        params.put("using", environment.getRequiredProperty("appparam.messages.creation.using"));
        params.put("managing", environment.getRequiredProperty("appparam.messages.creation.managing"));
        params.put("signature", environment.getRequiredProperty("appparam.messages.creation.signature"));

    return params;
    }

}
