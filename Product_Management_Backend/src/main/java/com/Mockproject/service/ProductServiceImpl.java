package com.Mockproject.service;

import com.Mockproject.model.Product;
import com.Mockproject.model.ProductRequestLayer;
import com.Mockproject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepo;

    @Override
    public Product saveProduct(ProductRequestLayer product) {

        Product pr=new Product();
        pr.setProductName(product.getProductName());
        pr.setDescription(product.getDescription());
        pr.setPrice(product.getPrice());
        pr.setStatus(product.getStatus());
        return productRepo.save(pr);
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepo.findAll();
    }

    @Override
    public Product getProductById(Integer id) {
        return productRepo.findById(id).get();
    }

    @Override
    public String deleteProduct(Integer id) {
        Product product=productRepo.findById(id).get();
        if(product!=null) {
            productRepo.delete(product);
            return "Product Delete Successfully";
        }
        return "Something wrong on Server";
    }
    @Override
    public Product editProduct(Product p,Integer id)
    {
        Product oldProduct=productRepo.findById(id).get();
        oldProduct.setProductName(p.getProductName());
        oldProduct.setDescription(p.getDescription());
        oldProduct.setPrice(p.getPrice());
        oldProduct.setStatus(p.getStatus());
        return productRepo.save(oldProduct);
    }
}
