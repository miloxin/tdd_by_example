class Money {
  static euro(amount) {
    return new Money(amount, 'EUR')
  }

  static dollar(amount) {
    return new Money(amount, 'USD')
  }

  constructor (amount, currency) {
    this._amount = amount
    this._currency = currency
  }

  isEqual (money) {
    return this._sameAmountAs(money) && this._sameCurrencyAs(money)
  }

  currency () {
    return this._currency
  }

  times (multiplier) {
    return new Money(this._amount * multiplier, this._currency)
  }

  add (money) {
    return new Money(this._amount + money._amount, this._currency)
  }

  _sameAmountAs(money) {
    return this._amount === money._amount
  }

  _sameCurrencyAs(money) {
    return this._currency === money._currency
  }
}
