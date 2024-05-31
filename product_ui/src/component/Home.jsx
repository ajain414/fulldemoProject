import React, { useEffect, useState } from 'react'
import productService from '../service/product.service';
import { Link } from 'react-router-dom'
import '../App.css';
const Home = () => {
  
  const [productList,setProductList]=useState([]);
  const [msg,setMsg]=useState("");
  useEffect(()=>{
    init();
  },[]);

  const init=()=>{
    productService.getAllProduct().then((res)=>{
      // console.log(res.data);
      setProductList(res.data);
    }).catch((error)=>{
      console.log(error);
    });
  };


  const deleteProduct=(id)=>{
    productService.deleteProduct(id).then((res)=>{
      // console.log(id);
      setMsg("Delete Successfully");
      init();
    }).catch((error)=>{
      console.log(error);
    })
  }
  
  return (
    <>
    {(productList.length>0) ?
    <div className='container mt-3'>
      <div className="row">
        <div className="col-md-12">
          <div className="card">

            <div className="card-header fs-3 text-center">All Product List</div>
            {msg && <p className='fs-4 text-center text-success'>{msg}</p>}
            <div className="card-body">
            <div class="table-responsive">
            <table class="table ">
                <thead>
                  <tr className=''>
                    <th scope="col">Serial No.</th>
                    <th scope="col">ProductName</th>
                    <th scope="col">Desription</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">edit Action</th>
                    <th scope="col">delete Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    

                    productList.map((p,num)=>{
                      return (<tr>
                      <td>{num+1}</td>
                      <td>{p.productName}</td>
                      <td>{p.description}</td>
                      <td>{p.price}</td>
                      <td>{p.status}</td>
                      <td><Link to={'editProduct/'+p.id} className="btn btn-sm btn-primary">Edit</Link></td>
                      <td><button onClick={()=>deleteProduct(p.id)} className="btn btn-sm btn-danger ms-1">Delete</button></td>
                    </tr>)
                    })}
                  
                  
                  
                  
                </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    :<h1 className="card-header fs-3 text-center">No product added</h1>}
    </>

  )
}

export default Home

