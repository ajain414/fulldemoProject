export default function Validation(product)
{
  const error={};
  const price_pattern =/^\d+$/;
  if(product.productName==="")
    error.productName="Name is Required";
  if(product.description==="")
    error.description="description is Required";
  if(product.price==="")
    error.price="price is Required";
  else if(!price_pattern.test(product.price))
    {
        error.price="Please enter valid Price value";
    }
  if(product.status==="")
        error.status="status is Required";  
  return [error,Object.keys(error).length];

}