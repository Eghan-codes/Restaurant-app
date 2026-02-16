import { menuArray } from "./data.js";

const itemDisplay = document.getElementById('container')
const ordersContainer = document.getElementById('orders')
const orderList = document.getElementById('order-list')
const orderTotal = document.getElementById('total')
const orderBtn = document.getElementById('order-btn')
const paymentModal = document.getElementById('payment-modal')

let arrOfOrders = []
// This function only displays our items/product to user in the web browser.
function displayItems(){
    let html = ``
    menuArray.forEach(function(item){
        html+= `
            <div class='card-item'>
                <span>${item.emoji}</span>
                <div>
                    <h2>${item.name}</h2>
                    <p>${item.ingredients}</p>
                    <p>$${item.price}</p>
                </div>
                <button data-item='${item.id}'>+</button>
            </div>
        `
    })
    return itemDisplay.innerHTML = html
}
displayItems()

// Events in the document
document.addEventListener('click', function(e){
    if(e.target.dataset.item){
        handleAddItem(e.target.dataset.item)
    }

    if(e.target.id){
        handleRemoveItem(e.target.id)
    }

    if(e.target.id){
        console.log(e.target.id)
        paymentModal.style.display = 'block'
    }
})

// This function adds an item, performs calculation and displays the items
function handleAddItem(itemId){
    let html = ``
    arrOfOrders.push(menuArray[itemId])
    arrOfOrders.map(function(item){
        return html += `
            <div>
                <p>${item.name}</p>
                <button id = '${item.id}'>remove</button>
                <span>$${item.price}</span>
            </div>
        `
    })
    ordersContainer.style.display = 'block'
    console.log(arrOfOrders)
    orderList.innerHTML = html

    const prices = arrOfOrders.map(function(item){
        return item.price
    })

    const totalPrice = prices.reduce(function(total, currentPrice){
        return total + currentPrice
    })
    orderTotal.innerHTML = `<p>Total Price: $${totalPrice}</p>`
}

// console.log(arrOfOrders)

// This function removes item, performs calculation and displays items
function handleRemoveItem(itemId){
    let html = ``
    const newItemId = Number(itemId)
    const newOrdersObj = arrOfOrders.findIndex(function(order){
        return order.id === newItemId
    })

    if(newOrdersObj !== -1){
        arrOfOrders.splice(newOrdersObj,1)

    }

    arrOfOrders.forEach(function(item){
        html += ` <div>
                <p>${item.name}</p>
                <button id = '${item.id}'>remove</button>
                <span>$${item.price}</span>
            </div>`
    })
    if(arrOfOrders.length > 0){
        const price = arrOfOrders.map(item => item.price)
        
        const totalPrice = price.reduce((total,currentElement) => {
            return total + currentElement
        })
        
        orderList.innerHTML=html
        orderTotal.innerHTML = `Total price: $${totalPrice}`
    }
    else{
        ordersContainer.style.display = 'none'
        orderTotal.innerHTML = `Total price: $0`
    }
}
