import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrders } from '../actions/orderActions'
import { listProduct } from '../actions/productActions'

const ReportScreen = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const {
    products,
    error: errorProducts,
    loading: loadingProducts,
  } = productList

  const orderList = useSelector((state) => state.orderList)
  const { orders, error: errorOrders, loading: loadingOrders } = orderList

  useEffect(() => {
    dispatch(listProduct())
    dispatch(getOrders())
  }, [dispatch, from, to])

  const filteredOrders =
    orders &&
    orders.filter((order) => order.createdAt >= from && order.createdAt <= to)

  const noOfOrders = filteredOrders && filteredOrders.length

  const noOfSubTotalOrders =
    filteredOrders &&
    filteredOrders.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)

  const noOfCostPriceArray =
    filteredOrders &&
    filteredOrders.map((filter) =>
      filter.orderItems
        .reduce((acc, item) => acc + item.costPrice * item.qty, 0)
        .toFixed(2)
    )

  const noOfDiscountOrders =
    filteredOrders &&
    filteredOrders
      .reduce((acc, item) => acc + item.discountAmount, 0)
      .toFixed(2)

  const noOfPaidAmountOrders =
    filteredOrders &&
    filteredOrders.reduce((acc, item) => acc + item.paidAmount, 0).toFixed(2)

  const noOfTotalOrders =
    filteredOrders &&
    filteredOrders.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)

  const totalProductsStockPrice =
    products &&
    products
      .reduce((acc, item) => acc + item.countInStock * item.costPrice, 0)
      .toFixed(2)

  const totalProductsStock =
    products && products.filter((item) => item.countInStock > 0)

  const totalProductsOutOfStock =
    products && products.filter((item) => item.countInStock === 0)

  const noOfCostPrice = noOfCostPriceArray
    .reduce((acc, item) => Number(acc) + Number(item), 0)
    .toFixed(2)

  const totalProfit = noOfSubTotalOrders - noOfDiscountOrders - noOfCostPrice

  return (
    <>
      {loadingOrders || loadingProducts ? (
        <Loader />
      ) : errorOrders || errorProducts ? (
        <Message variant='danger'>{(errorProducts, errorOrders)}</Message>
      ) : (
        <>
          <div className='row text-light'>
            <div className='mx-auto col-lg-8 col-md-8 col-sm-12 col-12'>
              <div className='row'>
                <div className='col-md-6 col-sm-12 col-12'>
                  <label htmlFor='from'>From</label>
                  <input
                    type='date'
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    name='from'
                    className='form-control'
                  />
                </div>
                <div className='col-md-6 col-sm-12 col-12'>
                  <label htmlFor='to'>To</label>
                  <input
                    type='date'
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    name='to'
                    className='form-control'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='mx-auto col-lg-8 col-md-8 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header bg-secondary'>Transactions</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    Transactions: {noOfOrders}
                  </li>
                  <li className='list-group-item'>
                    Subtotal Transactions: ${noOfSubTotalOrders}
                  </li>
                  <li className='list-group-item'>
                    Discount Transactions: ${noOfDiscountOrders}
                  </li>
                  <li className='list-group-item'>
                    Paid Amount Transactions: ${noOfPaidAmountOrders}
                  </li>
                  <li className='list-group-item'>
                    Balance / Loans: $
                    {noOfTotalOrders -
                      noOfPaidAmountOrders -
                      noOfDiscountOrders}
                  </li>
                  <li className='list-group-item'>Profit: ${totalProfit}</li>
                </ul>
              </div>
            </div>

            <div className='mx-auto col-lg-8 col-md-8 col-sm-12 col-12'>
              <div className='card'>
                <div className='card-header bg-secondary'>Products</div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>
                    Products In Out Of Stock: {totalProductsOutOfStock.length}
                  </li>
                  <li className='list-group-item'>
                    Products In Stock: {totalProductsStock.length}
                  </li>
                  <li className='list-group-item'>
                    Products In Stock Price: ${totalProductsStockPrice}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ReportScreen
