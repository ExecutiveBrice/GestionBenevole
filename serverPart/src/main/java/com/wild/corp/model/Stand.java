package com.wild.corp.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

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

    @Column(name = "BULLE")
    private String bulle;

    @Column(name = "ORDRE")
    private Integer ordre;

    @Column(name = "TYPE")
    private Integer type;

    @JsonIgnore
    @OneToMany(mappedBy="stand", orphanRemoval=true)
    private List<Croisement> croisements;

    @JsonIgnore
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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Stand)) return false;
        Stand stand = (Stand) o;
        return Objects.equals(getId(), stand.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Stand{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", description='" + description + '\'' +
                ", type=" + type +
                ", ordre=" + ordre +
                ", bulle='" + bulle + '\'' +
                ", croisements=" + croisements +
                ", evenement=" + evenement +
                '}';
    }
}
