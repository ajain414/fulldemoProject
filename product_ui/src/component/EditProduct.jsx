import React, { useEffect, useState } from 'react'
import productService from '../service/product.service';
import { useNavigate, useParams } from 'react-router-dom';
import Validation from './Validation';

export default function EditProduct() {
  const [product,setProduct]=useState({
    id:"",
    productName:"",
    description:"",
    price:"",
    status:""

  });
  const {id}=useParams();
  console.log(id);

  useEffect(()=>{
    productService.getProductById(id).then((res)=>{
      console.log(res.data);
        setProduct(res.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[id]);

const navigate=useNavigate();
  const [msg,setMsg]=useState("");
  const handleChange=(e)=>{
    const value=e.target.value;
    setProduct({...product,[e.target.name]:value})
  };


const[error,setError]=useState({});

  const ProductUpdate=(e)=>{
    e.preventDefault();
    
    // console.log(product);
    setError(Validation(product)[0]);

    if (Validation(product)[1]===0) {
   productService.editProduct(product).then((res)=>{
    setMsg("product updated successfully!!");
    
    navigate("/");

   }).catch((error)=>{
    console.log(error);
   });
  }
 
  };
 return (
    <>
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-header bg-dark text-white fs-3 text-center'>
              Update Product
            </div>
            {msg && <p className='fs-4 text-center text-success'>{msg}</p>}

            <div className='card-body'>
              <form onSubmit={(e)=>ProductUpdate(e)}>

                <div className="mb-3">
                  <label >Enter Product Name</label>
                  <input type="text" name='productName' className="form-control" onChange={(e)=>handleChange(e)} value={product.productName}/>
                  {error.productName && <p style={{color:"red"}}>{error.productName}</p>}
                </div>

                <div className="mb-3">
                  <label >Enter Description</label>
                  <input type="text" name='description' className="form-control" onChange={(e)=>handleChange(e)} value={product.description}/>
                  {error.description && <p style={{color:"red"}}>{error.description}</p>}
                </div>

                <div className="mb-3">
                  <label >Enter Price</label>
                  <input type="text" name='price' className="form-control" onChange={(e)=>handleChange(e)} value={product.price}/>
                  {error.price && <p style={{color:"red"}}>{error.price}</p>}
                </div>

                <div className="mb-3">
                    <label>Enter Status</label>
                    <select class="form-select" aria-label="Default select example"
                      type="text"
                      name="status"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.status}
                    >
                    <option  value="" selected>Open this select menu</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    
                  </select>
                   {error.status && <p style={{color:"red"}}>{error.status}</p>}
                  </div>
                <button className="btn btn-dark col-md-12">Update</button>


              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
    </>
  )
  
}
