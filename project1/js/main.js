// Javascript for Project 1: Smart Shopping Cart Interface

// Array to hold all items in cart
let cart = [];

// Array of aisle names where index+1 is the aisle number
let aisles = ["Produce", "Deli", "Bread", "Baking", "Drinks/Water",
              "Meat", "Seafood", "Candy/Snack", "Breakfast", "Bakery",
              "Dairy", "Frozen Food"];

// Item objects
let items = [{
                "name": "Milk",
                "price": "",
                "aisle_number": "",
                "image_loc": ""
            },
            {
                "name": "Simple Truth Large Brown Eggs",
                "price": "4.49",
                "aisle_number": "11",
                "image_loc": "res/simple_truth_eggs.jfif",
                "rating": 5,
                "available": 10
            },
            {
                "name": "Food Club Medium White Eggs",
                "price": "3.99",
                "aisle_number": "11",
                "image_loc": "res/food_club_eggs.jfif",
                "rating": 4,
                "available": 0
            }
];

function addToCart() {
    // TODO
}

function calcPrice() {
    // Function calculates total price of all items in cart
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

function initializeUi() {
    // Function to prefill cart so that certain elements in display are visible
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

// When user clicks on help button, open popup
function showHelpPopup() {
    document.getElementById("help_popup").style.visibility= "visible";
}

// When user clicks ok button, hide popup
function hideHelpPopup() {
    document.getElementById("help_popup").style.visibility= "hidden";
}