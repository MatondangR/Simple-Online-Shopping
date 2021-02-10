import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrders, updateOrder, deleteOrder } from '../actions/orderActions'
import { FaEdit, FaPrint, FaSearch, FaTrash } from 'react-icons/fa'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import OrderEditScreen from './OrderEditScreen'
import Pagination from '../components/Pagination'

const OrderScreen = () => {
  const [mobile, setMobile] = useState('')
  const [paidAmount, setPaidAmount] = useState(0.0)
  const [discountAmount, setDiscountAmount] = useState(0.0)
  const [totalPrice, setTotalPrice] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { orders, error, loading } = orderList

  const orderUpdate = useSelector((state) => state.orderUpdate)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = orderUpdate

  const orderDelete = useSelector((state) => state.orderDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = orderDelete
  //   Calculate prices
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const formCleanHandler = () => {
    setMobile('')
    setPaidAmount(0.0)
    setDiscountAmount(0.0)
    setTotalPrice([])
  }

  useEffect(() => {
    dispatch(getOrders())
    if (successDelete || successUpdate) {
      formCleanHandler()
    }
  }, [dispatch, successDelete, successUpdate])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteOrder(id))))
  }

  const editHandler = (e) => {
    setMobile(e.mobile)
    setPaidAmount(e.paidAmount)
    setDiscountAmount(e.discountAmount)
    setTotalPrice(e.orderItems)
    setOrderId(e._id)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      updateOrder({
        mobile,
        paidAmount,
        discountAmount,
        _id: orderId,
      })
    )
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filterOrder =
    orders && orders.filter((ord) => ord.mobile.includes(search))

  const currentItems =
    filterOrder && filterOrder.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = orders && Math.ceil(orders.length / itemsPerPage)

  return (
    <>
      {successDelete && (
        <Message variant='success'>Order Deleted Successfully</Message>
      )}
      {loadingDelete ? (
        <Loader />
      ) : (
        errorDelete && <Message variant='danger'>{errorDelete}</Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <h1 className='fs-6 text-light'>Orders</h1>

          <div className='input-group mb-3'>
            <input
              type='number'
              className='form-control rounded-pill shadow'
              placeholder='Search by mobile number'
              name='search'
              min='0'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-describedby='basic-addon2'
            />
          </div>

          <div className='table-responsive'>
            <table className='table table-sm hover bordered striped text-light'>
              <thead>
                <tr>
                  <th>ORDER#</th>
                  <th>MOBILE</th>
                  <th>DISCOUNT</th>
                  <th>PAID AMOUNT</th>
                  <th>BALANCE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((order) => (
                    <tr
                      key={order._id}
                      style={{
                        color: `${
                          order.totalPrice -
                            order.paidAmount -
                            order.discountAmount !==
                            0 && 'red'
                        }`,
                      }}
                    >
                      <td>{order._id}</td>
                      <td>{order.mobile}</td>
                      <td>${order.discountAmount}</td>
                      <td>${order.paidAmount}</td>
                      <td>
                        $
                        {addDecimal(
                          order.totalPrice -
                            order.paidAmount -
                            order.discountAmount
                        )}
                      </td>
                      <td>
                        <button
                          type='button'
                          onClick={() => deleteHandler(order._id)}
                          className='btn btn-danger btn-sm'
                        >
                          <FaTrash />
                        </button>

                        <button
                          type='button'
                          data-bs-toggle='modal'
                          data-bs-target='#editOrderModal'
                          className='btn btn-info btn-sm'
                          onClick={() => editHandler(order)}
                        >
                          <FaEdit />
                        </button>

                        <Link
                          to={`/order/${order._id}`}
                          className='btn btn-success btn-sm'
                        >
                          <FaPrint />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className='d-flex justify-content-center'>
        <Pagination
          setCurrentPage={setCurrentPage}
          totalItems={totalItems}
          arrayLength={orders && orders.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <OrderEditScreen
        submitHandler={submitHandler}
        mobile={mobile}
        discountAmount={discountAmount}
        paidAmount={paidAmount}
        orderItems={totalPrice}
        setMobile={setMobile}
        setDiscountAmount={setDiscountAmount}
        setPaidAmount={setPaidAmount}
        errorUpdate={errorUpdate}
        loadingUpdate={loadingUpdate}
        formCleanHandler={formCleanHandler}
        successUpdate={successUpdate}
      />
    </>
  )
}

export default OrderScreen
