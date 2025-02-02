function validateCreditCard(number, type) {
    // Regex patterns for different card types
    const cardTypes = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/, // Visa: Starts with 4, 13 or 16 digits
        mastercard: /^5[1-5][0-9]{14}$/,   // MasterCard: Starts with 51-55, 16 digits
        amex: /^3[47][0-9]{13}$/          // American Express: Starts with 34 or 37, 15 digits
    };
    
    if (!cardTypes[type.toLowerCase()].test(number)) {
        return false; // Format does not match
    }
    
    return luhnCheck(number);
}

function luhnCheck(number) {
    let sum = 0;
    let alternate = false;
    let digits = number.split('').reverse().map(digit => parseInt(digit, 10));
    
    for (let i = 0; i < digits.length; i++) {
        let digit = digits[i];
        
        if (alternate) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        alternate = !alternate;
    }
    
    return sum % 10 === 0;
}

// Example Usage
console.log(validateCreditCard("4111111111111111", "visa")); // true
console.log(validateCreditCard("5500000000000004", "mastercard")); // true
console.log(validateCreditCard("340000000000009", "amex")); // true

/*
Simple Explanation:
- Visa: Starts with 4 and has 13 or 16 digits.
- MasterCard: Starts with a number between 51 and 55 and has 16 digits.
- American Express: Starts with 34 or 37 and has 15 digits.

Each type has a specific pattern that helps determine whether the card number is valid before running an additional mathematical check (Luhn Algorithm) to verify its authenticity.
*/


