import AsyncStorage from "@react-native-async-storage/async-storage"

const cartReducer = (state = { products: [] }, action) => {
  let cartLS = null
  switch (action.type) {
    case "ADD_CART_PRODUCT":
      let productExists = state.products.find(
        (obj) => obj.product._id === action.payload.product._id
      )
      cartLS = !productExists
        ? state.products.concat(action.payload)
        : state.products.map((obj) =>
            obj.product._id === action.payload.product._id
              ? { ...obj, quantity: obj.quantity + action.payload.quantity }
              : obj
          )
        const saveLS = async () => {
          await AsyncStorage.setItem("cart", JSON.stringify(cartLS))
        }
        saveLS()
      return {
        products: !productExists
          ? state.products.concat(action.payload)
          : state.products.map((obj) =>
              obj.product._id === action.payload.product._id
                ? { ...obj, quantity: obj.quantity + action.payload.quantity }
                : obj
            ),
      }
    case "DELETE_ONE_CART_PRODUCT":
      cartLS = state.products.filter(
        (obj) => obj.product._id !== action.payload
      )
      const deleteLS = async () => {
        await AsyncStorage.setItem("cart", JSON.stringify(cartLS))
      }
      deleteLS()
      return {
        products: state.products.filter(
          (obj) => obj.product._id !== action.payload
        ),
      }
    case "UPDATE_CART_PRODUCT":
      cartLS = state.products.map((obj) =>
        obj.product._id === action.payload.product._id
          ? { ...obj, quantity: action.payload.quantity }
          : obj
      )
      const updateLS = async () => {
        await AsyncStorage.setItem("cart", JSON.stringify(cartLS))
      }
      updateLS()
      return {
        products: state.products.map((obj) =>
          obj.product._id === action.payload.product._id
            ? { ...obj, quantity: action.payload.quantity }
            : obj
        ),
      }
    case "ADD_CART_LS":
      return {
        products: action.payload,
      }
      case "DELETE_CART":
        const clearLS = async () => {
          await AsyncStorage.clear()
        }
        clearLS()
        return {
          products: [],
        }
    default:
      return state
  }
}
export default cartReducer
