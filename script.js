let cart = [];


// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {

    // Check if product already exists
    let existingProduct = cart.find(function(item) {
        return item.name === name;
    });

    if (existingProduct) {

        // Increase quantity
        existingProduct.quantity++;

    } else {

        // Add new product
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    alert(name + " has been added to your cart!");
}


// =========================
// UPDATE QUANTITY
// =========================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    // Remove product if quantity becomes 0
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


// =========================
// UPDATE CART
// =========================

function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");

    let totalItems = 0;
    let totalPrice = 0;


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty.</p>";

        cartCount.textContent = "0";

        cartTotal.textContent = "Total: ₱0";

        return;
    }


    cartItems.innerHTML = "";


    // Display products
    cart.forEach(function(item, index) {

        let itemTotal = item.price * item.quantity;

        totalItems += item.quantity;

        totalPrice += itemTotal;


        let itemElement = document.createElement("div");

        itemElement.classList.add("cart-item");


        itemElement.innerHTML = `

            <div class="cart-product">

                <div>
                    <strong>${item.name}</strong>

                    <small>
                        ₱${item.price} each
                    </small>
                </div>

            </div>


            <div class="quantity-control">

                <button
                    onclick="changeQuantity(${index}, -1)"
                    class="quantity-button"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)"
                    class="quantity-button"
                >
                    +
                </button>

            </div>


            <div class="item-total">

                ₱${itemTotal}

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    // Cart count
    cartCount.textContent = totalItems;


    // Total price
    cartTotal.textContent =
        "Total: ₱" + totalPrice;

}


// =========================
// CHECKOUT
// =========================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");
        return;

    }

    // Calculate total
    let total = 0;

    cart.forEach(function(item) {

        total += item.price * item.quantity;

    });


    // Show checkout form
    let checkoutForm = document.getElementById("checkout-form");

    checkoutForm.style.display = "block";

    // Put total amount in checkout
    document.getElementById("checkout-total").textContent =
        "Total Amount: ₱" + total;

}

// =========================
// PLACE ORDER
// =========================

function placeOrder(event) {

    event.preventDefault();

    let name = document.getElementById("customer-name").value;

    let phone = document.getElementById("customer-phone").value;

    let email = document.getElementById("customer-email").value;

    let address = document.getElementById("customer-address").value;

    let payment = document.getElementById("payment-method").value;


    // Calculate total
    let total = 0;

    cart.forEach(function(item) {

        total += item.price * item.quantity;

    });


    alert(
        "Order Successfully Placed!\n\n" +

        "Customer: " + name + "\n" +

        "Phone: " + phone + "\n" +

        "Email: " + email + "\n" +

        "Payment: " + payment + "\n\n" +

        "Total Amount: ₱" + total + "\n\n" +

        "Thank you for ordering from Yeye Bakery!"
    );


    // Clear cart
    cart = [];

    updateCart();


    // Clear form
    document.querySelector("#checkout-form form").reset();


    // Hide checkout form
    document.getElementById("checkout-form").style.display = "none";

}