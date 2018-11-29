describe('Money', () => {
  beforeEach(() => {
    jasmine.addCustomEqualityTester(moneyEquality)
  })

  it('can multiply an amount by a number', () => {
    const five = Money.euro(5)

    let product = five.times(2)

    expect(product).toEqual(Money.euro(10))
  })

  it('knows when two quantities are the same', () => {
    const five = Money.euro(5)
    const otherFive = Money.euro(5)
    const six = Money.euro(6)

    expect(five.isEqual(otherFive)).toBe(true)
    expect(five.isEqual(six)).toBe(false)
  })

  it('can distinguish between euros and dollars', () => {
    const fiveEuros = Money.euro(5)
    const fiveDollars = Money.dollar(5)

    expect(fiveEuros).not.toEqual(fiveDollars)
  })

  it('has a currency identifier', () => {
    const anyAmount = 5

    expect(Money.euro(anyAmount).currency()).toEqual('EUR')
    expect(Money.dollar(anyAmount).currency()).toEqual('USD')
  })

  it('preserves its currency after multiplying by a number', () => {
    expect(Money.euro(5).times(3).currency()).toEqual('EUR')
    expect(Money.dollar(5).times(3).currency()).toEqual('USD')
  })

  it('can add two money', () => {
    const anyAmount = 5
    const otherAmount = 3
    expect(Money.euro(anyAmount).add(Money.euro(otherAmount))).toEqual(Money.euro(8))
  })

  it('can not add two money from different currencies', () => {
    const anyAmount = 5
    const otherAmount = 3
    expect( function () {Money.euro(anyAmount).add(Money.dollar(otherAmount))} ).toThrow(new Error('Las monedas son diferentes'))
  })

  it('can convert euros to dollars', () => {
    const anyAmount = Money.euro(5)
    const exchange_currency = 'USD'
    expect(Bank.convert(anyAmount, exchange_currency)).toEqual(Money.dollar(10))
  })

  it('can convert dollars to euros', () => {
    const anyAmount = Money.dollar(10)
    const exchange_currency = 'EUR'
    expect(Bank.convert(anyAmount, exchange_currency)).toEqual(Money.euro(5))
  })

  it('can return a rate given two currencies', () => {
    const aCurrency = 'USD'
    const exchange_currency = 'EUR'
    expect(Bank.get_rate(aCurrency, exchange_currency)).toEqual(0.5)
  })

  it('can return a rate = 1 given two same currencies', () => {
    const aCurrency = 'USD'
    const exchange_currency = 'USD'
    expect(Bank.get_rate(aCurrency, exchange_currency)).toEqual(1)
  })

  it('can add two money from different currencies using a exchange rate', () => {
    const anyAmount = Money.dollar(5)
    const otherAmount = Money.euro(3)
    expect(Bank.add(anyAmount, otherAmount)).toEqual(Money.dollar(11))
  })

  function moneyEquality (a, b) {
    if(a instanceof Money && b instanceof Money) {
      return a.isEqual(b)
    }
  }
})
