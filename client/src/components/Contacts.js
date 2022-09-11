import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ContactDetails from "./ContactDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [contactDetails, setContactDetails] = useState({});

  const getContactsList = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getContacts`);
      setContacts(res.data.contacts);
    }catch(err){
      toast.error(err.response?.data.message || "Something went wrong");
    }
  }
  const showDetails = (contact) => {
    setShowContactDetails(true);
    setContactDetails(contact);
  }

  useEffect(() => {
    getContactsList();
  }, []);
  

  return (
    <>
      <ToastContainer />
      <Navbar active={"contacts"}/>
      {showContactDetails ? <ContactDetails details={contactDetails} setShowContactDetails={setShowContactDetails}/> : 
        <div className="d-flex flex-wrap">
          {contacts ? contacts.map((contact, index) => {
            return (
              <div key={index} className="m-2 p-2 bg-light text-dark border border-primary rounded-2">
                <span className="px-1">{contact.firstName}</span>
                <span>{contact.lastName}</span>
                <span className="ps-3 pe-2 text-primary" onClick={() => showDetails(contact)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                  </svg>
                </span>
              </div>
            )
          }): null}
        </div>
      }
    </>
  );
}

export default Contacts;
