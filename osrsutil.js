const { ge } = require('osrs-json-api');

function getGEPrice() {
    return ge.getItem(20997)
      .then(res => {
        return res.item;
    }).catch(console.error);

}

function getPriceDiff(bankValue, itemPrice) {
    //Check if last digit is a char, ie K, M or B
    if (bankValue.slice(-1).toLowerCase() != bankValue.slice(-1).toUpperCase()){
        switch(bankValue.slice(-1).toUpperCase()){
            case "K":
                suffix = "K";
                multiplier = 1000;
                break;
            case "M":
                suffix = "M";
                multiplier = 1000000;
                break;
            case "B":
                suffix = "B";
                multiplier = 1000000000;
                break;
            default:
                suffix = "";
        }
    }

    // Assuming it will always be in the millions for now
    // Numeric values without suffixes
    numPrice = itemPrice.slice(0, -1) * 1000000;
    numVal = bankValue.slice(0, -1) * multiplier;

    return formatAnswer(numPrice, numVal);
}

function formatAnswer(numPrice, numVal) {

    afford = false;
    priceDifference = numPrice - numVal;
    if (priceDifference < 0) {
        //Positive case, can afford
        afford = true;
        //Remove minus from number
        priceDifference = parseInt(priceDifference.toString().replace(/\D/g,''));
    }

    return [afford, priceDifference.toLocaleString()]
}

module.exports = {
    getGEPrice: getGEPrice,
    getPriceDiff: getPriceDiff
}