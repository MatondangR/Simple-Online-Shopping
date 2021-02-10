import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_ALERTS } from '../constants/userConstants'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'
import Moment from 'react-moment'
import moment from 'moment'
import { FaPrint } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'
import logo from '../logo.png'

const OrderDetailsScreen = ({ match }) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'AMIIRA CLASSIC STYLE',
  })

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, error, loading } = orderDetails

  //   Calculate prices
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id))
    dispatch({ type: CLEAR_ALERTS })
    if (localStorage.cartItems) {
      localStorage.removeItem('cartItems')
    }
  }, [match, dispatch])
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='row '>
          <div className='mx-auto col-lg-8 col-md-8 col-sm-12 col-12'>
            <div className='card' ref={componentRef}>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item d-flex justify-content-between'>
                  <Moment format='YYYY-MM-DD'>{moment(order.createdAt)}</Moment>
                  <Moment format='HH:mm:ss'>{moment(order.createdAt)}</Moment>
                </li>
                <li className='list-group-item text-center'>
                  <img src={logo} alt='' style={{ height: '50px' }} />
                </li>
                <div className='cart-body px-3'>
                  <div className='cart-text'>
                    <p className='text-center '>
                      <span className='fw-bold'>Invoice#:</span> {order._id}
                    </p>
                    <p className='text-center'>Customer: {order.mobile}</p>
                    <div
                      className='table-responsive '
                      style={{ fontSize: '0.7rem' }}
                    >
                      <table className='table table-sm hover borderless striped'>
                        <thead>
                          <tr>
                            <th style={{ fontSize: '0.7rem' }}>ITEM</th>
                            <th style={{ fontSize: '0.7rem' }}>QTY</th>
                            <th style={{ fontSize: '0.7rem' }}>PRICE</th>
                            <th style={{ fontSize: '0.7rem' }}>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems.length > 0 &&
                            order.orderItems.map((ord) => (
                              <tr key={ord._id}>
                                <td>{ord.name}</td>
                                <td>{ord.qty}</td>
                                <td>${addDecimal(ord.price)}</td>
                                <td>
                                  ${addDecimal(ord.price * Number(ord.qty))}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan='2'></td>
                            <td className='fw-bold'>Subtotal:</td>
                            <td>${addDecimal(order.totalPrice)}</td>
                          </tr>
                          <tr>
                            <td colSpan='2'></td>
                            <td className='fw-bold'>Discount:</td>
                            <td>${addDecimal(order.discountAmount)}</td>
                          </tr>
                          <tr>
                            <td colSpan='2'></td>
                            <td className='fw-bold'>Total:</td>
                            <td>
                              $
                              {addDecimal(
                                order.totalPrice - order.discountAmount
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan='2'></td>
                            <td className='fw-bold'>Paid Amount:</td>
                            <td>${addDecimal(order.paidAmount)}</td>
                          </tr>
                          <tr>
                            <td colSpan='2'></td>
                            <td className='fw-bold'>Balance:</td>
                            <td>
                              $
                              {addDecimal(
                                order.totalPrice -
                                  order.paidAmount -
                                  order.discountAmount
                              )}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <button
              onClick={handlePrint}
              className='btn btn-success btn-sm form-control'
            >
              <FaPrint /> Print
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderDetailsScreen
