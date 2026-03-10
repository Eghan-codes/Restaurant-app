import { menuArray } from "./data.js";

const itemDisplay = document.getElementById('container')
const ordersContainer = document.getElementById('orders')
const orderList = document.getElementById('order-list')
const orderTotal = document.getElementById('total')
const orderBtn = document.getElementById('order-btn')
const paymentModal = document.getElementById('payment-modal')
const payBtn = document.getElementById('pay-btn')
const orderMsg = document.getElementById('order-message')
const paymentDetails = document.getElementById('payment-details')

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
    // This event checks whether an item is removed from the list of arrOfOrders
    if(e.target.id){
        handleRemoveItem(e.target.id)
    }
    // This event checks whether the complete order btn is clicked
    if(e.target.id === 'order-btn'){
        console.log(e.target.id)
        paymentModal.style.display = 'block'
    }

    if(e.target.id === 'pay-btn'){
        e.preventDefault()
        ordersContainer.style.display = 'none'
        paymentModal.style.display = 'none'
        const paymentModalData = new FormData(paymentDetails)
        console.log(paymentModalData)
        const name = paymentModalData.get('Username')
        console.log(name)
        orderMsg.textContent = `${name} your order is on the way!`
    }
})

// This function adds an item, performs calculation and displays the items
function handleAddItem(itemId){
    let html = ``
    arrOfOrders.push(menuArray[itemId])
    // include the index of each order so removals target the correct slot
    arrOfOrders.forEach(function(item){
        html += `
            <div>
                <p>${item.name}</p>
                <button id='${item.id}'>remove</button>
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
function handleRemoveItem(index){
    // remove the specific order at the given array position
    arrOfOrders.splice(index, 1)

    let html = ``
    arrOfOrders.forEach(function(item){
        html += ` <div>
                <p>${item.name}</p>
                <button id='${item.id}'>remove</button>
                <span>$${item.price}</span>
            </div>`
    })

    if(arrOfOrders.length > 0){
        const totalPrice = arrOfOrders.reduce(function(sum, item){
            return sum + item.price
        }, 0)
        orderList.innerHTML = html
        orderTotal.innerHTML = `Total price: $${totalPrice}`
    }
    else{
        // ordersContainer.style.display = 'none'
        orderTotal.innerHTML = `Total price: $0`
    }
}
