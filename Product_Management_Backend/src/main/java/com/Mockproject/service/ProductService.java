package com.Mockproject.service;

import com.Mockproject.model.Product;
import com.Mockproject.model.ProductRequestLayer;

import java.util.List;

public interface ProductService {
    public Product saveProduct(ProductRequestLayer product);
    public List<Product> getAllProduct();
    public Product getProductById(Integer id );
    public String deleteProduct(Integer id);

    public Product editProduct(Product product,Integer id);

}
