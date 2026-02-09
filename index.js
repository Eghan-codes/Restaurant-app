import { menuArray } from "/data.js"
console.log(menuArray)


function getMenuArr(menu){
    const items = document.getElementById('menu-items')
    let html = ``    
    for(let item of menu){
        html += `
        <div class = "menu-content">
        <div><h2>${item.emoji}</h2></div>
                <div class="item-details">
                    <div>
                        <p class ='name'>${item.name}</p>
                        <p class ='ingredient'>${item.ingredients}</p>
                        <p class ='price'>¢${item.price}</p>
                    </div>
                    <button>+</button>
                    </div>
                
        </div>
        `
    }
    items.innerHTML = html
}
getMenuArr(menuArray)
