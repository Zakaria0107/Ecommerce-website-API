import { products } from "../../api/products";
const data = await products()
const category = window.location.search.slice(3)
const setData = () => {
    document.querySelector('#category_header h1').textContent = category
    let bycategory = data.filter(elt => elt.category == category)
    document.querySelector('#category_products .container').innerHTML = bycategory.map(elt => `
        <div class="product">
            <div class="image">
                <img src="http://localhost:3001/UPLOADS/${elt.photos[0].filename}" alt="">
            </div>
            <div class="content">
                ${elt.new?`<h4>new product</h4>`:``}
                <h1>${elt.name}</h1>
                <p>${elt.description}</p>
                <a href="./product?id=${elt._id}"><button class="btn button_1">see product</button></a>
            </div>
        </div>
    `)
}
setData()