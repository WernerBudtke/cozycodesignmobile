import { combineReducers } from "redux"
import usersReducer from "./usersReducer"
import productsReducer from "./productsReducer"
import cartReducer from "./cartReducer"

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
  cart: cartReducer,
})

export default rootReducer
