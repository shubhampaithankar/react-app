import React, { useEffect, useState } from 'react'

const MessageList = ({ messages }) => {
  const [filteredItems, setFilteredItems] = useState([])
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleItemClick = (itemId) => {
    if (expandedItemId === itemId) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(itemId);
    }
  };

  useEffect(() => {
    setFilteredItems(messages)
  }, [filteredItems, messages])

  const onSearchInput = (event, type) => {
    const { value } = event.target;
    switch (type) {
      case 'orderId':
        setFilteredItems(messages.filter(item =>
          item.orderID.toLowerCase().startsWith(value.toLowerCase())
        ));
        break;
      case 'to':
        setFilteredItems(messages.filter(item =>
          item.to.toLowerCase().includes(value.toLowerCase())
        ));
        break;
      case 'from':
        setFilteredItems(messages.filter(item =>
          item.from.toLowerCase().includes(value.toLowerCase())
        ));
        break;
      default: setFilteredItems(messages)
        break;
    }
  };

  return (
    <div className="d-flex align-items-center flex-column justify-content-center h-100">
      <div className='d-flex align-items-center justify-content-evenly'>
        <div className="form-group m-2">
          <label htmlFor="orderID">Order ID</label>
          <input type="text" name="" id="orderId" className='form-control' onChange={e => onSearchInput(e, 'orderId')} />
        </div>
        <div className="form-group m-2">
          <label htmlFor="to">To</label>
          <input type="text" name="" id="to" className='form-control' 
            onChange={e => onSearchInput(e, 'to')}
           />
        </div>
        <div className="form-group m-2">
          <label htmlFor="from">From</label>
          <input type="text" name="" id="from" className='form-control' 
            onChange={e => onSearchInput(e, 'from')} 
          />
        </div>
      </div>
      <ul className='w-100 p-1 m-0'>
      {
        filteredItems.length ? filteredItems.map((message) => (
          <li key={message._id} className='border border-secondary rounded m-2 px-3 py-2'>
            <div style={{ cursor: 'pointer' }} onClick={() => handleItemClick(message._id)}>
              <div className="w-100 text-center">
                <h4 className='m-0'>
                  {message.orderID}
                </h4>
              </div>
            </div>
            { expandedItemId === message._id && (
              <div className="row" style={{ overflowX: 'scroll' }}>
                <div className="col-4">
                  <div className="d-flex flex-row align-items center w-100 justify-content-evenly">
                    <p className="m-0 p-0">
                      From: {message.from}
                    </p>
                    <p className="m-0 p-0">
                      To: {message.to}
                    </p>
                  </div>
                </div>
                <div className="col-2">
                  <h6 className="m-0">
                    Price: {message.price}
                  </h6>
                </div>
                <div className="col-2">
                  <h6 className="m-0">
                    Quantity: {message.quantity}
                  </h6>
                </div>
                <div className="col-4">
                  <h6 className="m-0">
                    Manufacturer: {message.manufacturer}
                  </h6>
                </div>
              </div>
            )}
          </li>
        )) : <>No items found</>
      }
    </ul>
    </div>
  )
}

export default MessageList