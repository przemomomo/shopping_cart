const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-container");

fetch('https://dummyjson.com/products')
.then(res=>res.json())
.then(data=>console.log(data.products))


function renderProdcuts() {
    productsEl.innerHTML=''
    products.forEach((product) => {
      productsEl.innerHTML += `
    
      <div class="item-container flex col border">
                <div class="item-text flex col border" >
                    <div class="product-name">${product.title}</div>
                    <div class="product-brand">${product.brand}</div>
                    <div class="product-description">${product.description}</div>
                </div>
                <div class="item-panel flex border">
                    <div class="price-container"><p>${product.price}</p></div>
                    <div class="amount-container"><p>--${(product.amount===undefined ? '1' : product.amount)}</p></div>
                    <div class="plus-minus-container flex col border">
                    <div class="plus border" onclick="renderProductAmount(${product.id})">+</div>
                    <div class="minus" onclick="changeNumberOfUnits('minus', ${product.id})">-</div>
                    </div>
                    < div class = "purchase-container"
                    onclick = "addToCart(${product.id},${product.amount},'${product.brand}')" > KUP < /div>
                < /div>
            < /div>
          `;  
    });

     
  }
  
renderProdcuts();

function renderProductAmount(id){
    for(const i of products){
        if(i.id===id){
            if(i.amount){i.amount++}
            else{i.amount=2}
        }
    }

    renderProdcuts()
    
}


let cart=[]

function addToCart(id,amount, brand){
        // check if prodcut already exist in cart
        if (cart.some((item) => item.id === id)) {
          changeNumberOfUnits("plus", id, amount);

        } if(cart.some((item) => item.brand === brand)) {
            console.log('ggg');
            
        }
        
        else{
    const item = products.find((product) => product.id===id)
    console.log(item)
    cart.push({
    ...item,
    numberOfUnits:amount,
    })
    }
updateCart()
}
function updateCart(){
    renderCartItems();
    renderSubtotal();
}

function renderCartItems(){
    cartItemsEl.innerHTML=''
    cart.forEach((item)=>{
        cartItemsEl.innerHTML+=`
        <div class="cart-item">
                <div class="brand">${item.brand}</div>
                <div class="cart-product-details">
                    <div class="cart-product-name">${item.title}</div>
                    <div class="cart-product-price"></div>
                    <div class="cart-product-amount">${item.numberOfUnits}</div>
                    <div class="plus-minus-container flex col border">
                        <div class="plus border" onclick="changeNumberOfUnits('plus', ${item.id},1)">+</div>
                        <div class="minus" onclick="changeNumberOfUnits('minus', ${item.id},1)">-</div>
                    </div>
                    <div class="delete-container" onclick="removeItemFromCart(${item.id})">USUN</div>

                </div>
            </div>
        `
    })
}

function changeNumberOfUnits(action, id, amount) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
  
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action === "plus" && numberOfUnits < item.stock) {
          numberOfUnits+=amount;
        }
      }
  
      return {
        ...item,
        numberOfUnits,
      };
    });
  
    updateCart();
  }