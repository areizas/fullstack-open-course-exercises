import axios from "axios";

const baseUrl = "/api/persons"

const getAll = () => {
    const respond = axios.get(baseUrl)
    return respond.then( respond => respond.data)
}

const create = (newPerson) => {
    const response = axios.post(baseUrl,newPerson)
    return response.then(response => response.data)
}

const update = (id,newPerson) => {
    const response = axios.put(`${baseUrl}/${id}`,newPerson)
    return response.then(response => response.data)
}

const remove = (id) => {
    const response = axios.delete(`${baseUrl}/${id}`)
    return response.then(response => response.data)
}

export default {getAll, create, update, remove}