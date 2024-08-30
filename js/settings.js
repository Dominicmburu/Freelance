// Card type detection based on the card number
const cardNumberInput = document.getElementById('cardNumberInput');
const cardTypeImage = document.getElementById('cardTypeImage');
const savedCardImage = document.getElementById('savedCardImage');

const cardTypes = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
};

cardNumberInput.addEventListener('input', function() {
    const cardNumber = this.value.replace(/\D/g, ''); // Remove non-digits
    let cardType = '';

    if (cardTypes.visa.test(cardNumber)) {
        cardType = 'visa';
    } else if (cardTypes.mastercard.test(cardNumber)) {
        cardType = 'mastercard';
    } else if (cardTypes.amex.test(cardNumber)) {
        cardType = 'amex';
    } else if (cardTypes.discover.test(cardNumber)) {
        cardType = 'discover';
    }

    // Display card type image
    cardTypeImage.innerHTML = cardType ? `<img src="images/${cardType}.png" alt="${cardType}" style="width: 50px;">` : '';
});

// Example: Showing saved card details after saving the card
document.querySelector('.save-card-btn').addEventListener('click', function() {
    document.querySelector('.new-card-entry').style.display = 'none';
    document.querySelector('.saved-card-details').style.display = 'block';

    // You can also dynamically set the saved card image type based on what was detected earlier
    savedCardImage.innerHTML = cardTypeImage.innerHTML;
});
