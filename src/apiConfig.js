let apiUrl
const apiUrls = {
  // add the production url
  production: 'https://auto-care-hub-backend-ccc116e343ab.herokuapp.com',
  development: 'http://localhost:8000'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl