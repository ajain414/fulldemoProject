import React, { useEffect, useState } from "react";
import productService from "../service/product.service";
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    status: "",
  });
  const [productList, setProductList] = useState([]);
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };
  const navigate=useNavigate();
  const [validations, setValidations] = useState({
    productName: "",
    description: "",
    price: "",
    status: "",
  });
  productService
    .getAllProduct()
    .then((res) => {
      // console.log(res.data);
      setProductList(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

  function isNumber(value) {
    console.log(value);
    if (isNaN(value)) {
      // console.log("invoked");
      // validations.price="NaN";
      product.price = "";
      // console.log(validations);
      validateForm();
      return false;
    }

    return typeof value === "number";
  }
  const ProductRegistor = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (isNumber(Number(product.price))) {
        console.log(product);

        if (!isok(product)) {
          productService
            .saveProduct(product)
            .then((res) => {
              console.log("product saved successfully!!");
              setMsg("product saved successfully!!");
              setProduct({
                productName: "",
                description: "",
                price: "",
                status: "",
              });

              navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

    }
    
    // }
  };

  function validateForm() {
    let valid = true;
    setToggle(true);
    const errorsCopy = { ...validations };

    // console.log(errorsCopy);

    if (product.productName.trim()) {
      errorsCopy.productName = "";
    } else {
      errorsCopy.productName = "productName is required";
      valid = false;
    }
    if (product.description.trim()) {
      errorsCopy.description = "";
    } else {
      errorsCopy.description = "description is required";
      valid = false;
    }

    if (product.price.trim()) {
      errorsCopy.price = "";
    } else {
      if (product.price === "") {
        errorsCopy.price = "Invalid price value ";
        valid = false;
      } else {
        errorsCopy.price = "Price is required";
        valid = false;
      }
    }

    if (product.status.trim()) {
      errorsCopy.status = "";
    } else {
      errorsCopy.status = "status is required";
      valid = false;
    }
    // console.log(errorsCopy);
    setValidations(errorsCopy);
    // console.log(validations);

    return valid;
  }

  const [toggle, setToggle] = useState(true);

  function isok(product) {
    console.log(product);
    console.log(productList);
    for (let i = 0; i < productList.length; i++) {
      console.log(toggle);
      //  console.log(productList[i].productName===product.productName && productList[i].description===product.description);
      if (
        productList[i].productName === product.productName &&
        productList[i].description === product.description &&
        productList[i].price == product.price
      ) {
        console.log("dgdgdsgfdggd");
        setToggle(false);
        return true;
      }
    }
  }


  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Add Product</div>
              {msg && <p className="fs-4 text-center text-success">{msg}</p>}

              <div className="card-body">
                <form onSubmit={(e) => ProductRegistor(e)}>
                  <div className="mb-3">
                    <label>Enter Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className={`form-control ${
                        validations.productName ? "is-invalid" : ""
                      }`}
                      onChange={(e) => handleChange(e)}
                      value={product.productName}
                    />
                    {validations.productName && (
                      <div className="invalid-feedback">
                        {validations.productName}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Enter Description</label>
                    <input
                      type="text"
                      name="description"
                      className={`form-control ${
                        validations.description ? "is-invalid" : ""
                      }`}
                      onChange={(e) => handleChange(e)}
                      value={product.description}
                    />
                    {validations.description && (
                      <div className="invalid-feedback">
                        {validations.description}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Enter Price</label>
                    <input
                      type="text"
                      name="price"
                      className={`form-control ${
                        validations.price ? "is-invalid" : ""
                      }`}
                      onChange={(e) => handleChange(e)}
                      value={product.price}
                    />
                    {validations.price && (
                      <div className="invalid-feedback">
                        {validations.price}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Enter Status</label>
                    <input
                      type="text"
                      name="status"
                      className={`form-control ${
                        validations.status ? "is-invalid" : ""
                      }`}
                      onChange={(e) => handleChange(e)}
                      value={product.status}
                    />
                    {validations.status && (
                      <div className="invalid-feedback">
                        {validations.status}
                      </div>
                    )}
                  </div>

                  <button className="btn btn-primary col-md-12">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggle ?(
        <div></div>
      ) : (
        <div class="alert alert-danger">
          <strong></strong> Product Information Already exist!!
        </div>
      )}
    </>
  );
}
