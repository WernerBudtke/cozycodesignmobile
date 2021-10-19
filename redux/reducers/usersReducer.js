const usersReducer = (state = {user:null}, action) => {
    switch (action.type) {
      case "LOG_IN_USER":
        return {
         user:{...action.payload}
        }
      case "LOG_OUT": 
      return {
        user:null
      }
      default:
        return state
    }
  }
  export default usersReducer
  
