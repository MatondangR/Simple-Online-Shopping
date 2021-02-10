import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/productActions'
import { createOrder } from '../actions/orderActions'
import { FaTrash, FaCheckCircle } from 'react-icons/fa'
import placeHolder from '../no-image-available.webp'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const [mobile, setMobile] = useState('')
  const [paidAmount, setPaidAmount] = useState(0.0)
  const [discountAmount, setDiscountAmount] = useState(0.0)

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      if (localStorage.cartItems) {
        localStorage.removeItem('cartItems')
      }
    }

    if (error) {
      if (localStorage.cartItems) {
        localStorage.removeItem('cartItems')
      }
    }

    // eslint-disable-next-line
  }, [history, success, error])

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCurrentHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)

  const submitHandler = (e) => {
    e.preventDefault()
    const order = {
      mobile,
      paidAmount,
      discountAmount,
      totalPrice,
      orderItems: cartItems,
    }

    dispatch(createOrder(order))
  }
  // console.log(cartItems)

  return (
    <div>
      <h6 className='fw-light fs-3 text-center text-light'>Shopping Cart</h6>
      {cartItems.length === 0 ? (
        <Message variant='info'>
          Your cart is empty <Link to='/'> Go Back</Link>
        </Message>
      ) : (
        <div className='row'>
          <div className='col-lg-8 col-md-8 col-sm-12 col-12'>
            {cartItems.map((item) => (
              <div key={item.product}>
                <div className='card mb-3'>
                  <div className='row g-0'>
                    <div className='col-md-4  text-center'>
                      <img
                        src={item.image ? item.image.imagePath : placeHolder}
                        alt=''
                        className='img-card-top img-fluid w-50'
                      />
                    </div>
                    <div className='col-md-8 my-auto'>
                      <div className='card-body '>
                        <div className='row'>
                          <div className='col'>
                            <h2 className='fw-light fs-6 text-primary'>
                              {item.name}
                            </h2>
                          </div>
                          <div className='col'>
                            <span className='text-primary fw-bold'>
                              ${item.price}.00
                            </span>
                          </div>
                          <div className='col'>
                            <select
                              className='btn border-1 border-success btn-sm shadow-none mx-1'
                              name='qty'
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              <option value='0'>QTY</option>
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className='col'>
                            <button
                              type='button'
                              className='btn btn-danger btn-sm '
                              onClick={() =>
                                removeFromCurrentHandler(item.product)
                              }
                            >
                              <FaTrash /> Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='col-lg-4 col-md-4 col-sm-12 col-12 pt-2'>
            <ul className='list-group list-group-flush pt-1'>
              <li className='list-group-item fw-light fs-5'>
                ORDER SUMMARY <br />
              </li>
              {error && (
                <li className='list-group-item'>
                  <Message variant='danger'>{error}</Message>
                </li>
              )}

              <li className='list-group-item'>
                <div className='row'>
                  <div className='col'>Total</div>
                  <div className='col'>${totalPrice}</div>
                </div>
              </li>
              <li className='list-group-item'>
                <form onSubmit={(e) => submitHandler(e)}>
                  <label htmlFor='mobile'>Mobile</label>
                  <input
                    type='number'
                    step='0.001'
                    className='form-control'
                    placeholder='615665566'
                    min='0'
                    name='mobile'
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                  <label htmlFor='discountAmount'>Discount Amount</label>
                  <input
                    name='discountAmount'
                    type='number'
                    step='0.001'
                    min='0'
                    max={totalPrice}
                    className='form-control'
                    placeholder='Enter a discount amount'
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                  />

                  <label htmlFor='paidAmount'>Paid Amount</label>
                  <input
                    name='paidAmount'
                    type='number'
                    step='0.001'
                    min='0'
                    max={totalPrice}
                    className='form-control'
                    placeholder='Enter a paid amount'
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                  />

                  <button
                    type='submit'
                    className='btn btn-success btn-sm float-end mt-1'
                    disabled={totalPrice <= 0}
                  >
                    <FaCheckCircle /> Recept
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartScreen
