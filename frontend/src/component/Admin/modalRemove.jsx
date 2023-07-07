import { EuiForm, EuiFormRow, EuiModal, EuiModalHeader, EuiModalBody, EuiModalFooter, EuiModalHeaderTitle, EuiTabbedContent, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiFieldText, EuiLink, EuiSelect, EuiFilePicker, EuiTableHeader, EuiTableRow, EuiTableRowCell, EuiTableBody, EuiTable, EuiTableHeaderCell, EuiButton, EuiSpacer, EuiTitle, EuiText } from "@elastic/eui";

import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

import React, { useEffect, useState } from 'react';

const MyModalRemove = ({ closeModal ,meterDataList,metersListShow,tenantsListShow,tenentId}) => {
    const [meter, setMeter] = useState([]);
  

  const assignRemoveMeter = async (idTenent, idMeter) => {
    try {
      const response = await fetch(`/tenants/${idTenent}/assignedMeter/${idMeter}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        toast.success("Meter Assigned Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true
        });
       
        closeModal();
       
      }
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true
      });
    }
  }

  const fetchData = async () => {
    tenantsListShow();
  };

  useEffect(() => {
    if (closeModal) {
      fetchData();
    }
  }, [closeModal, metersListShow]);

  useEffect(() => {
    setMeter(meterDataList);
   }, []);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  
    return (
        <>
            <div className="modal-wrapper" onClick={closeModal}>
            </div>
            <div className="modal-container">
               <EuiTitle><h3>Meter List</h3></EuiTitle>
               <EuiSpacer/>
               <EuiTable >
                        <EuiTableHeader>
                            <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Meter</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Action</EuiTableHeaderCell>
                        </EuiTableHeader>

                        <EuiTableBody >
                            {meter.map((item,index)=>(
                                <EuiTableRow  key={index}>
                                <EuiTableRowCell>{index+1}</EuiTableRowCell>
                                <EuiTableRowCell>{item.deviceName}</EuiTableRowCell>
                                <EuiTableRowCell>
                                    <EuiFlexGroup>
                                        <EuiFlexItem >
                                            <EuiButton color="primary" fill size="s" onClick={()=> assignRemoveMeter(tenentId,item.id)}>Remove</EuiButton>
                                        </EuiFlexItem>
                                  
                                    </EuiFlexGroup>
                                </EuiTableRowCell>
                           </EuiTableRow>

                            )) }
                                
                        </EuiTableBody>
                    </EuiTable>
               <ToastContainer />
            </div>
          
        </>
    )
}
export default MyModalRemove;