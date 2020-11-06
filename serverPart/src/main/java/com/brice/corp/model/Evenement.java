package com.brice.corp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "EVENEMENT")
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID", nullable = false)
    private Integer id;

    @Column(name = "CONTACT", nullable = false)
    private String contact;

    @Column(name = "CONTACT_TEL")
    private String contactTel;

    @Column(name = "CONTACT_EMAIL", nullable = false)
    private String contactEmail;

    @Column(name = "EVENT_NAME", nullable = false)
    private String eventName;

    @Column(name = "START_DATE", nullable = false)
    private Date startDate;

    @Column(name = "END_DATE")
    private Date endDate;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy="evenement")
    private List<Benevole> benevoles;

    @JsonIgnore
    @OneToMany(mappedBy="evenement")
    private List<Creneau> creneaus;

    @JsonIgnore
    @OneToMany(mappedBy="evenement")
    private List<Config> configs;

    @JsonIgnore
    @OneToMany(mappedBy="evenement")
    private List<Stand> stands;

    public Integer getId() { return id; }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getContactTel() {
        return contactTel;
    }

    public void setContactTel(String contactTel) {
        this.contactTel = contactTel;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Benevole> getBenevoles() {
        return benevoles;
    }

    public void setBenevoles(List<Benevole> benevoles) {
        this.benevoles = benevoles;
    }

    public List<Creneau> getCreneaus() {
        return creneaus;
    }

    public void setCreneaus(List<Creneau> creneaus) {
        this.creneaus = creneaus;
    }

    public List<Config> getConfigs() {
        return configs;
    }

    public void setConfigs(List<Config> configs) {
        this.configs = configs;
    }

    public List<Stand> getStands() {
        return stands;
    }

    public void setStands(List<Stand> stands) {
        this.stands = stands;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Evenement)) return false;
        Evenement evenement = (Evenement) o;
        return Objects.equals(getId(), evenement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Evenement{" +
                "id=" + id +
                ", contact='" + contact + '\'' +
                ", contactTel='" + contactTel + '\'' +
                ", contactEmail='" + contactEmail + '\'' +
                ", eventName='" + eventName + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", password='" + password + '\'' +
                ", benevoles=" + benevoles +
                ", creneaus=" + creneaus +
                ", configs=" + configs +
                ", stands=" + stands +
                '}';
    }
}
