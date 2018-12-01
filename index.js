#!/usr/bin/env node

'use strict'

const Card = require('./models/card')

let cardHolders = {}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const promptForCommand = () => {
  console.log("")

  readline.question(`Enter a command:\n`, (input) => {
    if (input === 'quit') {
      readline.close()
      process.exit()
    }

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

    const card = cardHolders[name]

    switch(command) {
      case "Add":
        cardHolders[name] = new Card(cardNumber, sanitizedLimit)
        break

      case "Charge":
        card.attemptCharge(sanitizedChargeAmount)
        console.log(card.getBalanceAsString())
        break

      case "Credit":
        card.attemptCredit(sanitizedCreditAmount)
        console.log(card.getBalanceAsString())
        break

      default:
        console.log(`Command ${command} not supported`)
    }

    promptForCommand()
  })
}

promptForCommand()