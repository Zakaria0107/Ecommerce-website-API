document.querySelector(".navbar .menu").onclick = () => {
    document.querySelector(".navbar .list_item").classList.toggle("show")
}
window.onscroll = () => {
    if(window.scrollY) document.querySelector(".navbar").classList.add("scrolled")
    else document.querySelector(".navbar").classList.remove("scrolled")
}

document.querySelector("#cardButton").onclick = () => {
    document.querySelector("#basket").classList.toggle("show")
}
let allOrders = JSON.parse(localStorage.getItem("orders"))
if(!allOrders) allOrders= []
const setOrdersInTheBox = () => {
    let total = 0 
    allOrders.forEach(elt => {
        total += elt[0].price * elt[1]
    });
    document.querySelector("#cardButton span").innerHTML = allOrders.length
    document.querySelector("#basket .box").innerHTML = `   
    <div class="topButtom">
    <h2>cart (${allOrders.length})</h2>
    <button class="btn button_3" id="removeAll" >Remove all</button>
    </div>
    ${allOrders.map((elt , index) => `
        <div class="product_card">
            <img src="http://localhost:3001/UPLOADS/${elt[0].photos[0].filename}" alt="">
            <div>
                <h3>${elt[0].name.slice(0 , 10)}</h3>
                <p>$ ${elt[0].price}<span class="number">x${elt[1]}</span></p>
            </div>
            <button class="btn button_2" onClick="removeOne(${index})">-</button>
        </div>
    `)}
    <div class="topButtom">
        <p>total</p>
        <h2>$${total}</h2>
    </div>
    <a href="./checkout.php"><button class="btn button_1">checkout</button></a>
`

}
setOrdersInTheBox()
function removeOne(i) {
    let all = allOrders
    allOrders = []
    all.forEach((elt , index) => {
        if(index != i ) allOrders.push(elt)
    })
    localStorage.setItem("orders" , JSON.stringify(allOrders))
    setOrdersInTheBox()
}
document.querySelector("#removeAll").onclick = () => {
    allOrders = []
    total = 0 
    localStorage.setItem('orders' , JSON.stringify(allOrders))
    setOrdersInTheBox()
}

document.onclick = () => {
    if(event.target.isEqualNode(document.querySelector("#basket")) || event.target.isEqualNode(document.querySelector(".navbar .container")) ) {
        document.querySelector("#basket").classList.remove('show');
    }
}