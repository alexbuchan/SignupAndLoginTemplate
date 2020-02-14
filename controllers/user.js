const show_signup_page = (req, res, next) => {
  res.send('Signup!')
}

const show_login_page = (req, res, next) => {
  res.send('Login!')
}

module.exports = {
  show_signup_page,
  show_login_page
};