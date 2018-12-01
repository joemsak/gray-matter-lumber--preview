class Report {
  constructor(cardHolders) {
    this.cardHolders = {}

    Object.keys(cardHolders).sort().forEach(name => {
      this.cardHolders[name] = cardHolders[name]
    })
  }

  printSummary () {
    console.log("")

    Object.keys(this.cardHolders).forEach(name => {
      const card = this.cardHolders[name]
      if (card.isValid()) {
        console.log(`${name}:`, card.getBalanceAsString())
      } else {
        console.log(`${name}:`, 'error')
      }
    })

    console.log("")
  }
}

module.exports = Report