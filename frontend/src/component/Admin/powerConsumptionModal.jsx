import { EuiForm, EuiFormRow, EuiModal, EuiModalHeader, EuiModalBody, EuiModalFooter, EuiModalHeaderTitle, EuiTabbedContent, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiFieldText, EuiLink, EuiSelect, EuiFilePicker, EuiTableHeader, EuiTableRow, EuiTableRowCell, EuiTableBody, EuiTable, EuiTableHeaderCell, EuiButton, EuiSpacer, EuiTitle, EuiText } from "@elastic/eui";

import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';

const MyPower = ({ closeModal,powerConsumption }) => {
    const [meter, setMeter] = useState([]);
    const dataConsumption= meter.consumption;
    const number = parseFloat(dataConsumption);
    const formattedConsumption= number.toFixed(3);
    
    useEffect(() => {
        setMeter(powerConsumption);
     
    }, []);
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, [])

   
    return (
        <>
            <div className="modal-wrapper" onClick={closeModal}>
            </div>
            <div className="modal-container">
                <EuiTitle><h3>Cost Per Kwh Consumption</h3></EuiTitle>
                <EuiSpacer />
                <EuiTitle><h2>Rs.{formattedConsumption}</h2></EuiTitle>
          
             
            </div>

        </>
    )
}
export default MyPower;

