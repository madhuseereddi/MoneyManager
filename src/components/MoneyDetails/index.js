import './index.css'

const MoneyDetails = props => {
  const {eachItem, accountBalance} = props
  const {name, title, className, imgUrl, alt, testid} = eachItem

  const amountObj = accountBalance.find(item => item.name === name)
  const amount = amountObj ? amountObj.amount : 0

  return (
    <li>
      <div className={`card-bg ${className}`}>
        <img src={imgUrl} alt={alt} className="img1" />
        <div className="inner-card">
          <p className="card-p1">{title}</p>
          <p className="card-p2" data-testid={testid}>
            Rs {amount}
          </p>
        </div>
      </div>
    </li>
  )
}

export default MoneyDetails
