import React from 'react'
import SetPinNum from '../../assets/SetPin.svg'
import './settings.css'
import ModalPin from './ModalPin'
import { useState } from 'react'

function Settings() {
    const [showModal, setShowModal] = useState(false)
  return (
    <>
       <div className='setpin'>
        <img src={SetPinNum} alt="set pin" style={{height:'70px', width: '70px'}} />
        <div className='content-st mt-2 ml-2'>
            <p className='heading-st'>Set your Pin</p>
            <p className='sub-heading-st'>Configure a 4 digit PIN for performing secure operations (e.g. Trigger)</p>
        </div>
        <button type="button" className='config-btn' onClick={() => setShowModal(true)}>
          Configure
        </button>
        </div>
        <ModalPin showModal={showModal} setShowModal={setShowModal}/>
        </>
  )
}

export default Settings