const tokenizeCommand = (input) => {
  const tokens = input.split(" ")

  const command = tokens[0]

  const name = tokens[1]
  const cardNumber = command === "Add" ? tokens[2] : ""

  const limit = cardNumber.length ? tokens[3] : ""
  const sanitizedLimit = parseInt(limit.replace("$", ""))

  const chargeAmount = command === "Charge" ? tokens[2] : ""
  const creditAmount = command === "Credit" ? tokens[2] : ""
  const sanitizedChargeAmount = parseInt(chargeAmount.replace("$", ""))
  const sanitizedCreditAmount = parseInt(creditAmount.replace("$", ""))

  return {
    command,
    name,
    cardNumber,
    limit: sanitizedLimit,
    chargeAmount: sanitizedChargeAmount,
    creditAmount: sanitizedCreditAmount
  }
}

module.exports = tokenizeCommand