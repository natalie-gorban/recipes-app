import { loginReducer, signupReducer } from '../reducers/auth.reducer'

export default function rootReducer(state = {}, action) {
  return {
    login: loginReducer(state.login, action),
    signup: signupReducer(state.signup, action)
  }
}
