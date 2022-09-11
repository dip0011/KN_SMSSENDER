import React, { useState, useEffect } from "react";
import axios from "axios";
import moment  from 'moment';
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SmsList() {
  const [smslist, setSmslist] = useState([]);

  const getSmslist = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getSmslist`);
      setSmslist(res.data.smslist);
    }catch(err){
      toast.error(err.response?.data.message || "Something went wrong");
    }
  }

  useEffect(() => {
    getSmslist();
  }, []);

  return (
    <>
      <ToastContainer />
      <Navbar active={"smslist"}/>
      <div className="container-xxl">
        <table className="table table-hover table-bordered border-light table-xl">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">OTP</th>
              <th scope="col">TIME</th>
            </tr>
          </thead>
          <tbody>
            {smslist ? smslist.map((smslist, index) => {
              return (
                <tr key={index}>
                  <td>{smslist.contact.firstName}</td>
                  <td>{smslist.contact.lastName}</td>
                  <td>{smslist.otp}</td>
                  <td>{moment(smslist.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                </tr>
              )
            }): null}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SmsList;
