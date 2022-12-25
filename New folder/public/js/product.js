import { products } from "../../api/products"
document.querySelector(".navbar").style.backgroundColor  = '#000000'
const data = await products()
const id = window.location.search.slice(4)
const product = data.filter(elt => elt._id == id)[0]
const setData = () => {
    document.querySelector('#product_header .product').innerHTML = `
        <div class="image">
        <img src="http://localhost:3001/UPLOADS/${product.photos[0].filename}" alt="">
        </div>
        <div class="content">
            ${product.new?`<h4>new product</h4>`:``}
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <h2>$${product.price}</h2>
            <div class="numberCheck">
                <p id="number">
                    <button class="btn" id="up">+</button>
                    <span>1</span>
                    <button class="btn" id="down">-</button>
                </p>
                <button class="btn button_1" id="addToCard">ADD TO CART</button>
            </div>
        </div>
    `
    document.querySelector('#features .features p').textContent = product.features
    let includes = JSON.parse(product.includes[0])
    
    document.querySelector('#features .inTheBox').innerHTML += includes.map(elt => `
        <p><span>${elt.quantity}x</span>${elt.item}</p>
    `).join("")
    

    document.querySelector('.gallery .container').innerHTML = `
        <div>
            <img src="http://localhost:3001/UPLOADS/${product.photos[1].filename}" alt="">
            <img src="http://localhost:3001/UPLOADS/${product.photos[2].filename}" alt="">
        </div>
        <img src="http://localhost:3001/UPLOADS/${product.photos[3].filename}" alt="">
    `

}
setData()

document.querySelector("#addToCard").onclick = () => {
    let nbr = document.querySelector("#number span").textContent
    let order = [product , nbr]
    let exist = false

    allOrders.forEach((elt , index) => {
        if(elt[0]._id == id){
            allOrders[index][1] = document.querySelector("#number span").textContent
            exist = true
        }
     });
    if(!exist){
        allOrders.push(order)   
    } 
    localStorage.setItem('orders' , JSON.stringify(allOrders))
    setOrdersInTheBox()
}
document.querySelector("#up").onclick = () => {
    document.querySelector("#number span").textContent = parseInt(document.querySelector("#number span").textContent) + 1
}
document.querySelector("#down").onclick = () => {
    if(document.querySelector("#number span").textContent > 1){
        document.querySelector("#number span").textContent = parseInt(document.querySelector("#number span").textContent) - 1
    }
}

