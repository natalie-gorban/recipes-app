let user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      }
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      }
    case 'LOGIN_FAILURE':
      return {}
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

export function signupReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
      return {
        signingIn: true,
        user: action.user
      }
    case 'SIGNUP_SUCCESS':
      return {
        signedIn: true,
        user: action.user
      }
    case 'SIGNUP_FAILURE':
      return {
        error_message: action.error_message,
      }
    default:
      return state
  }
}
