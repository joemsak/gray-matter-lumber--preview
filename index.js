#!/usr/bin/env node

'use strict'

const Report = require('./models/report')

const tokenizeCommand = require('./utils/tokenize-command')
const processTokens = require('./utils/process-tokens')

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

    processTokens(tokens, cardHolders)

    promptForCommand()
  })
}

promptForCommand()