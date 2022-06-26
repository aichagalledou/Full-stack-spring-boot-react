package com.fullstacktest.modelsisspringboot.entity;

import lombok.Data;
import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fullstacktest.modelsisspringboot.request.ProductTypeRequest;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

//****************************Définition de la table product_type*********************************//

@AllArgsConstructor
@NoArgsConstructor

@Entity
@Data
@Table(name = "product_type")

@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = { "dateCreated" }, allowGetters = true)

public class ProductType {

	// identifiant (l'id de la table)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	// Définition de la caractérique "name"
	@Column(name = "name")
	@Size(max = 100)
	private String nameTypeProduct;

	// Définition de la clé étrangère (foreign Key)
	@OneToMany(mappedBy = "productType", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Product> products;

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
