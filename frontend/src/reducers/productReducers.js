import {
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from '../constants/productConstants'
import { CLEAR_ALERTS } from '../constants/userConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      }
    case PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload,
      }
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      }
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}
