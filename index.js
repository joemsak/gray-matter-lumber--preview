#!/usr/bin/env node

'use strict'

const Card = require('./models/card')
const Report = require('./models/report')

const tokenizeCommand = require('./utils/tokenize-command')

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

      const report = new Report(cardHolders)
      report.printSummary()

      process.exit()
    }

    const tokens = tokenizeCommand(input)

    switch(tokens.command) {
      case "Add":
        cardHolders[tokens.name] = new Card(tokens.cardNumber, tokens.limit)
        break;

      case "Charge":
        cardHolders[tokens.name].attemptCharge(tokens.chargeAmount)
        break

      case "Credit":
        cardHolders[tokens.name].attemptCredit(tokens.creditAmount)
        break

      default:
        console.log(`Command ${tokens.command} not supported`)
    }

    promptForCommand()
  })
}

promptForCommand()