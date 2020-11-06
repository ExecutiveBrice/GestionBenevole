package com.brice.corp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "CROISEMENT")
public class Croisement {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "LIMITE", nullable = false)
    private Integer limite;

    @Column(name = "BESOIN", nullable = false)
    private Boolean besoin;

    @Column(name = "SELECTED", nullable = false)
    private Boolean selected;

    @JsonIgnore
    @ManyToOne
    private Stand stand;

    @ManyToOne
    private Creneau creneau;

    @JsonIgnore
    @ManyToMany(mappedBy="croisements")
    private List<Benevole> benevoles;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getLimite() {
        return limite;
    }

    public void setLimite(Integer limite) {
        this.limite = limite;
    }

    public Boolean getBesoin() {
        return besoin;
    }

    public void setBesoin(Boolean besoin) {
        this.besoin = besoin;
    }

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }

    public Stand getStand() {
        return stand;
    }

    public void setStand(Stand stand) {
        this.stand = stand;
    }

    public Creneau getCreneau() {
        return creneau;
    }

    public void setCreneau(Creneau creneau) {
        this.creneau = creneau;
    }


    public List<Benevole> getBenevoles() {
        return benevoles;
    }

    public void setBenevoles(List<Benevole> benevoles) {
        this.benevoles = benevoles;
    }
}
