import mongoose from 'mongoose'

const productScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      imageName: {
        type: String,
      },
      imagePath: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

const ProductModel = mongoose.model('Product', productScheme)
export default ProductModel
