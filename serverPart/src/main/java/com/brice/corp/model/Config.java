package com.brice.corp.model;

import javax.persistence.*;


@Entity
@Table(name = "CONFIG")
public class Config {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "PARAM", nullable = false)
    private String param;

    @Column(name = "VALUE", nullable = false)
    private String value;

    @ManyToOne
    private Evenement evenement;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Evenement getEvenement() {
        return evenement;
    }

    public void setEvenement(Evenement evenement) {
        this.evenement = evenement;
    }
}
