// Javascript for Project 1: Smart Shopping Cart Interface

// Array to hold all items in cart
var cart = [];
var shopper_obj = {};
var shopping_list = [];
var search_focus = false;

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
    "account_info": null,
    "payment_info": [],
    "cart": [
        items[5],
        items[6],
        items[3],
        items[8],
        items[10]
    ],
    "location_info": {
        "x": 485,
        "y": 500,
        "aisle": "1"
    }
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
    ],
    "location_info": {
        "x": 645,
        "y": 300,
        "aisle": "8",
    }
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
        items[8],
        items[9],
        items[1]
    ],
    "location_info": {
        "x": 565,
        "y": 210,
        "aisle": "11"
    }
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
    ],
    "location_info": {
        "x": 725,
        "y": 475,
        "aisle": "4"
    }
}
];

window.onload = function () {
    if (localStorage.getItem("shopper") === null) {
        localStorage.setItem("shopping_list", "[]")
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

function initializeUi() {
    // Get variables saved in local storage
    cart = JSON.parse(localStorage.getItem("cart"));
    shopper_obj = JSON.parse(localStorage.getItem("shopper_obj"));
    shopping_list = JSON.parse(localStorage.getItem("shopping_list"));

    setShopperDisplays(localStorage.getItem("shopper"));
    setAccount();
    displayShoppingList();

    let page = localStorage.getItem("page");
    
    if (page == "checkout.html" || page == "account_checkout.html") {
        loadCheckout();
    } else if (page == "search.html") {
        displaySearchResults();
    } else if (page == "map.html") {
        updateShopperLocation();

        let item = JSON.parse(localStorage.getItem("item_result"));
        if (item !== null) {
            showItemOnMap(item);
        }
    } else if (page == "shopping_list.html") {
        displayCartShoppingList();
    }
}




// CART SHOPPING LIST METHODS

// Method to add item user selects to their shopping list
function addListItem(i) {
    console.log("Adding item to shopping list")
    shopping_list.push(items[i]);

    // Rewrite stored shopping list
    localStorage.setItem("shopping_list", JSON.stringify(shopping_list));

    // Close search dropdown
    closeItemDropdown();

    // Display shopping list in phone UI
    initializeUi();
}

// Method to remove all items in shopping list
function clearShoppingList() {
    shopping_list = [];

    // Rewrite stored shopping list
    localStorage.setItem("shopping_list", JSON.stringify(shopping_list));

    // Re-display shopping lists
    initializeUi();
}

function displayCartShoppingList() {
    if (localStorage.getItem("phone_connected") == "true") {
        // Display shopping list
        let item_info = document.getElementsByClassName("item_info")[0];
        item_info.style.visibility = "visible";
        document.getElementsByClassName("col instructions")[0].style.visibility = "hidden";

        // Add items in shopping list to display
        let table = item_info.getElementsByTagName("tbody")[0];
        let html = ""

        for (let i = 0; i < shopping_list.length; i++) {
            let item = shopping_list[i];
            let checked = "<td><span class='bi-square'></span></td>";

            // Determine if item is in cart or not (and thus if it should be checked off)
            for (let j = 0; j < cart.length; j++) {
                if (JSON.stringify(cart[j]) == JSON.stringify(item)) {
                    checked = "<td><span class='bi-check-square'></span></td>";
                }
            }

            let name = `<td>${item["name"]}</td>`
            let button = `<td><a href="map.html"><button class="btn" onclick="setItemResult(${i})">Find On Map</button></a></td>`
            let trash = `<td><span class='bi-trash' onclick='removeListItem(${i})'></span></td>`;
            html = html + `<tr>${checked}${name}${button}${trash}</tr>`
        }

        table.innerHTML = html;

    } else {
        // Display instructions to connect shopping list
        document.getElementsByClassName("col instructions")[0].style.visibility = "visible";
        document.getElementsByClassName("item_info")[0].style.visibility = "hidden";
    }
}

// Method to remove item user selects from their shopping list
function removeListItem(i) {
    shopping_list.splice(i, 1);

    // Rewrite stored shopping list
    localStorage.setItem("shopping_list", JSON.stringify(shopping_list));

    // Re-display shopping lists
    initializeUi();
}

function setItemResult(i) {
    localStorage.setItem("item_result", JSON.stringify(shopping_list[i]));
}




// CHECKOUT METHODS

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

// Change display for payment methods when user changes it
function changePaymentMethod(elem){
    let methods = [document.getElementById("method1"),
                   document.getElementById("method2")]

    for (let i = 0; i < methods.length; i++) {
        if (methods[i] == elem) {
            elem.className = "payment_method selected_method";
        } else {
            methods[i].className = "payment_method unselected_method";
        }
    }
}

// Popup when user selects confirm payment button
function confirmPayment(){
    window.alert("This button would complete the transaction in a real implementation of this UI.")
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




// MAP METHODS

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

// Method to move shopper location indicator around map
function updateShopperLocation() {
    let svg = document.getElementsByClassName("shopper_loc")[0];

    svg.style.left = shopper_obj["location_info"]["x"];
    svg.style.top = shopper_obj["location_info"]["y"];
}

function showItemOnMap(item) {
    // Select specific aisle that item is found in
    let elem = document.getElementById(item["aisle_number"]);
    displayAisle(elem);

    // Display selected item info in map sidebar
    let selected_area = document.getElementsByClassName("selected_item")[0];
    selected_area.getElementsByTagName("h3")[0].innerHTML = item["name"];
    selected_area.getElementsByTagName("h4")[0].innerHTML = "Price: $" + item["price"];
    selected_area.getElementsByTagName("img")[0].src = item["image_loc"];

    selected_area.style.visibility = "visible";
    document.getElementsByClassName("selected_item_title")[0].style.visibility = "visible";

    // Remove item result from local storage
    localStorage.setItem("item_result", null);
}




// MOCK PHONE UI METHODS

function closeConnectionPopup() {
    document.getElementsByClassName("connection_popup")[0].style.visibility = "hidden";
    document.getElementsByClassName("connection_error")[0].style.visibility = "hidden";
}

function closeItemDropdown() {
    console.log("closing item dropdown");
    document.getElementsByClassName("search_dropdown")[0].style.visibility = "hidden";
}

function connectToUI() {
    let code = document.getElementById("verif_code").value;
    console.log(code)

    if (code != "A7M2GA") {
        document.getElementsByClassName("connection_error")[0].style.visibility = "visible"
    } else {
        // Set connected variable in local storage
        localStorage.setItem("phone_connected", "true");

        // Display success message
        let elem = document.getElementsByClassName("connection_popup")[0];
        elem.innerHTML = "<h5>Connection Success!</h5><p class='connection_error'></p><button class='btn' onclick='closeConnectionPopup()'>Ok</button>";
    
        // Update shopping list if on page
        if (localStorage.getItem("page") == "shopping_list.html") {
            displayCartShoppingList();
        }
    }
}

function displayShoppingList() {
    let elem = document.getElementsByClassName("phone_shopping_list")[0];
    let html = "";

    for (let i = 0; i < shopping_list.length; i++) {
        html = html + `<div class="row list_item"><div><span class="bi-trash" onclick="removeListItem(${i})"></span></div><p>${shopping_list[i]["name"]}</p></div>`
    }

    elem.innerHTML = html;
}

// Method to filter items in search dropdown based on what is typed
function filterItems() {
    console.log("running filter")
    let dropdown = document.getElementsByClassName("search_dropdown")[0];
    let dropdown_list = document.getElementsByClassName("dropdown_list")[0];

    let search_query = document.getElementById("list_search").value.toLowerCase();
    let html = "";

    // Get all items whose name matches the search query
    for (i = 0; i < items.length; i++) {
        let item = items[i]["name"].toLowerCase();

        if (item.includes(search_query)) {
            html = html + `<p onclick="addListItem(${i})">${items[i]["name"]}</p>`;
        }
    }

    // Set dropdown html
    dropdown_list.innerHTML = html;
}

function openConnectionPopup() {
    document.getElementsByClassName("connection_popup")[0].style.visibility = "visible";
    document.getElementsByClassName("connection_error")[0].style.visibility = "hidden";
}

function openItemDropdown() {
    console.log("opening item dropdown");

    filterItems();
    document.getElementsByClassName("search_dropdown")[0].style.visibility = "visible";
}




// SEARCH METHODS

function displaySearchResults() {
    let results = JSON.parse(localStorage.getItem("results"));

    // Display results
    for (i = 0; i < results.length; i++) {
        let item = results[i];
        let card = document.getElementById(i);
        document.getElementById("name"+i).innerHTML = item["name"];
        document.getElementById("price"+i).innerHTML = "Price: $" + item["price"];
        document.getElementById("img"+i).src = item["image_loc"];

        // Determine if product is in stock or not
        if (item["available"] == 0) {
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

        // Set onclick functionality for button
        document.getElementById("map"+i).onclick = function() {
            localStorage.setItem("item_result", JSON.stringify(item))
        };

        document.getElementById(i).style.visibility = "visible";
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

    // Put results in local storage
    localStorage.setItem("results", JSON.stringify(results))

    // Go to search page
    window.location.href = "search.html";
}




// SHOPPER PROFILE METHODS

function changeShopper(i) {
    shopper_obj = shoppers[i-1];

    // Set cart contents to copy of what is in shopper's cart
    // (using copy so that user can reset cart contents whenever)
    cart = JSON.parse(JSON.stringify(shopper_obj["cart"]));

    // Update local storage
    localStorage.setItem("shopper", i);
    localStorage.setItem("shopper_obj", JSON.stringify(shopper_obj))
    localStorage.setItem("cart", JSON.stringify(cart));

    initializeUi();
}

function setAccount() {
    let elem = document.getElementById("login_button");

    if (shopper_obj["account_info"] !== null) {
        elem.innerHTML = "Welcome, " + shopper_obj["account_info"]["first_name"];
        elem.style.fontSize = "20px";
    } else {
        elem.innerHTML = "<button class='btn' onclick='logInPopup()'>Log In</button>"
    }
}

function setShopperButtons(i) {
    let elem = document.getElementById("shopper_select");
    let buttons = elem.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = "btn notselected"
    }

    document.getElementById("shopper" + i).className = "btn selected_shopper";
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




// SHOPPING CART METHODS

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

// Remove item from cart
function removeItem(i) {
    cart.splice(i, 1);

    // Update cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redraw cart display
    setCartDisplay();
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




// MISC METHODS

// When user clicks ok button, hide popup
function hideHelpPopup() {
    document.getElementById("help_popup").style.visibility= "hidden";
}

// When user clicks login button, display message
function logInPopup() {
    window.alert("This button would allow shoppers to log in to their store account in a real implementation of the UI.")
}

// When user clicks on help button, open popup
function showHelpPopup() {
    document.getElementById("help_popup").style.visibility= "visible";
}