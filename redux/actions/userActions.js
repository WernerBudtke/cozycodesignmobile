import axios from "axios"

const userActions = {
  signUp: (user) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "https://cozydeco.herokuapp.com/api/user/register",
          user,
          { withCredentials: true }
        )
        if (!response.data.success) {
          return response.data
        }
        dispatch({ type: "LOG_IN_USER", payload: response.data.response })
        return { success: true, response: response.data.response }
      } catch (error) {
        return { success: false, response: error.message }
      }
    }
  },
  logFromSession: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get(
          "https://cozydeco.herokuapp.com/api/user/validate",
          { withCredentials: true }
        )
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({ type: "LOG_IN_USER", payload: response.data.response })
      } catch (error) {
        dispatch({ type: "LOG_OUT" })
        await axios.get("https://cozydeco.herokuapp.com/api/user/logout")
      }
    }
  },
  logIn: (user) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "https://cozydeco.herokuapp.com/api/user/login",
          user,
          { withCredentials: true }
        )
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({ type: "LOG_IN_USER", payload: response.data.response })
        return { success: true, response: response.data.response }
      } catch (error) {
        return { success: false, response: error.message }
      }
    }
  },
  logOut: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get(
          "https://cozydeco.herokuapp.com/api/user/logout",
          { withCredentials: true }
        )
        if (!response.data.success) throw new Error(response.data.response)
        dispatch({ type: "LOG_OUT" })
      } catch (error) {
        console.log(error)
      }
    }
  },
  manageUser: (obj) => {
    return async (dispatch) => {
      try {
        let response = await axios.put(
          "https://cozydeco.herokuapp.com/api/user/manage",
          { ...obj },
          { withCredentials: true }
        )
        if (!response.data.success) throw new Error(response.data.response)
        return { success: true }
      } catch (error) {
        return { success: false }
      }
    }
  },
}

export default userActions
