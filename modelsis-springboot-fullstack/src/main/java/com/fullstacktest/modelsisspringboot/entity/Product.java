package com.fullstacktest.modelsisspringboot.entity;

import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

//****************************Définition de la table product*********************************//

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "product")

@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "dateCreated" }, allowGetters = true)

public class Product {

	// identifiant (l'id de la table)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	// Définition de la caractérique "name"
	@Column(name = "name")
	@NotNull
	@Size(max = 100)
	private String nameProduct;

	// Définition de la clé étrangère (foreign Key)
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "product_type_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private ProductType productType;

	// Définition de la date de création automatique (timestamp)
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	@CreatedDate
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", locale = "en_CA")
	private Date dateCreated;

	@PrePersist
	protected void onCreate() {
		dateCreated = new Date();
	}

	public String dateCreated(Date dateCreated) {
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		String format = formatter.format(dateCreated);
		return format;
	}
}