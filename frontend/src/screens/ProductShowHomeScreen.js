import React from 'react'
import { FaInfo } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import placeHolder from '../no-image-available.webp'

const ProductShowHomeScreen = ({ currentItems }) => {
  return (
    <div className='row'>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item._id} className='col-lg-2 col-md-3 col-sm-6 col-12'>
            <div className='card text-center'>
              <Link to={`/cart/${item._id}`}>
                <img
                  src={item.image ? item.image.imagePath : placeHolder}
                  alt='product image'
                  className='img-card-top img-fluid'
                />{' '}
              </Link>
              <div className='card-body'>
                <div className='card-title uppercase'>
                  <Link to={`/cart/${item._id}`}>{item.name}</Link>
                </div>
                <div className='card-text btn-group'>
                  <button className='btn btn-secondary btn-sm mr-1'>
                    ${item.price}
                  </button>
                  <Link to={`/cart/${item._id}`}>
                    <button className='btn btn-primary btn-sm ml-1'>
                      <FaInfo /> Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ProductShowHomeScreen
