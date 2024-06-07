package com.Mockproject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "product",schema = "myschema")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column
    @NotNull(message = "Product name shouldn't be null")
    @Size(min = 1,max = 30,message = "Product name should be in range from 1 to 30 character")
    private String productName;
    @Column
    @NotNull(message = "description shouldn't be null")
    private String description;
    @Column
    @NotNull(message = "price shouldn't be null")
    @Pattern(regexp = "[0-9]+",message = "Price value is not valid")
    private String price;
    @Column

//    @NotNull(message = "status shouldn't be null")
    @Enumerated(EnumType.STRING)
    private StatusE status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public StatusE getStatus() {
        return status;
    }

    public void setStatus(StatusE status) {
        this.status = status;
    }
}
