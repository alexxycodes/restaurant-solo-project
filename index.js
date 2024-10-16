import {menuArray} from '/data.js'
const menuDisplay = document.getElementById('menu-display')
const completeOrderBtn = document.getElementById('complete-order-btn')
const paymentPopUp = document.getElementById('payment-popup')
const formId = document.getElementById('formId')
const successMessage = document.getElementById('message')
const menuItemPriceArray = [];



document.addEventListener('click', (e) => {
    if (e.target.dataset.plus) {
        handlePlusClick(e.target.dataset.plus)
        successMessage.style.display = 'none'
        document.getElementById('checkout').style.display='flex'
        getmenuItemPriceHtml()
    }
    else if(e.target.dataset.minus){
        handleRemoveClick(e.target.dataset.minus)
    }
})

completeOrderBtn.addEventListener('click', ()=>{
    paymentPopUp.style.display = 'flex'
})

formId.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formDetails = new FormData(formId)
    const name = formDetails.get('username')
    console.log(name)
    const messageHtml = `
                <p>Thank you ${name}! your order is on its way!</p>
    `
    menuItemPriceArray.length = 0
    // checkoutSwitch()
    document.getElementById('checkout').style.display='none'
    paymentPopUp.style.display = 'none'
    successMessage.style.display = 'block'
    successMessage.innerHTML = messageHtml
    formId.reset()
    return false

})


function checkoutSwitch(){
    if (menuItemPriceArray.length === 0){
        document.getElementById('checkout').style.display='none'
    }}


function handlePlusClick(data) {
    
    const dataInt = parseInt(data)    
    const menuObj = menuArray.filter(function(menu){
        return menu.id === dataInt
        })[0]

    if (!menuObj) return; // Safety check if menuObj is not found.

    const existingItem = menuItemPriceArray.find(item => item.name === menuObj.name);

    if (existingItem) {
        existingItem.count++       
        existingItem.totalPrice = existingItem.unitPrice * existingItem.count
    } else {
        menuItemPriceArray.push({ name: menuObj.name, unitPrice: menuObj.price, 
            count: 1, totalPrice:menuObj.price, id:menuObj.id})
    }
    console.log(menuItemPriceArray)
}

function getmenuItemPriceHtml(){
    let total = 0
    let textHtml = ''
    menuItemPriceArray.forEach(function(menu){
        const{name, unitPrice, count, totalPrice, id} = menu
        textHtml += `
                <div class="inner-item-price">
                    <div class="inner-item-count">
                    <h1>${name} <button class=" removebtn" data-minus="${id}">remove</button></h1>
                    <h2>qty-${count}</h2>
                    </div>
                    <h2>$${totalPrice}</h2>
                </div>
            `
        total += unitPrice * count
    })
    document.getElementById('item-price').innerHTML = textHtml
    document.getElementById('total-price').textContent = "$"+total
}

function handleRemoveClick(data){
    const dataInt  = parseInt(data)
    const existingItem = menuItemPriceArray.find(menu=>menu.id === dataInt)
    const index = menuItemPriceArray.findIndex(menu => menu.id === dataInt)
    if(existingItem.count > 1){
        existingItem.count -= 1
        existingItem.totalPrice = existingItem.totalPrice - existingItem.unitPrice
    }
    else{
        menuItemPriceArray.splice(index, 1)
    }
    getmenuItemPriceHtml()
    checkoutSwitch()
    console.log(menuItemPriceArray)
}


function getDataHtml(){
    return menuArray.map(function(menu){
        return `
            <div class="item">
                <div class="menu-img-desc">
                    <div>
                        <p class="menu-img">${menu.emoji}</p>
                    </div>                    
                    <div class="menu-desc">
                        <h1>${menu.name}</h1>
                        <p>${menu.ingredients}</p>
                        <h2>$${menu.price}</h2>
                    </div>
                </div>
                <div class="plus">
                    <i class="fa-solid fa-circle-plus" data-plus="${menu.id}"></i>
                </div>
            </div>
        `
    }).join('')
}


function renderData(){
    menuDisplay.innerHTML = getDataHtml()
}

renderData()
checkoutSwitch()









