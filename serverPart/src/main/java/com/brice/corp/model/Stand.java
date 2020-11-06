package com.brice.corp.model;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "STAND")
public class Stand {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "NOM", nullable = false)
    private String nom;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "ETAT", nullable = false)
    private Integer etat;

    @Column(name = "ORDRE", nullable = false)
    private Integer ordre;

    @Column(name = "BULLE")
    private String bulle;

    @OneToMany(mappedBy="stand")
    private List<Croisement> croisements;

    @ManyToOne
    private Evenement evenement;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getEtat() {
        return etat;
    }

    public void setEtat(Integer etat) {
        this.etat = etat;
    }

    public Integer getOrdre() {
        return ordre;
    }

    public void setOrdre(Integer ordre) {
        this.ordre = ordre;
    }

    public String getBulle() {
        return bulle;
    }

    public void setBulle(String bulle) {
        this.bulle = bulle;
    }

    public List<Croisement> getCroisements() {
        return croisements;
    }

    public void setCroisements(List<Croisement> croisements) {
        this.croisements = croisements;
    }

    public Evenement getEvenement() {
        return evenement;
    }

    public void setEvenement(Evenement evenement) {
        this.evenement = evenement;
    }
}
