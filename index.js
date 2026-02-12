import { menuArray } from "./data.js";

const itemDisplay = document.getElementById('container')
const ordersContainer = document.getElementById('orders')
const orderList = document.getElementById('order-list')
const orderTotal = document.getElementById('total')
console.log(menuArray)
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

    if(e.target.dataset.remove){
        handleRemoveItem(e.target.dataset.remove)
    }
})

// This function adds an item, performs calculation and displays the items
function handleAddItem(itemId){
    let html = ``
    arrOfOrders.push(menuArray[itemId])
    arrOfOrders.forEach(function(item){
        html += `
            <ul>
                <li>${item.name} <button data-remove=${item.id}>remove</button> <span>$${item.price}</span></li>
            </ul>
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

// This function removes items from an array
function handleRemoveItem(itemId){
    arrOfOrders.pop(itemId)
    console.log(arrOfOrders)
}