import React, { useEffect, useState } from 'react'
import productService from '../service/product.service';
import { useNavigate, useParams } from 'react-router-dom';

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
  const[validations,setValidations] = useState({
    productName:"",
    description:"",
    price:"",
    status:""
  })
  useEffect(()=>{
    productService.getProductById(id).then((res)=>{
      // console.log(res.data);
        setProduct(res.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[id]);
 
  function isNumber(value) {
    console.log(value);
    if(isNaN(value) )
    {
      // console.log("invoked");
      // validations.price="NaN";
      product.price='';
      // console.log(validations);
      validateForm();
      return false;}

    return typeof value === 'number';
  }


const navigate=useNavigate();
  const [msg,setMsg]=useState("");
  const handleChange=(e)=>{
    const value=e.target.value;
    setProduct({...product,[e.target.name]:value})
  };


  function validateForm(){
    let valid = true;

    const errorsCopy = {...validations}
    
    // console.log(errorsCopy);

    if(product.productName.trim()){
        errorsCopy.productName='';
    }else{
        errorsCopy.productName='productName is required';
        valid=false;
    }
    if(product.description.trim()){
      errorsCopy.description='';
  }else{
      errorsCopy.description='description is required';
      valid=false;
  }

    if(product.price.trim()){
        errorsCopy.price='';
    }else{
      if(product.price==='')
        {errorsCopy.price='Invalid price value ';
        valid=false;}
      else
        {
          errorsCopy.price='Price is required';
          valid=false;
        }
    }

    if(product.status.trim()){
        errorsCopy.status='';
    }else{
        errorsCopy.status='status is required';
        valid=false;
    }
    // console.log(errorsCopy);
    setValidations(errorsCopy);
    // console.log(validations);

    return valid;
} 


  const ProductUpdate=(e)=>{
    e.preventDefault();


    if(validateForm()){

      if(isNumber(Number(product.price))){
   productService.editProduct(product).then((res)=>{
    setMsg("product updated successfully!!");
    
    navigate("/");

   }).catch((error)=>{
    console.log(error);
   });
  }
}
  };




  return (
    <>
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-header fs-3 text-center'>
              Update Product
            </div>
            {msg && <p className='fs-4 text-center text-success'>{msg}</p>}

            <div className='card-body'>
              <form onSubmit={(e)=>ProductUpdate(e)}>

                <div className="mb-3">
                  <label >Enter Product Name</label>
                  <input type="text" name='productName' className={`form-control ${validations.productName ? 'is-invalid':''}`} onChange={(e)=>handleChange(e)} value={product.productName}/>
                  {validations.productName && <div className='invalid-feedback'>{validations.productName}</div>}
                </div>

                <div className="mb-3">
                  <label >Enter Description</label>
                  <input type="text" name='description' className={`form-control ${validations.description ? 'is-invalid':''}`} onChange={(e)=>handleChange(e)} value={product.description}/>
                  {validations.description && <div className='invalid-feedback'>{validations.description}</div>}
                </div>

                <div className="mb-3">
                  <label >Enter Price</label>
                  <input type="text" name='price' className={`form-control ${validations.price ? 'is-invalid':''}`} onChange={(e)=>handleChange(e)} value={product.price}/>
                  {validations.price && <div className='invalid-feedback'>{validations.price}</div>}
                </div>

                <div className="mb-3">
                  <label >Enter Status</label>
                  <input type="text" name='status' className={`form-control ${validations.status ? 'is-invalid':''}`} onChange={(e)=>handleChange(e)} value={product.status}/>
                  {validations.status && <div className='invalid-feedback'>{validations.status}</div>}
                </div>

                <button className="btn btn-primary col-md-12">Update</button>


              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
    </>
  )
  
}
