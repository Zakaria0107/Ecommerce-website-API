document.querySelector(".navbar").style.backgroundColor  = '#000000'
const setCheckoutOrders = () => {
    let total = 0 
    allOrders.forEach(elt => {
        total += elt[0].price * elt[1]
    });
    document.querySelector("#checkout_cards").innerHTML += `
        ${allOrders.map(elt => `
            <div class="card">
                <img src="http://localhost:3001/UPLOADS/${elt[0].photos[0].filename}" alt="">
                <div>
                    <h2>${elt[0].name.slice(0 , 10)}</h2>
                    <p>$ ${elt[0].price}</p>
                </div>
                <p>x ${elt[1]}</p>
            </div>
        `).join("")}
        <div class="info">
            <p>total</p>
            <h3>$ ${total}</h3>
        </div>
        <div class="info">
            <p>shipping</p>
            <h3>$ 50</h3>
        </div>
        <div class="info">
            <p>VAT (INCLUDED)</p>
            <h3>$ 1100</h3>
        </div>
        <div class="info">
            <p>GRAND TOTAL</p>
            <h3>$ ${total + 50 + 1100}</h3>
        </div>
        <button class="btn button_1" id="send">continue</button>
    `
}
setCheckoutOrders()

document.querySelector("#send").onclick = () => {
    let info = {
        name : document.querySelector("#name").value , 
        email : document.querySelector("#email").value ,
        phoneNumber : document.querySelector("#phoneNumber").value ,
        address : document.querySelector("#address").value ,
        zipCode : document.querySelector("#zipCode").value ,
        city : document.querySelector("#city").value  , 
        country : document.querySelector("#country").value ,
        orders : JSON.stringify(allOrders)
    }
    axios.post(`http://localhost:3001/api/order/`,info)
        .then(() => {
            swal("Good job!", "", "success").then(() => window.location.reload() )
        })
        .catch( (error) => {
            swal(error.response.data.error);
        });
}

