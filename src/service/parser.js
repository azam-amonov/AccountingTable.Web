export function numberToCurrency(num, type) {
    let number = num.toLocaleString("en-US", { style: "currency", currency: "USD" });
    let formattedNumber = number.split("").splice(1).join("");
    formattedNumber = formattedNumber.replace(/,/g, " ");
    return type === 1 ? number : formattedNumber;
}