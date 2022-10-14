// Javascript for Project 1: Smart Shopping Cart Interface

// Array to hold all items in cart
var cart = [];
var shopper_obj = {};

// Array of aisle names where index+1 is the aisle number
var aisles = ["Produce", "Deli", "Bread", "Baking", "Drinks/Water",
              "Meat", "Seafood", "Candy/Snack", "Breakfast", "Bakery",
              "Dairy", "Frozen Food"];

// Item objects
var items = [{
    "name": "Banana",
    "price": 0.23,
    "aisle_number": "1",
    "image_loc": "res/banana.jfif",
    "rating": 3,
    "available": 100
},{
    "name": "Broccoli",
    "price": 0.99,
    "aisle_number": "1",
    "image_loc": "res/broccoli.jfif",
    "rating": 2,
    "available": 25
},{
    "name": "Private Selection Whole Wheat Bread",
    "price": 2.99,
    "aisle_number": "3",
    "image_loc": "res/wheat_bread.jfif",
    "rating": 4,
    "available": 2
},{
    "name": "Farmhouse White Bread",
    "price": 4.99,
    "aisle_number": "3",
    "image_loc": "res/white_bread.jfif",
    "rating": 5,
    "available": 8
},{
    "name": "All Purpose Flour",
    "price": 2.49,
    "aisle_number": "4",
    "image_loc": "res/flour.jfif",
    "rating": 5,
    "available": 6
},{
    "name": "Smidge and Spoon Granulated Sugar",
    "price": 2.99,
    "aisle_number": "4",
    "image_loc": "res/sugar.jfif",
    "rating": 4,
    "available": 0
},{
    "name": "Simple Truth Whole Milk",
    "price": 3.89,
    "aisle_number": "11",
    "image_loc": "res/whole_milk.jfif",
    "rating": 4,
    "available": 5
},{
    "name": "Fairlife 2% Chocolate Milk",
    "price": 4.49,
    "aisle_number": "11",
    "image_loc": "res/chocolate_milk.jfif",
    "rating": 5,
    "available": 5
},{
    "name": "Simple Truth Large Brown Eggs",
    "price": 4.49,
    "aisle_number": "11",
    "image_loc": "res/simple_truth_eggs.jfif",
    "rating": 5,
    "available": 10
},{
    "name": "Food Club Medium White Eggs",
    "price": 3.99,
    "aisle_number": "11",
    "image_loc": "res/food_club_eggs.jfif",
    "rating": 4,
    "available": 0
},{
    "name": "Digiorno Pepperoni Frozen Pizza",
    "price": 7.29,
    "aisle_number": "12",
    "image_loc": "res/pizza.jfif",
    "rating": 5,
    "available": 5
},{
    "name": "Totinos Pizza Rolls",
    "price": 5.49,
    "aisle_number": "12",
    "image_loc": "res/pizza_rolls.jfif",
    "rating": 3,
    "available": 5
},
];

var shoppers = [{
    "account_info": {},
    "payment_info": [],
    "cart": [
        items[5],
        items[6],
        items[3],
        items[8],
        items[10]
    ]
},{
    "account_info": {
        "first_name": "Hermione",
        "last_name": "Granger",
    },
    "payment_info": [],
    "cart": [
        items[9],
        items[2],
        items[1]
    ]
},{
    "account_info": {
        "first_name": "Harry",
        "last_name": "Potter",
    },
    "payment_info": [{
        "card_number": "123456789",
        "type": "Credit"
    }],
    "cart": [
        items[2],
        items[0],
        items[0],
        items[10],
        items[4],
        items[5],
        items[8]
    ]
},{
    "account_info": {
        "first_name": "Ron",
        "last_name": "Weasely",
    },
    "payment_info": [{
        "card_number": "987654321",
        "type": "Debit"
    },
    {
        "card_number": "121212121",
        "type": "Credit"
    }],
    "cart": [
        items[6],
        items[3],
        items[7],
        items[8],
        items[9],
        items[11]
    ]
}
];

window.onload = function () {
    if (localStorage.getItem("shopper") === null) {
        changeShopper(1);
    }

    // Get current page name and store in local storage
    let path = window.location.pathname;
    let page = "";
    if (path == "/") {
        page = "index.html";
    } else {
        page = path.split("/").pop();
    }
    localStorage.setItem("page", page);

    // Initialize page
    initializeUi();
}

// Function calculates total price of all items in cart
function calcPrice() {
    // Calculate total price
    let total = 0;
    for (i = 0; i < cart.length; i++) {
        total = total + cart[i]["price"];
    }

    // Ensure total always has 2 decimal places
    total = Number(Math.round(total+'e2')+'e-2');

    // Display total price for user
    document.getElementById("total_price").innerHTML = "$" + total;
}

function displayAisle(elem) {
    document.getElementById("aisle_title").innerHTML = "Aisle " + elem.id + ": " + aisles[elem.id-1];
    change_rect = elem.getElementsByTagName('rect')[0]
    rects = document.getElementsByTagName('rect')

    // Reset other aisle rects back to dark gray and change color of selected
    for (i=0; i < rects.length; i++) {
        if (rects[i] == change_rect) {
            rects[i].style.fill = "rgb(255, 197, 159)";
        }
        else {
            rects[i].style.fill = "darkgrey";
        }
    }
}

// Function to determine which checkout page to redirect to based
// on if user has saved payment info
function getCheckout() {
    // First store cart total before going to checkout page
    let total = document.getElementById("total_price").innerText;
    localStorage.setItem("cart_total", total);

    // Redirect to correct checkout page
    if (shopper_obj["payment_info"].length > 0) {
        window.location.href = "account_checkout.html";
    } else {
        window.location.href = "checkout.html";
    }
}

function loadCheckout() {
    document.getElementById("total").innerHTML = "Total: " + localStorage.getItem("cart_total");

    // Prepopulate payment methods
    if (localStorage.getItem("page") == "account_checkout.html"){
        let methods = shopper_obj["payment_info"];

        for (let i = 0; i < methods.length; i++) {
            let method = methods[i];
            let elem = document.getElementById("method"+(i+1));
            let text = elem.getElementsByTagName("h3")[0];
            let card_num = method["card_number"].slice(-4);
            text.innerHTML = `${method["type"]} Card ending in: ${card_num}`;
            elem.style.visibility = "visible";
        }
    }
}

function initializeUi() {
    // Get variables saved in local storage
    cart = JSON.parse(localStorage.getItem("cart"));
    shopper_obj = JSON.parse(localStorage.getItem("shopper_obj"));

    setShopperDisplays(localStorage.getItem("shopper"));

    let page = localStorage.getItem("page");
    
    if (page == "checkout.html" || page == "account_checkout.html") {
        loadCheckout();
    }
}

function searchItems() {
    let search_query = document.getElementById("search").value.toLowerCase();
    let results = [];

    // Get all items whose name matches the search query
    for (i = 0; i < items.length; i++) {
        let item = items[i]['name'].toLowerCase();

        if (item.includes(search_query)) {
            results.push(items[i])
        }
    }

    // Go to search page
    // window.location.href = "search.html";

    // Display results
    for (i = 0; i < results.length; i++) {
        let item = results[i];
        let card = document.getElementById(i);
        document.getElementById("name"+i).innerHTML = item["name"];
        document.getElementById("price"+i).innerHTML = "Price: " + item["price"];
        document.getElementById("img"+i).src = item["image_loc"];

        // Determine if product is in stock or not
        if (item["available"] == 0) {
            document.getElementById("warn"+i).style.visibility = "visible";
            document.getElementById("warn"+i).style.visibility = "visible";
        }

        // Change stars display based on rating
        let elems = card.getElementsByTagName('span');

        for (j = 0; j < elems.length; j++) {
            if (j < item["rating"] - 1) {
                elems[j].className = "bi-star-fill";
                elems[j].style.color = "gold";
            }
        }

        document.getElementById(i).style.visibility = "visible";
    }
}

// Remove item from cart
function removeItem(i) {
    cart.splice(i, 1);

    // Update cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redraw cart display
    setCartDisplay();
}

// Add item to cart display
function addItem(item) {
    let table = document.getElementById("items");
    let cell_count = table.rows[0].cells.length;
    let new_row = table.insertRow();
    let row_index = table.rows.length - 2;

    for (let i = 0; i < cell_count; i++) {
        let cell = new_row.insertCell(i);
        if (i == 0) {
            cell.innerHTML = `<span class='bi-trash' onclick='removeItem(${row_index})'></span>`;
        } else if (i == 1) {
            cell.innerHTML = item["name"];
        } else {
            cell.innerHTML = "$" + item["price"];
        }
    }
}

// Remove all previous items from cart display
function removeAllItems() {
    let table = document.getElementById("items");
    let row_count = table.rows.length;
    for (i = 0; i < row_count - 1; i++) {
        table.deleteRow(1);
    }
}

function setCartDisplay() {
    // Remove existing items from cart
    removeAllItems();

    // Add new items to cart
    for (let i = 0; i < cart.length; i++) {
        addItem(cart[i]);
    }

    // Recalculate total price
    calcPrice();
}

function setShopperButtons(i) {
    let elem = document.getElementById("shopper_select");
    let buttons = elem.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = "btn notselected"
    }

    document.getElementById("shopper" + i).className = "btn selected_shopper";
}

function changeShopper(i) {
    shopper_obj = shoppers[i-1];

    // Set cart contents to copy of what is in shopper's cart
    // (using copy so that user can reset cart contents whenever)
    cart = JSON.parse(JSON.stringify(shopper_obj["cart"]));

    // Update local storage
    localStorage.setItem("shopper", i);
    localStorage.setItem("shopper_obj", JSON.stringify(shopper_obj))
    localStorage.setItem("cart", JSON.stringify(cart));

    setShopperDisplays(i);
}

// Change selected shopper when user clicks button
function setShopperDisplays(i) {
    // Redraw cart contents if on cart page
    if (localStorage.getItem("page") == "index.html") {
        setCartDisplay();
    }

    // Update shopper buttons
    setShopperButtons(i);
}

// When user clicks on help button, open popup
function showHelpPopup() {
    document.getElementById("help_popup").style.visibility= "visible";
}

// When user clicks ok button, hide popup
function hideHelpPopup() {
    document.getElementById("help_popup").style.visibility= "hidden";
}

function setAccount() {

}