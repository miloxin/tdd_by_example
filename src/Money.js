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
    if (this._currency == money._currency){
      return new Money(this._amount + money._amount, this._currency)
    } else {
      throw new Error('Las monedas son diferentes')
    }

  }

  _sameAmountAs(money) {
    return this._amount === money._amount
  }

  _sameCurrencyAs(money) {
    return this._currency === money._currency
  }
}

class Bank {

  static convert(money, exchange_currency){
    let rate = this.get_rate(money._currency, exchange_currency);
    return new Money(money._amount * rate, exchange_currency)
  }

  static add (money1, money2) {
    let money2_exchange = this.convert(money2, money1._currency)
    let money_total = money1.add(money2_exchange)
    return money_total
  }

  static get_rate(currency, exchange_currency){
      let rate;
    if (currency == exchange_currency){
      rate = 1;
    }else if (currency == 'EUR'){
       rate = 2;
    } else if (currency == 'USD'){
      rate = 0.5;
    }

    return rate
  }
}
