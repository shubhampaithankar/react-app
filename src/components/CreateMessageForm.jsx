import React, { useEffect, useState } from 'react';
import { generateUniqueCode } from '../services/UtilService';
import { createMessage, getAllTransporters, replyMessage } from '../services/ApiService'; 

const CreateMessageForm = ({ user, messages }) => {
  const { role, address, id } = user
  return role === 'manufacturer' ? <ManufacturerForm address={address} id={id} /> : <TransporterForm messages={messages} id={id} />
};

const ManufacturerForm = ({ address, id }) => {
  const [orderID, setOrderID] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [transporters, setTransporters] = useState([]);
  const [selectedTransporter, setSelectedTransporter] = useState('');

  // const resetForm = () => {
  //   setOrderID('')
  //   setFrom('')
  //   setTo('')
  //   setQuantity('')
  //   setPickupAddress('')
  //   setSelectedTransporter('')
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      orderID,
      from,
      to,
      quantity,
      pickupAddress,
      transporter: selectedTransporter,
      manufacturer: id
    }
    createMessage(body)
  };

  const orderIdClick = () => setOrderID(generateUniqueCode())

  useEffect(() => {
    setPickupAddress(address)
    getAllTransporters()
      .then(response => setTransporters(response.data.transporters))
  }, [address, setPickupAddress])

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group m-2">
        <label htmlFor="orderId">Order ID</label>
        <input 
          className='form-control' 
          type="text" 
          placeholder="Order ID" 
          defaultValue={orderID} 
          id='orderId' required min={6} max={6}
          />
        <button type='button' className="btn btn-secondary my-2 mx-auto" onClick={orderIdClick}>
          Generate Order Id
        </button>
      </div>
      <div className="form-group m-2">
        <label htmlFor="from">From</label>
        <input className='form-control' type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} id='from' required/>
      </div>
      <div className="form-group m-2">
        <label htmlFor="to">To</label>
        <input className='form-control' type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} id='to' required/>
      </div>
      <div className="form-group m-2">
        <label htmlFor="selectQuantity">Select Quantity</label>
        <select className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)} id='selectQuantity' required aria-readonly>
          <option value="" disabled >Select Quantity</option>
          <option value="1">1 ton</option>
          <option value="2">2 tons</option>
          <option value="3">3 tons</option>
        </select>
      </div>
      <div className="form-group m-2">
        <label htmlFor="pickupAddress">Pickup Address</label>
        <input className='form-control' type="text" placeholder="Pickup Address" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} id='pickupAddress' required/>
      </div>
      <div className="form-group m-2">
        <label htmlFor="selectTransporter">Select Transporter</label>
        <select className='form-control' value={selectedTransporter} onChange={(e) => setSelectedTransporter(e.target.value)} id='selectTransporter' required>
          <option value="" disabled>Select Transporter</option>
          {
            transporters.map((transporter) => (
              <option key={transporter._id} value={transporter._id}>
                {transporter.name}
              </option>
            ))
          }
        </select>
      </div>
      <div className="btn-group m-2">
        <button className='btn btn-primary' type="submit">Send Message</button>
      </div>
    </form>
  );
}

const TransporterForm = ({ messages, id }) => {
  const [orderID, setOrderID] = useState('')
  const [price, setPrice] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      orderID, price
    }
    console.log(body)
    replyMessage(body)
  }
  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className="form-group m-2">
        <label htmlFor='orderId'>Order Id</label>
        <select name="orderId" id="orderId" className="form-control" onChange={e => setOrderID(e.target.value)} required value={orderID}>
        <option value="" disabled >Select Order ID</option>
          {messages.map((message) => {
            return (
              <option key={message._id} value={message.orderID}>
                {message.orderID}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group m-2">
        <label htmlFor='price'>Price</label>
        <input type="number" id='price' className="form-control" min={0} onChange={e => setPrice(e.target.value)} required/>
      </div>
      <div className="btn-group m-2">
        <button className="btn btn-success" type='submit'>Reply</button>
      </div>
    </form>
  )
}

export default CreateMessageForm;
