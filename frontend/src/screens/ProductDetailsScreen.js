import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProduct } from '../actions/productActions'
import { FaShoppingCart } from 'react-icons/fa'

const ProductDetailsScreen = ({ match, history }) => {
  const productId = match.params.id
  const [qty, setQty] = useState(1)
  const [totalPrice, setTotalPrice] = useState(1)

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, error, loading } = productList

  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])

  const productsObj =
    products && products.filter((product) => product._id === productId)
  const product = productsObj && productsObj[0]

  useEffect(() => {
    product && setTotalPrice(product && product.price * qty)
  }, [qty, product])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <h6 className='fw-light fs-3 text-center'>Product Details</h6>
      {loading || !product ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='row'>
          <div className='col-lg-6 col-md-8 col-sm-10 col-12 mx-auto'>
            <div className='card border-0'>
              <div className='card-body'>
                <div className='card-title text-center fs-6'>
                  {product.name}
                </div>
                <div className='card-text text-center'>
                  <div className='btn-group text-center'>
                    <button
                      className='btn border-1 border-success btn-sm'
                      disabled
                    >
                      ${totalPrice}
                    </button>
                    <select
                      className='btn border-1 border-success btn-sm shadow-none mx-1'
                      name='qty'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      <option value='0' disabled='disabled'>
                        QTY
                      </option>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className='btn btn-success btn-sm'
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      <FaShoppingCart /> Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductDetailsScreen
