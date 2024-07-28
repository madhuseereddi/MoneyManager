import {Component} from 'react'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const moneyDetailsCard = [
  {
    name: 'Balance',
    title: 'Your Balance',
    className: 'balance-card',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
    alt: 'balance',
    testid: 'balanceAmount',
  },
  {
    name: 'Income',
    title: 'Your Income',
    className: 'income-card',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
    alt: 'income',
    testid: 'incomeAmount',
  },
  {
    name: 'Expenses',
    title: 'Your Expenses',
    className: 'expense-card',
    imgUrl:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
    alt: 'expenses',
    testid: 'expensesAmount',
  },
]

class MoneyManager extends Component {
  state = {
    type: 'INCOME',
    title: '',
    amount: '',
    historyList: [],
  }

  getTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  getAmount = event => {
    this.setState({
      amount: event.target.value,
    })
  }

  getType = event => {
    this.setState({
      type: event.target.value,
    })
  }

  onButton = event => {
    event.preventDefault()

    const {type, title, amount, historyList} = this.state

    if (title && amount) {
      const listObj = {
        id: uuidv4(),
        title,
        amount: parseInt(amount),
        type,
      }

      this.setState(prevState => ({
        historyList: [...prevState.historyList, listObj],
        title: '',
        type: 'INCOME',
        amount: '',
      }))
    }
  }

  deleteItem = id => {
    this.setState(prevState => ({
      historyList: prevState.historyList.filter(eachItem => eachItem.id !== id),
    }))
  }

  calculateIncome = () => {
    const {historyList} = this.state
    return historyList
      .filter(eachItem => eachItem.type === 'INCOME')
      .reduce((acc, curr) => acc + curr.amount, 0)
  }

  calculateExpenses = () => {
    const {historyList} = this.state
    return historyList
      .filter(eachItem => eachItem.type === 'EXPENSES')
      .reduce((acc, curr) => acc + curr.amount, 0)
  }

  render() {
    const {historyList, title, type, amount} = this.state
    const totalIncome = this.calculateIncome()
    const totalExpenses = this.calculateExpenses()
    const balanceTotal = totalIncome - totalExpenses

    return (
      <div className="full-bg">
        <div className="inner1">
          <h1 className="head1">Hi, Richard</h1>
          <p className="para1">
            Welcome back to your <span className="span1">Money Manager</span>
          </p>
        </div>

        <ul className="card-ul">
          {moneyDetailsCard.map(eachItem => (
            <MoneyDetails
              eachItem={eachItem}
              key={eachItem.name}
              accountBalance={[
                {name: 'Balance', amount: balanceTotal},
                {name: 'Income', amount: totalIncome},
                {name: 'Expenses', amount: totalExpenses},
              ]}
            />
          ))}
        </ul>
        <div className="down-part">
          <div className="down1">
            <h1 className="head2">Add Transaction</h1>
            <form className="fullfrom" onSubmit={this.onButton}>
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input1"
                placeholder="Title"
                onChange={this.getTitle}
                value={title}
              />
              <label htmlFor="amount" className="title">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input1"
                placeholder="Amount"
                onChange={this.getAmount}
                value={amount}
              />
              <label htmlFor="type" className="title">
                TYPE
              </label>
              <select
                className="input1"
                id="type"
                onChange={this.getType}
                value={type}
              >
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>

              <button type="submit" className="btn1">
                Add
              </button>
            </form>
          </div>
          <div className="down2">
            <h1 className="head2">History</h1>
            <div className="table1">
              <div className="headings">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </div>

              <ul className="ulist">
                {historyList.map(transaction => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    deleteItem={this.deleteItem}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
