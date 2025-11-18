// / script.js

// --- 1. Define Base Prices and Elements ---

const BASE_PRICES = {
    // Base price for a small coffee
    'small': 3.00,
    // Price difference for medium and large
    'medium': 4.00,
    'large': 5.00,
    // Extra costs
    'extra_shot': 0.75,
    'whipped_cream': 0.50,
    // Milk type price adjustments (e.g., oat milk surcharge)
    'oat': 0.50,
    'skim': 0.00,
    'whole': 0.00
};

// Get the form elements we need to watch for changes
const form = document.querySelector('form');
const quantityInput = document.getElementById('quantity');
const milkTypeSelect = document.getElementById('milkType');

// Create a new element to display the total price (this needs to be added to order.html)
let totalDisplay = document.getElementById('totalPriceDisplay');
if (!totalDisplay) {
    totalDisplay = document.createElement('p');
    totalDisplay.id = 'totalPriceDisplay';
    totalDisplay.style.fontWeight = 'bold';
    totalDisplay.style.fontSize = '1.2em';
    // Add it just before the buttons for visibility
    const buttonsDiv = form.querySelector('div:last-of-type');
    form.insertBefore(totalDisplay, buttonsDiv);
}


// --- 2. Calculation Function ---

function calculateTotal() {
    let totalPrice = 0;

    // 1. Get Coffee Size Price
    const size = form.elements['coffeeSize'].value;
    totalPrice += BASE_PRICES[size] || 0;

    // 2. Get Extras Price
    form.elements['extras'].forEach(checkbox => {
        if (checkbox.checked) {
            totalPrice += BASE_PRICES[checkbox.value] || 0;
        }
    });

    // 3. Get Milk Type Adjustment
    const milk = milkTypeSelect.value;
    totalPrice += BASE_PRICES[milk] || 0;

    // 4. Apply Quantity Multiplier
    const quantity = parseInt(quantityInput.value) || 1;
    let finalTotal = totalPrice * quantity;
    
    // 5. Update the display
    totalDisplay.textContent = 'Total Order: $${finalTotal.toFixed(2)}';
}


// --- 3. Event Listeners ---

// Listen for any changes within the form to recalculate
form.addEventListener('change', calculateTotal);
form.addEventListener('input', calculateTotal); // Important for quantity input

// Initial calculation when the page loads
calculateTotal();