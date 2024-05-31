import React, {  useState } from "react";
import productService from "../service/product.service";
import { useNavigate } from 'react-router-dom';
import Validation from "./Validation";

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
  

  productService
    .getAllProduct()
    .then((res) => {
      setProductList(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  function isok(product) {
    for (let i = 0; i < productList.length; i++) {
      console.log(toggle);
      if (
        productList[i].productName === product.productName &&
        productList[i].description === product.description &&
        productList[i].price == product.price
      ) {
        setToggle(false);
        return true;
      }
    }
  }
  const navigate=useNavigate();
  const [toggle, setToggle] = useState(true);
  const[error,setError]=useState({});
  const ProductRegistor = (e) => {
    e.preventDefault();
    setError(Validation(product)[0]);

        if (Validation(product)[1]===0 && !isok(product)) {
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
            
  };
  
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
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.productName}
                    />
                    {error.productName && <p style={{color:"red"}}>{error.productName}</p>}
                    
                  </div>

                  <div className="mb-3">
                    <label>Enter Description</label>
                    <input
                      type="text"
                      name="description"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.description}
                    />
                    {error.description && <p style={{color:"red"}}>{error.description}</p>}
                  </div>

                  <div className="mb-3">
                    <label>Enter Price</label>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.price}
                    />
                    {error.price && <p style={{color:"red"}}>{error.price}</p>}
                  </div>

                  <div className="mb-3">
                    <label>Enter Status</label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.status}
                    />
                    {error.status && <p style={{color:"red"}}>{error.status}</p>}
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
