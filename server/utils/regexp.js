/**
 * Created by workbook on 14.04.2017.
 */

function validate(phone) {
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (regex.test(phone)) {
        // Valid international phone number
    } else {
        // Invalid international phone number
    }
}