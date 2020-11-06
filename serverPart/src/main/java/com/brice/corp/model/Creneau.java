package com.brice.corp.model;

import javax.persistence.*;
import java.util.List;



@Entity
@Table(name = "CRENEAU")
public class Creneau {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "PLAGE", nullable = false)
    private String plage;

    @Column(name = "ORDRE", nullable = false)
    private Integer ordre;

    @Column(name = "GROUPE")
    private Integer groupe;

    @Column(name = "CHEVAUCHEMENT")
    private Integer[] chevauchement;

    @ManyToOne
    private Evenement evenement;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlage() {
        return plage;
    }

    public void setPlage(String plage) {
        this.plage = plage;
    }

    public Integer getOrdre() {
        return ordre;
    }

    public void setOrdre(Integer ordre) {
        this.ordre = ordre;
    }

    public Integer getGroupe() {
        return groupe;
    }

    public void setGroupe(Integer groupe) {
        this.groupe = groupe;
    }

    public Integer[] getChevauchement() {
        return chevauchement;
    }

    public void setChevauchement(Integer[] chevauchement) {
        this.chevauchement = chevauchement;
    }

    public Evenement getEvenement() {
        return evenement;
    }

    public void setEvenement(Evenement evenement) {
        this.evenement = evenement;
    }
}
