document.addEventListener('DOMContentLoaded', function() {
    var data = [
        {
            "producttitle":"Korean Office Attire",
            "caption": "Stay sharp and stylish in office attire. Embrace the power of tailored office fashion.",
            "productPrice":"₱1,190.99",
            "image":src="./assets/OfficeAttire1.webp"
        },
        {
            "producttitle":"Korean Work Dress",
            "caption": "Sleek and stylish: Embrace success with our office attire collection.",
            "productPrice":"₱1,550.99",
            "image":src="./assets/OfficeAttire2.webp"
        },
        {
            "producttitle":"Black Collar Dress",
            "caption": "Confidence is your best accessory in office fashion. ",
            "productPrice":"₱1,200.00",
            "image":src="./assets/OfficeAttire3.webp"
        },
        {
            "producttitle":"Korean White Dress",
            "caption": "Elevate your style with professional poise.",
            "productPrice":"₱1,110.00",
            "image":src="./assets/OfficeAttire4.webp"
        },
        {
            "producttitle":"Sleeveless Dress",
            "caption": "Make a statement with refined office attire. ",
            "productPrice":"₱1,286.00",
            "image":src="./assets/OfficeAttire5.webp"
        },
        {
            "producttitle":"Korean Wrap Dress",
            "caption": "Smart, stylish, and ready to conquer the workday. ",
            "productPrice":"₱1,870.00",
            "image":src="./assets/OfficeAttire6.webp"
        },
        {
            "producttitle":"Line Flare Dress",
            "caption": "Striking the perfect balance between professionalism and fashion.",
            "productPrice":"₱1,500.00",
            "image":src="./assets/OfficeAttire7.webp"
        },
        {
            "producttitle":"Flowless Dress",
            "caption": "Best dress for the perfect balance between professionalism",
            "productPrice":"₱1,354.00",
            "image":src="./assets/OfficeAttire8.webp"
        },
        {
            "producttitle":"Korean White Dress",
            "caption": "Dress for success, conquer the business world.",
            "productPrice":"₱1,345.00",
            "image":src="./assets/OfficeAttire9.webp"
        },
        {
            "producttitle":"Black Korean Dress",
            "caption": "So be the best version of your self",
            "productPrice":"₱1,550.99",
            "image":src="./assets/OfficeAttire10.jpg"
        },
    ]
    
/// Add to CART Function in Modal

var cartData = []; // Initialize an empty cart array

buildProductDisplay(data);
addAddToCartListeners();

/// Function for Build Product Display
    function buildProductDisplay(data) {
    var tableproduct = document.getElementById('fashion-container');

    for (var i = 0; i < data.length; i++) {
        var row = `<div class="product">
            <div class="image-container">
            <img src="${data[i].image}" alt="">
            </div>
            <h3 class="producttitle">${data[i].producttitle}</h3>
            <p class="caption">${data[i].caption}</p>
            <p class="productPrice">${data[i].productPrice}</p>
            <button class="add-to-cart" data-index="${i}">Add to Cart</button>
        </div>`;
        tableproduct.innerHTML += row;
    }
    }

/// Function for Show Notification
    function showNotification() {
    var notification = document.getElementById('notification');
    notification.classList.add('show');

    setTimeout(function () {
        notification.classList.remove('show');
    }, 2000);
    }

/// Function for Add Add To CartListeners
    function addAddToCartListeners() {
    var addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', function () {
        var index = button.dataset.index;
        var selectedProduct = data[index];

        var existingItem = cartData.find(item => item.producttitle === selectedProduct.producttitle);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            selectedProduct.quantity = 1;
            cartData.push(selectedProduct);
        }

        buildTable(cartData);
        showNotification(selectedProduct.producttitle);
        });
    });
    }

/// Function for Build Table
    function buildTable(cartData) {
        var tableBody = document.querySelector('#myTable');
        var totalPrice = 0;
        var totalQuantity = 0;
    
        // Clear previous table contents
        tableBody.innerHTML = '';
    
        cartData.forEach(item => {
        var row = document.createElement('tr');
    
        var imageCell = document.createElement('td');
        var itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = 'Item Image';
        itemImage.className = 'item-image';
        imageCell.appendChild(itemImage);
    
        var titleCell = document.createElement('td');
        titleCell.textContent = item.producttitle;
    
        var priceCell = document.createElement('td');
        priceCell.textContent = item.productPrice;
    
        var quantityCell = document.createElement('td');
        var quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.name = 'quantity';
        quantityInput.min = '0';
        quantityInput.max = '5';
        quantityInput.value = item.quantity || 1;
        quantityCell.appendChild(quantityInput);
    
        var itemTotalPriceCell = document.createElement('td');
        itemTotalPriceCell.className = 'item-total-price';
        itemTotalPriceCell.textContent = formatCurrency(parseFloat(item.productPrice.replace('₱', '').replace(',', '')).toFixed(2));
    
        row.appendChild(imageCell);
        row.appendChild(titleCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(itemTotalPriceCell);
    
        tableBody.appendChild(row);
    
        var itemPrice = parseFloat(item.productPrice.replace('₱', '').replace(',', ''));
        var itemQuantity = parseInt(quantityInput.value);
    
        quantityInput.addEventListener('input', function () {
            var newQuantity = parseInt(quantityInput.value);
            var quantityDifference = newQuantity - itemQuantity;
    
            if (quantityDifference !== 0) {
            var itemTotalPrice = itemPrice * newQuantity;
    
            // Update the item's total price cell
            itemTotalPriceCell.textContent = formatCurrency(itemTotalPrice.toFixed(2));
    
            totalPrice += itemPrice * quantityDifference;
            totalQuantity += quantityDifference;
            itemQuantity = newQuantity;
    
            updateTotalPrice();
            updateTotalQuantity();
            updateChange();
            }
        });
        });
    
        updateTotalPrice();
    
        var totalPriceCell = document.getElementById('totalPrice');
        var totalQuantityCell = document.getElementById('totalQuantity');
    
        totalPriceCell.textContent = formatCurrency(totalPrice.toFixed(2));
        totalQuantityCell.textContent = totalQuantity;
    }
    
// Function for updateTotalPrice
  function updateTotalPrice() {
    var totalPrice = 0;
    var totalQuantity = 0;
    var rows = document.querySelectorAll('#myTable tr');
  
    rows.forEach(row => {
      var quantityInput = row.querySelector('input[name="quantity"]');
      var priceCell = row.querySelector('td:nth-child(3)'); // Adjusted the index to match the price column
      var itemPrice = parseFloat(priceCell.textContent.replace('₱', '').replace(',', ''));
      var itemQuantity = parseInt(quantityInput.value);
  
      if (itemQuantity > 0) {
        var itemTotalPrice = itemPrice * itemQuantity;
        totalPrice += itemTotalPrice;
        totalQuantity += itemQuantity;
  
        // Update the price cell with the calculated item price
        var itemTotalPriceCell = row.querySelector('.item-total-price');
        itemTotalPriceCell.textContent = formatCurrency(itemTotalPrice.toFixed(2));
      }
    });
  
    var totalPriceCell = document.getElementById('totalPrice');
    totalPriceCell.textContent = formatCurrency(totalPrice.toFixed(2));
  
    var totalQuantityCell = document.getElementById('totalQuantity');
    totalQuantityCell.textContent = totalQuantity;
  }
  

// Function for Update Total Quantity
    function updateTotalQuantity() {
    var totalQuantity = 0;
    var quantityInputs = document.querySelectorAll('input[name="quantity"]');

    quantityInputs.forEach(input => {
        var itemQuantity = parseInt(input.value);

        if (itemQuantity > 0) {
        totalQuantity += itemQuantity;
        }
    });

    var totalQuantityCell = document.getElementById('totalQuantity');
    totalQuantityCell.textContent = totalQuantity;
    }

// Function for Update Change
    function updateChange() {
    var paymentInput = document.getElementById('payment-input');
    var changeCell = document.getElementById('change');

    var totalPriceCell = document.getElementById('totalPrice');
    var totalPrice = parseFloat(totalPriceCell.textContent.replace('₱', '').replace(',', ''));

    paymentInput.addEventListener('input', function () {
        var payment = parseFloat(paymentInput.value);
        var change = payment - totalPrice;

        if (!isNaN(change)) {
        if (change >= 0) {
            changeCell.textContent = formatCurrency(change.toFixed(2));
        } else {
            changeCell.textContent = "Insufficient amount: " + formatCurrency(-change.toFixed(2));
        }
        } else {
        changeCell.textContent = "";
        }
    });
    }


  
  /// Function for format Currency
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    });
    return formatter.format(amount);
  }
});