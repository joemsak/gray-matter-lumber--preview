const Card = require('../models/card')

const processTokens = (tokens, cardHolders) => {
  let card

  if (tokens.command !== 'Add')
    card = cardHolders[tokens.name]

  switch(tokens.command) {
    case "Add":
      cardHolders[tokens.name] = new Card(tokens.cardNumber, tokens.limit)
      break

    case "Charge":
      card.attemptCharge(tokens.chargeAmount)
      break

    case "Credit":
      card.attemptCredit(tokens.creditAmount)
      break

    default:
      console.log(`Command ${tokens.command} not supported`)
  }
}

module.exports = processTokens