import './index.css'

const TransactionItem = props => {
  const {transaction, deleteItem} = props
  const {id, title, amount, type} = transaction

  const clickDelete = () => {
    deleteItem(id)
  }

  return (
    <li className="transaction-item">
      <hr className="innerhr" />
      <div className="headings1">
        <p className="p1">{title}</p>
        <p className="p1">{amount}</p>
        <p className="para10 p1">{type}</p>
        <button
          type="button"
          className="delete-button"
          onClick={clickDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="img3"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
