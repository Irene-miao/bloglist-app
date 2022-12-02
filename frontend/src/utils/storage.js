const storageKey = 'loggedBlogappUser'

const userStorage = {
  saveUser : ( user ) => {
    localStorage.setItem(storageKey, JSON.stringify(user))
  },

  loadUser : () => {
    JSON.parse(localStorage.getItem(storageKey))
  },

  logoutUser : () => {
    localStorage.removeItem(storageKey)
  }


}

export default userStorage