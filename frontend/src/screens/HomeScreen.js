import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProduct } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import Pagination from '../components/Pagination'
import ProductShowHomeScreen from './ProductShowHomeScreen'

const HomeScreen = ({ match }) => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, error, loading } = productList

  useEffect(() => {
    dispatch(listProduct())
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const filterOrder =
    products &&
    products.filter((prod) =>
      prod.name.toLowerCase().includes(search.toLowerCase())
    )

  const currentItems =
    filterOrder && filterOrder.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = products && Math.ceil(products.length / itemsPerPage)

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control rounded-pill shadow'
              placeholder='Search by product name'
              name='search'
              min='0'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-describedby='basic-addon2'
            />
          </div>
          <ProductShowHomeScreen currentItems={currentItems} />
          <div className='d-flex justify-content-center'>
            <Pagination
              setCurrentPage={setCurrentPage}
              totalItems={totalItems}
              arrayLength={products && products.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
