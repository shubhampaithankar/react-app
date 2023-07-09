import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import MessageList from '../components/MessageList'
import CreateMessageForm from '../components/CreateMessageForm'

import { socket } from '../services/ApiService'

const Dashboard = () => {
  const { user } = useSelector(state => state.auth)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.connect()
    socket.on('messages', (data) => {
      console.log(`message event`)
      setMessages(data)
    })

    return () => {
      socket.disconnect()
      console.log(`socket disconnected`)
    }
  }, [])

  return (
    <div className="row h-100">
      <div className="col-12">
        <h1 className="m-0 text-center">{ user.role }</h1>
      </div>
      {
        messages.length && (
          <>
            <div className="col-6">
              <div className="d-flex align-items-center justify-content-center h-100">
                <MessageList messages={messages} />
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex align-items-center justify-content-center h-100">
                <CreateMessageForm user={user} messages={messages} />
              </div>
            </div>
          </>
        )
      }    
    </div>
  ) 
}



export default Dashboard