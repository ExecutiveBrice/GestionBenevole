package com.wild.corp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;


@Entity
@Table(name = "CRENEAU")
public class Creneau {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "PLAGE", nullable = false)
    private String plage;

    @Column(name = "ORDRE")
    private Integer ordre;

    @Column(name = "GROUPE")
    private Integer groupe;

    @Column(name = "CHEVAUCHEMENT")
    private Integer[] chevauchement;

    @JsonIgnore
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


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Creneau)) return false;
        Creneau creneau = (Creneau) o;
        return Objects.equals(getId(), creneau.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Creneau{" +
                "id=" + id +
                ", plage='" + plage + '\'' +
                ", ordre=" + ordre +
                ", groupe=" + groupe +
                ", chevauchement=" + Arrays.toString(chevauchement) +
                ", evenement=" + evenement +
                '}';
    }
}
