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