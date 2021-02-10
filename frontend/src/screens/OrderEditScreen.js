import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaCheckCircle } from 'react-icons/fa'

const OrderEditScreen = ({
  formCleanHandler,
  submitHandler,
  successUpdate,
  errorUpdate,
  loadingUpdate,
  loading,
  error,

  mobile,
  discountAmount,
  paidAmount,
  setMobile,
  setDiscountAmount,
  setPaidAmount,
  orderItems,
}) => {
  const totalPrice = orderItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)
  return (
    <div>
      <div
        className='modal fade text-light'
        id='editOrderModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='editOrderModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title text-light' id='editOrderModalLabel'>
                Total Amount: ${totalPrice}
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              {successUpdate && (
                <Message variant='success'>Order Updated Successfully</Message>
              )}
              {loadingUpdate ? (
                <Loader />
              ) : (
                errorUpdate && <Message variant='danger'>{errorUpdate}</Message>
              )}

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <ul className='list-group list-group-flush pt-1'>
                  {error && <Message variant='danger'> {error} </Message>}

                  <form onSubmit={(e) => submitHandler(e)}>
                    <label htmlFor='mobile'>Mobile</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='615665566'
                      min='0'
                      step='0.001'
                      name='mobile'
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                    <label htmlFor='discountAmount'>Discount Amount</label>
                    <input
                      name='discountAmount'
                      type='number'
                      min='0'
                      step='0.001'
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
                      min='0'
                      step='0.001'
                      max={totalPrice}
                      className='form-control'
                      placeholder='Enter a paid amount'
                      value={paidAmount}
                      onChange={(e) => setPaidAmount(e.target.value)}
                    />

                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary btn-sm'
                        data-bs-dismiss='modal'
                        onClick={formCleanHandler}
                      >
                        Close
                      </button>
                      <button type='submit' className='btn btn-primary btn-sm'>
                        <FaCheckCircle /> Recept Update
                      </button>
                    </div>
                  </form>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderEditScreen
