import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
	"Content-Type": "application/json"
    }
})


const postData = (data={message:"Hello world"}) => {
    api.post('/', data)
}


postData()
