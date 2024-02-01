import React from 'react'
import './invoice.css'

const Invoice = () => {
  return (
    <div className='invoice-page'>
     <h2>Invoice</h2>
     <div className="invoice-details">
        <p>Subsciption Type: Monthly</p>
        <p>Streaming Quality: HD</p>
        <p>Billing Amount:  ₹199 / month</p>
     </div>
     <button className="subscribe-btn">Pay Now</button>
    </div>
  )
}

export default Invoice
