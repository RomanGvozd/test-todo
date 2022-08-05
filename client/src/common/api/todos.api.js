import axios from "axios";

export const api = axios.create({
    baseURL: "/api/todos",
    headers: {
        "Content-Type": "application/json",
    },
})

export const getTodos= () => {
    return api.get('/')
}

export const addTodo = (formValues) => {
    return api.post("/", {formValues})
}

export const updateTodo = (data) => {
    return api.put(`/update/` + data._id, data)
}

export const deleteTodo = (id) => {
    return api.delete(`/${id}`)
}

export const deleteTodoAll = () => {
    return api.delete(`/all`)
}