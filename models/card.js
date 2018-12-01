'use strict'

const luhn = require('luhn')

class Card {
  constructor(number, limit) {
    this.number = number
    this.limit = limit
    this.credits = []
    this.charges = []
  }

  isValid () {
    return luhn.validate(this.number)
  }

  getBalance () {
    return this.sumCharges() - this.sumCredits()
  }

  getBalanceAsString () {
    return `$${this.getBalance()}`
  }

  sumCharges () {
    return this.charges.reduce((acc, i) => acc += i, 0)
  }

  sumCredits () {
    return this.credits.reduce((acc, i) => acc += i, 0)
  }

  attemptCharge (amount) {
    if (this.isValid() && this.getBalance() + amount <= this.limit)
      this.charges.push(amount)
  }

  attemptCredit (amount) {
    if (this.isValid())
      this.credits.push(amount)
  }
}

module.exports = Card