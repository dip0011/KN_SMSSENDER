import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ active }) {
  const navigate = useNavigate();


  const handleContacts = () => {
    navigate("/");
  }

  const handleSmsList = () => {
    navigate("/smslist");
  }
  return (
    <>
      <ul className="nav nav-tabs my-1 mb-4">
        <li className="nav-item">
          <div onClick={handleContacts} className={active === 'contacts' ? 'nav-link active' : 'nav-link'}>Contacts</div>
        </li>
        <li className="nav-item">
        <div onClick={handleSmsList} className={active === 'smslist' ? 'nav-link active' : 'nav-link'}>SmsList</div>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
