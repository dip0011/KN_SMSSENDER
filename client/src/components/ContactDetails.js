import React, { useState, useEffect } from "react";
import axios from "axios";
import ClickButton from "./Buttons/ClickButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactDetails({ details, setShowContactDetails}) {
    const [showSendModal, setShowSendModal] = useState(false);
    const [otp, setOtp] = useState(123456);
    const [textField, setTextField] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/addSmslist`,{
                otp,
                text: textField,
                contactDetails: details,
            });
            toast.success("SMS sent successfully");
            setShowSendModal(false);
        }catch(err){
            toast.error(err.response?.data.message || "Something went wrong");
        }
    }

    useEffect(()=>{
        const genOtp = Math.ceil(Math.random() * 1000000);
        setOtp(genOtp);
        setTextField(`Hi, Your OTP is: ${genOtp}.`);
    },[showSendModal]);

    return (
        <>
            <ToastContainer />
            {!showSendModal ?
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div onClick={() => setShowSendModal(true)}><ClickButton>Send SMS</ClickButton></div>
                            <button type="button" className="btn-close" onClick={() => setShowContactDetails(false)}></button>
                        </div>
                        <div className="modal-body">
                            <span className="m-2 d-flex justify-content-between">
                                <div>FirstName:<span className="fw-bold ps-2">{details.firstName}</span></div>
                                <div>LastName:<span className="fw-bold ps-2">{details.lastName}</span></div>
                            </span>
                            <div className="m-2 mt-4">Contact No:<span className="fw-bold ps-2">{details.contactNo}</span></div>
                        </div>
                    </div>
                </div>
            :
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="fw-bold">Write SMS</div>
                            <button type="button" className="btn-close" onClick={() => setShowSendModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => handleSubmit(e)} className="d-flex flex-column gap-4 align-items-center">
                                <input
                                    type="text"
                                    name="smsText"
                                    className="mb-3 form-control"
                                    value={textField}
                                    onChange={(e) => setTextField(e.target.value)}
                                    placeholder="SMS TEXT"
                                />
                                <button type="submit" className="px-4 py-1 btn btn-primary">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ContactDetails