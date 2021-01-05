package com.wild.corp;

import com.wild.corp.configuration.JpaConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.context.annotation.Import;

import javax.annotation.PostConstruct;


@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages={"com.brice.corp"})// same as @Configuration @EnableAutoConfiguration @ComponentScan
public class RunWebApp {


	public static void main(String[] args) {
		SpringApplication springApplication = new SpringApplication(RunWebApp.class);
		springApplication.addListeners(new ApplicationPidFileWriter("gestion_benevole.pid"));
		springApplication.run(args);
	}

	/**
	 * Permet de lancer une fonction au démarrage de l'application
	 * ici, on charge le cache des olts
	 */
	@PostConstruct
	private void init() {

	}
}