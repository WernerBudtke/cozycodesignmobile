import axios from "axios"

const adminUsersActions = {
  getUsers: () => {
    return async (dispatch) => {
      try {
        let response = await axios.get("https://cozydeco.herokuapp.com/api/users", {withCredentials: true})
        if (!response.data.success) {
          return response.data
        }
        dispatch({ type: "GET_USERS", payload: response.data.response })
        return {success: true, response: response.data.response}
      } catch (error) {
        return {success: false, response: error.message}
      }
    }
  },
  manageAdmin: (id, token, action) => {
    return async () => {
      try {
        let response = await axios.put("https://cozydeco.herokuapp.com/admin/manage", {userToChange: id, actionToDo: !action}, {
          headers: {
            Authorization: 'Bearer ' +  token
          },
          withCredentials: true
        })
        if (response.data.success) {
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default adminUsersActions
