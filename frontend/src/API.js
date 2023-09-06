import axios from "axios";

export default axios.create({
  // change this for my app
  baseURL: 'http://localhost:8000/api/todos',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})