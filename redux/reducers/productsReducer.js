const productsReducer = (
  state = { products: [], productsCategory: [], product: {} },
  action
) => {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        productsCategory: action.payload.filter(product => product.stock > 0)
      }

    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      }

    case "FIND_A_PRODUCT":
      return {
        ...state,
        product: state.products.find((obj) => obj._id === action.payload),
      }
    case "GET_ALL":
      return {
        ...state,
        productsCategory: state.products.filter((product) => product.stock > 0)
      }
      case "GET_BY_CATEGORY":
        return {
          ...state,
          productsCategory: action.payload !== 'Sale' 
          ? state.products.filter((product) =>  product.category === action.payload && product.stock > 0)
          : state.products.filter((product) =>  product.discount !== 0 && product.stock > 0)
        }
    default:
      return state
    }
}
export default productsReducer
