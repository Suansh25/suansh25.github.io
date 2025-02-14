let products = [];
let cart = {};
let currentIndex = 0;

// Fetch products
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    showProducts();
  });

// Display Products
const showProducts = () => {
    let str = "";
    products.forEach((value) => {
        str += `
            <div class='box'>
                <img src='${value.url}' alt='${value.name}' class='product-img' />
                <h3>${value.name}</h3>
                <p>${value.desc}</p>
                <h4>$${value.price}</h4>
                <button onclick="addToCart(${value.id})">Add to Cart</button>
            </div>
        `;
    });
    document.getElementById("divProducts").innerHTML = str;
};

// Add to Cart
const addToCart = (id) => {
    cart[id] = (cart[id] || 0) + 1;
    showCart();
};

// Increment
const increment = (id) => {
    cart[id]++;
    showCart();
};

// Decrement
const decrement = (id) => {
    cart[id]--;
    if (cart[id] < 1) delete cart[id];
    showCart();
};

// Show Cart
const showCart = () => {
    let str = "";
    products.forEach((value) => {
        if (cart[value.id]) {
            str += `
                <li>${value.name} - $${value.price}
                <button onclick='decrement(${value.id})'>-</button> 
                ${cart[value.id]} 
                <button onclick='increment(${value.id})'>+</button> 
                = $${value.price * cart[value.id]}
                </li>
            `;
        }
    });
    document.getElementById("divCart").innerHTML = str;
    document.getElementById("items").innerText = Object.keys(cart).length;
    showTotal();
};

// Show Total
const showTotal = () => {
    let total = products.reduce((sum, value) => {
        return sum + value.price * (cart[value.id] || 0);
    }, 0);
    document.getElementById("divTotal").innerHTML = `Order Value: $${total}`;
};

// Show/hide Cart
const displayCart = () => {
    document.getElementById("divCartBlock").style.right = "0";
};
const hideCart = () => {
    document.getElementById("divCartBlock").style.right = "-300px";
};

// Carousel Sliding
const moveSlide = (step) => {
    const track = document.getElementById("divProducts");
    const items = document.querySelectorAll(".box");
    const itemWidth = items[0].offsetWidth + 20;

    currentIndex = Math.max(0, Math.min(currentIndex + step, items.length - 3));
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
};
