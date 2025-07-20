import React from 'react'
import { useParams } from 'react-router-dom'
function ProductDetail() {
  const {id} = useParams()
  return (
    <div className=''>
      <h1 className="text-2xl font-bold text-white">Product Details for ID: {id}</h1>
    </div>
  )
}

export default ProductDetail