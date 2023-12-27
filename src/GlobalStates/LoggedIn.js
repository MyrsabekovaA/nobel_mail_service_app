import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkToken = createAsyncThunk(
  "LoggedIn/checkToken",
  async ({token, user}, thunkApi) => {
    console.log(token, user)
    let response = await fetch("http://52.59.202.2:3000/api/auth/current?"
    + new URLSearchParams(user), {
      method: "GET",
      "headers": {
          Authorization: `Bearer ${token}`,
      }
    })
    if (await response.status===200) {
      return await response.json()
    } else {
      return await Promise.reject()
    }
  }
)
export const logOut = createAsyncThunk(
  "LoggedIn/logOut",
  async ({token, user}, thunkApi) => {
    const response = await fetch("http://52.59.202.2:3000/api/auth/logout", {
      method: "POST",
      headers: {
        token
      },
      body: {user}
    })
    return await response.json()
  }
)
const unsetCredits = (state, action)=>{
  localStorage.setItem("token", "")
  state.value = false
  state.token = ""
  state.name= null
  state.email= null
  localStorage.setItem("token", "")
  localStorage.setItem("email", "")
  localStorage.setItem("name", "")
}

const isLoggedInSlice = createSlice({
    name: "LoggedIn",
    initialState: {
      value: false,
      token: localStorage.getItem("token"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      lastRoute: "/home",
      checkingStatus: "fulfilled"
    },
    reducers: {
      setTrueLogIn: (state, action) => {
        state.value = true;
      },
      setFalseLogIn: (state, action) => {
        state.value = false
      },
      toggleLogIn: (state, action)=> {
        state.value = !state.value
      },
      setName: (state, action)=> {
        state.name = action.payload.name
        localStorage.setItem("name", action.payload.name)
      },
      setEmail: (state, action)=> {
        state.email = action.payload.email
        localStorage.setItem("email", action.payload.email)
      },
      setToken: (state, action)=> {
        state.token = action.payload.token
        localStorage.setItem("token", action.payload.token)
      },
      setLastRoute: (state, action) => {
        state.lastRoute = action.payload.route
        localStorage.setItem("lastRoute", action.payload.route)
      }
    },
    extraReducers:{
      [checkToken.rejected]: (state, action)=>{
        state.checkingStatus = "rejected"
        unsetCredits(state,action)
      },
      [checkToken.pending]: (state, action)=>{
        state.checkingStatus = "pending"
      },
      [checkToken.fulfilled]:(state, action)=>{
        state.value = true
        state.checkingStatus = "fullfilled"
        console.log(1)
      }, 
      [logOut.fulfilled]:(state,action)=>{
        console.log("Logout response:", action.payload);
        unsetCredits(state, action)
      }
    }
});

export const isLoggedInActions = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;