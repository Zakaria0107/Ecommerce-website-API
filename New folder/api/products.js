let products = () => {
    return axios.get("http://localhost:3001/api/product")
    .then(res =>
        res.data
    )
}

export {products}