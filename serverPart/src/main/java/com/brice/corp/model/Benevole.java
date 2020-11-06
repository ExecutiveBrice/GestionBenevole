package com.brice.corp.model;


import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "BENEVOLE")
public class Benevole {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "PRENOM", nullable = false)
    private String prenom;

    @Column(name = "NOM", nullable = false)
    private String nom;

    @Column(name = "TELEPHONE")
    private String telephone;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "COMMENTAIRE")
    private String commentaire;

    @Column(name = "REPONSE")
    private String reponse;

    @ManyToMany
    private List<Croisement> croisements;

    @ManyToOne
    private Evenement evenement;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getReponse() {
        return reponse;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
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
