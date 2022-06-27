
# Project : Fullstack-spring-boot-react 

# ------> CRUD avec API REST <------

# POSTGRESQL

## Partie Base de Données 

Création de la base "product_management" sur prosgresql

*commande:> psql -U postgres

Saisir le mot de passe de la base posgresql.

*commande:> \l

![image](https://user-images.githubusercontent.com/107515094/175769710-368789b6-5a01-439d-abc5-55b439676cc5.png)

*commande:> create database product_management;

*commande:> \l

![image](https://user-images.githubusercontent.com/107515094/175769735-0b66177e-219c-4d04-aad0-b20cee95f353.png)

Dans les Modèles nous avons les classes suivantes:

![image](https://user-images.githubusercontent.com/107515094/175874374-d936adf2-3251-49a5-afd7-b029815a1b0c.png)

Coté base de données les tables sont créés comme suit:

![image](https://user-images.githubusercontent.com/107515094/175874046-ad829449-17e0-4ec7-bfac-952267fe738e.png)

# Les codes Sources qui se trouvent ci-dessous sont à télécharger ou clonner et tester sur votre machine

Le code de la partie SpringBoot : modelsis-springboot-fullstack

Le code de la partie React: modelsis-react-fullstack

![image](https://user-images.githubusercontent.com/107515094/175870767-caf4b1a6-1419-4a09-9c34-66a268135d3b.png)


# SPRING BOOT

## Partie Backend-SpringBoot

***Pré-requis: 

java, Eclipse IDE for Java Developers, lombok, maven

Téléchager et installer https://projectlombok.org/download sur le projet.

Télécharger et dézipper maven https://maven.apache.org/download.cgi et le mettre dans la variable d'environnement.

## Sur éclipse : définition du nom du projet et des dépendances:

![image](https://user-images.githubusercontent.com/107515094/175770000-8383207c-8f18-4399-b404-6ce2ae0b92d9.png)

![image](https://user-images.githubusercontent.com/107515094/175770024-418349da-3bab-436e-ba1d-be0bc00c3758.png)

## Sur le fichier pom.xml les dépendances sont ajoutées automatiquement.

## Pour configurer Spring Datasource, JPA, Hibernate, Dans le package src/main/resources sur le fichier application.properties on ajoute les lignes suivantes:

### Debut ligne

spring.datasource.url=jdbc:postgresql://localhost:5432/product_management?useSSL=false 

spring.datasource.username=postgres

spring.datasource.password=Password

spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.PostgreSQLDialect

spring.jpa.hibernate.ddl-auto = update

### Fin ligne

NB:
spring.datasource.username & spring.datasource.password properties sont les mêmes que l'installation de votre base de données à modifier selon les propriétés de votre base (changer le username et le password).

### Définition des modèles de données pour le mappage JPA OneToMany

## 1-Dans le package com.fullstacktest.modelsisspringboot.entity on défnit les classes Product et ProductType

Pour la table prooduct_type, elle comporte  trois champs qui sont : id, name, created_date.

La classe de la table prooduct_type est ProductType.java avec ces champs id, nameTypeProduct, dateCreated (ajout du champs List<Product> sur la classe pour récupérer les products sur un types de products ).

Pour la table product, elle comporte  trois champs qui sont : id, name, created_date.
	
La classe de la table product est Product.java avec ces champs id, nameProduct, dateCreated.

public class Product{
	
  ...
	
   //Définition de la clé étrangère (foreign Key)
	
    @ManyToOne(fetch = FetchType.LAZY, optional=false)
	
    @JoinColumn(name = "product_type_id")
	
    @OnDelete(action = OnDeleteAction.CASCADE)
	
    @JsonIgnore
	
    private ProductType productType;
	
  ...
	
}
  
Nous utilisons également l'annotation @JoinColumn pour spécifier la colonne de clé étrangère (product_type_id).
	
@JsonIgnore est utilisé pour ignorer la propriété logique utilisée dans la sérialisation et la désérialisation.
	
Nous implémentons également des capacités de suppression en cascade de la clé étrangère avec @OnDelete(action = OnDeleteAction.CASCADE).
	
Par défaut, l'association @ManyToOne utilise FetchType.LAZY.

#### 2- Créer des interfaces de référentiel (repository) pour le OneToMany
	
Dans le package com.fullstacktest.modelsisspringboot.repository, pour le mappage du OneToMany, on défnit les classes référentiels ProductRepository.java et ProductTypeRepository.java pour interagir avec la base de données.
	
Avec ces classes nous pouvons  maintenant utiliser les méthodes de JpaRepository : save(), findOne(), findById(), findAll(), count(), delete(), deleteById()…  Nous implémenterons les méthodes dont on a besoin. L'implémentation est automatique avec Spring Data JPA .

### 3- Créer un contrôleur d'API Spring Rest.
  
 Dans le package com.fullstacktest.modelsisspringboot.controller, nous avons les contrôleurs qui fournit des API pour les opérations CRUD : création, récupération, mise à jour, suppression dans ProductController.java et création, récupération dans ProductTypeController.java 
	
Et dans les packages com.fullstacktest.modelsisspringboot.response et com.fullstacktest.modelsisspringboot.request les classes qui s'y trouve nous permettrons de créer notre API REST.
	
	Les Endpoints sont les suivants:
	
Operation	Endpoint			Description
	
GET	      	/products			Retourne un tableau de Produit.
	
POST		/products/{productTypeId}	Insère un nouveau produit.
	
POST		/productTypes/{id}		Insère un nouveau Type de Produit.
	
PUT		/products/{id}/{productTypeId}	Met à jour un Produit.
	
DELETE		/products/{id}			Pour supprimer un Produit

### 4- Exécution du projet Backend :

Pour exécuter la partie back c'est à partir de ce fichier java "ModelsisSpringbootApplication.java".

Se déplacer vers le dossier où se trouve le projet et ensuite faire la commande suivante :

*commande:> cd modelsis-springboot-fullstack

Exécuter la commande suivante:

*commande:> mvn spring-boot:run

![image](https://user-images.githubusercontent.com/107515094/175834128-0d45baad-fe4e-4409-8480-b5869b134ffd.png)
![image](https://user-images.githubusercontent.com/107515094/175834214-4bf9646d-3e87-404f-8513-da3d9e0f39b4.png)

### 5- Test de quelques ends-points sur Postman

http://localhost:8080/products
	
![image](https://user-images.githubusercontent.com/107515094/175834440-03a3baa8-bd0f-4ae7-bfa1-00bb141c28b8.png)

http://localhost:8080/productTypes
	
![image](https://user-images.githubusercontent.com/107515094/175834469-28e9bb7a-9b88-4c56-821a-b102c8358737.png)

# REACT
	
## Partie Frontend-React

### Création du projet React
	
*** Pré-requis : NodeJS, vscode

### 1- Installation des dépendances
	
*commande:> npx create-react-app modelsis-react-fullstack
	
Importer Bootstrap dans l'application React CRUD
	
*commande:>  npm install bootstrap 
	
*commande:>  npm install axios
	
Ajouter un routeur React à l'application React CRUD
	
*commande:>  npm install react-router-dom
	
Pour le select liste on install le react-select
	
*commande:> npm i react-select
	
 FYI : https://www.npmjs.com/package/react-select 

### 2- Exécution du projet Front-end :
	
Se déplacer vers le dossier où se trouve le projet et ensuite faire les commandes suivantes:

*commande:> cd modelsis-react-fullstack
	
installer le node_module (connexion internet requis) avec la commande suivante:
	
*commande:> npm install
	
![image](https://user-images.githubusercontent.com/107515094/175841736-52e95f5e-fe67-4491-bd96-cb208c29f08e.png)

Exécution du projet
	
*commande:> npm start

![image](https://user-images.githubusercontent.com/107515094/175843388-cc7dd8ab-0457-4d23-a72c-4974b9c9f486.png)
![image](https://user-images.githubusercontent.com/107515094/175843450-a0e6cae0-f5d4-4e76-b914-6fc135d2f2a3.png)

### 3- Test Partie Front-end :

#Add ProductType Page

![image](https://user-images.githubusercontent.com/107515094/175833212-be742f25-778c-46ea-b1c3-199faf8d3c7e.png)

#Add Product Page
	
![image](https://user-images.githubusercontent.com/107515094/175822232-76ce7866-1701-4d39-898e-3166db282c70.png)

#Product List Page

![image](https://user-images.githubusercontent.com/107515094/175834413-a52292e9-f0c9-4259-8eb3-17a7bcf5f2f0.png)

#Edit Product Page
	
![image](https://user-images.githubusercontent.com/107515094/175821670-0c202ae6-c61a-43aa-9c54-02516632fce0.png)
