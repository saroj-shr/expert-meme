import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { EuiForm, EuiFormRow, EuiModal, EuiModalHeader, EuiModalBody, EuiModalFooter, EuiModalHeaderTitle, EuiTabbedContent, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiFieldText, EuiLink, EuiSelect, EuiFilePicker, EuiTableHeader, EuiTableRow, EuiTableRowCell, EuiTableBody, EuiTable, EuiTableHeaderCell, EuiButton, EuiSpacer, EuiTitle, EuiText } from "@elastic/eui";
import { ToastContainer, toast } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";
import MyModal from "./modal";
import MyModalRemove from "./modalRemove";



const Admin = () => {

    /***for redirect to tabs*/

    const [activeTabId, setActiveTabId] = useState('example1');

    const handleTabClick = (id) => {
        setActiveTabId(id);

    };

    ///assign button action ends

    /***for redirect to tab ends*/

    const navigate = useNavigate();
    //Drop down field
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('');


    const handleOptionSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setTenants({ ...tenants, status: selectedValue === 'option1' ? true : false });
    };

    const handleOptionSelect1 = (event) => {
        const selectedValue1 = event.target.value;
        setSelectedOption1(selectedValue1);
        setmeters({ ...meters, status: selectedValue1 === 'option1' ? true : false });
    };

    const options = [
        { value: 'option1', text: 'Enable' },
        { value: 'option2', text: 'Disable' },

    ];


    /*********************meters start dropdown */
    const [optionsMeters, setOptionsMeters] = useState([]);
    const [selectedOptionMeter, setSelectedOptionMeter] = useState('');


    /*********************meters start dropdown ends */

    /** All API Call For Tenants CRUD Starts  */
    //get all users
    const [tenantsList, setTenantsList] = useState([]);

    const tenantsListShow = async () => {
        try {
            const res = await fetch('/tenants', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            });

            if (res.status === 200) {
                const data = await res.json();
                setTenantsList(data);
            } else {
                throw new Error('Failed to fetch items');
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
        }
    };

    //add new tenants
    const [tenants, setTenants] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        status: true,

    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setTenants({ ...tenants, [name]: value });
    };


    const addTenats = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, phoneNumber, status } = tenants;

        if (!firstName || !lastName || !email || !phoneNumber) {
            console.log("Please fill all fields");
            toast.error("Please fill all fields", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            return;
        }

        try {
            const response = await fetch("/tenants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    status,
                    // assignedMeter: selectedOptionMeter, // Assign selected meter ID to tenant


                }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Tenants Added Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });
                console.log("Tenants Added Successfully");
                // Set the input fields to empty
                setTenants({
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    status: true,
                });

                // // Fetch the updated list of tenants from the backend
                // const updatedTenantsResponse = await fetch("/tenants");
                // const updatedTenantsData = await updatedTenantsResponse.json();
                // setTenantsList(updatedTenantsData); // Update the tenants list state with the new data

            } else {
                const errors = data.errors;
                if (errors) {
                    console.log("Backend Errors:", Object.values(errors).join("\n"));
                    const errorMessage = Object.values(errors).join("\n");
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    });


                } else {
                    toast.error("Invalid Tenants Added", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    });

                    console.log("Invalid Tenants Added");
                }
            }

        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            console.log("Error:", error);

        }
    };
    // Delete API call
    const [deleteTenants, setDeleteTenants] = useState([]);

    const deleteTenantsRequest = async (id) => {

        try {
            const res = await fetch(`/tenants/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 204) {
                setTenantsList((prevtenantsList) =>
                    prevtenantsList.filter((tenant) => tenant.id !== id)
                );
                toast.success("Tenants deleted successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });

            } else {
                throw new Error('Failed to delete tenants');
            }
        } catch (error) {
            console.log(error);
            toast.success(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
        }
    };
    //get id data api call
    const [isEditing, setIsEditing] = useState(false);

    const editTenantsRequest = async (id) => {
        console.log(id);

        try {
            const res = await fetch(`/tenants/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) { // Check for a successful response
                const updatedTenant = await res.json(); // Parse the response body
                setIsEditing(true);
                setTenants({
                    id: updatedTenant.id,
                    firstName: updatedTenant.firstName,
                    lastName: updatedTenant.lastName,
                    email: updatedTenant.email,
                    phoneNumber: updatedTenant.phoneNumber,
                    status: updatedTenant.status,
                });
                setSelectedOption(updatedTenant.status ? 'option1' : 'option2');

                toast.success('Tenants edited successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
               
                setActiveTabId("example2");
            } else if (res.status === 404) {
                throw new Error('Tenant not found');
            } else {
                throw new Error('Failed to edit tenants');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
            });
        }
    };
    //edit api back
    const editTenats = async (id) => {
        const { firstName, lastName, email, phoneNumber, status } = tenants;

        if (!firstName || !lastName || !email || !phoneNumber) {
            console.log("Please fill all fields");
            toast.error("Please fill all fields", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            return;
        }

        try {
            const response = await fetch(`/tenants/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phoneNumber,
                    status,


                }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Tenants Edited Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });
                console.log("Tenants Edited Successfully");
                  // Set the input fields to empty
                  setTenants({
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    status: true,
                });
                // // Fetch the updated list of tenants from the backend
                // const updatedTenantsResponse = await fetch("/tenants");
                // const updatedTenantsData = await updatedTenantsResponse.json();
                // setTenantsList(updatedTenantsData); // Update the tenants list state with the new data

            } else {
                const errors = data.errors;
                if (errors) {
                    console.log("Backend Errors:", Object.values(errors).join("\n"));
                    const errorMessage = Object.values(errors).join("\n");
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    });


                } else {
                    toast.error("Invalid Tenants Edited", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    });

                    console.log("Invalid Tenants Edited");
                }
            }

        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            console.log("Error:", error);

        }

    }

    const handleStatusChange = async (id, status) => {
        try {
            const res = await fetch(`/tenants/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (res.status === 200) {
                // Update the tenantsList state or the data source where you store the data
                const updatedTenantsList = tenantsList.map((item) => {
                    if (item.id === id) {
                        return { ...item, status };
                    }
                    return item;
                });
                toast.success("Status Updated Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });
                setTenantsList(updatedTenantsList);
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
            });
        }
    };






    /** All API Call For Tenants CRUD ends  */

    /******************************************************************************************************************************************* */

    /** Meter API Call CRUD */

    // Add new meters
    const [meters, setmeters] = useState({
        id: "",
        impkwh: "",
        hardwareId: "",
        deviceName: "",
        manufacture: "",
        status: true,
    });

    const handleInputsmeters = (e) => {
        const { name, value } = e.target;
        setmeters({ ...meters, [name]: value });
    };

    const addmeters = async (e) => {
        if (e) {
            e.preventDefault();
        }
        const { hardwareId, deviceName, manufacture, status } = meters;

        if (!hardwareId || !deviceName || !manufacture) {
            console.log("Please fill all fields");
            toast.error("Please fill all fields", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            return;
        }

        try {
            const response = await fetch("/meters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    hardwareId,
                    deviceName,
                    manufacture,
                    status,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("meters Added Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
                console.log("meters Added Successfully");
                setmeters({
                    id: "",
                    impkwh: "",
                    hardwareId: "",
                    deviceName: "",
                    manufacture: "",
                    status: true,
                })
                // Fetch the updated list of meters from the backend
                const updatedmetersResponse = await fetch("/meters");
                const updatedmetersData = await updatedmetersResponse.json();
                setMetersList(updatedmetersData); // Update the meters list state with the new data
            } else {
                const errors = data.errors;
                if (errors) {
                    console.log("Backend Errors:", Object.values(errors).join("\n"));
                    const errorMessage = Object.values(errors).join("\n");
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                    });
                } else {
                    toast.error("Invalid meters Added", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                    });
                    console.log("Invalid meters Added");
                }
            }
        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
            });
            console.log("Error:", error);
        }
    };

    //get all meters
    const [metersList, setMetersList] = useState([]);

    const metersListShow = async () => {
        try {
            const res = await fetch('/meters', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            });

            if (res.status === 200) {
                const data = await res.json();
                setMetersList(data);
            } else {
                throw new Error('Failed to fetch items');
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
        }
    };
    // Delete API call for meters
    const deleteMetersRequest = async (id) => {

        try {
            const res = await fetch(`/meters/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 204) {
                setMetersList((prevmetersList) =>
                    prevmetersList.filter((meters) => meters.id !== id)
                );
                toast.success("Meters deleted successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });

            } else {
                throw new Error('Failed to delete Meters');
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
        }
    };

    //get id data api call for meters
    const [isEditingMeters, setIsEditingMeters] = useState(false);

    const editMetersRequest = async (id) => {
        console.log(id);

        try {
            const res = await fetch(`/meters/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) { // Check for a successful response
                const updatedMeter = await res.json(); // Parse the response body
                setIsEditingMeters(true);
                setmeters({
                    id: updatedMeter.id,
                    hardwareId: updatedMeter.hardwareId,
                    deviceName: updatedMeter.deviceName,
                    manufacture: updatedMeter.manufacture,
                    status: updatedMeter.status,
                });
                setSelectedOption1(updatedMeter.status ? 'option1' : 'option2');

                toast.success('Meters edited Request Send successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
                setActiveTabId('example4');
            } else if (res.status === 404) {
                throw new Error('Meter not found');
            } else {
                throw new Error('Meter to edit tenants');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
            });
        }
    };

    //edit api back for meters
    const editMeters = async (id) => {
        const { hardwareId, deviceName, manufacture, status } = meters;

        if (!hardwareId || !deviceName || !manufacture) {
            console.log("Please fill all fields");

            toast.error("Please fill all fields", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            return;
        }
        try {
            const response = await fetch(`/meters/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hardwareId,
                    deviceName,
                    manufacture,
                    status,

                }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Meters Edited Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });
                console.log("Meters Edited Successfully");
                setmeters({
                    id: "",
                    impkwh: "",
                    hardwareId: "",
                    deviceName: "",
                    manufacture: "",
                    status: true,
                })
                // // Fetch the updated list of tenants from the backend
                // const updatedMetersResponse = await fetch("/meters");
                // const updatedMetersData = await updatedMetersResponse.json();
                // setMetersList(updatedMetersData); // Update the tenants list state with the new data

            } else {
                const errors = data.errors;
                if (errors) {
                    console.log("Backend Errors:", Object.values(errors).join("\n"));
                    const errorMessage = Object.values(errors).join("\n");
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    });


                } else {
                    toast.error("Invalid Meters Edited", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    });

                    console.log("Invalid Meters Edited");
                }
            }

        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            console.log("Error:", error);

        }

    }
    // Handle status change for Meters
    const handleStatusChangeMeters = async (id, status) => {
        try {
            const res = await fetch(`/meters/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (res.status === 200) {
                // Update the tenantsList state or the data source where you store the data
                const updatedMetersList = metersList.map((item) => {
                    if (item.id === id) {
                        return { ...item, status };
                    }
                    return item;
                });
                toast.success("Status Updated Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });
                setMetersList(updatedMetersList);
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
            });
        }
    };




    // Meters CRUD ENDS 
    /************************************************************************************************************************************************************** */
    //logout

    const callLogout = async () => {
        try {
            // Remove the 'token' cookie
            Cookies.remove('token');
            // Redirect to the homepage or login page
            navigate('/'); // Assuming you have the necessary routing logic in place
        } catch (err) {
            console.log(err);
            navigate('/');
        }
    };
    /*************************************logout complete */

    /**********************show meter name api */
    ///assign button action start
    const [showModal, setShowModal] = useState(false);
    const [metersName, setMetersName] = useState([]);
    const closeModal = () => {
        return setShowModal(false);
    }
    const [tenentId, setTenetId] = useState();

    const handleAssignClick = async (tenentIdSet) => {


        try {
            const res = await fetch('/meters', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            });

            if (res.status === 200) {
                const data = await res.json();
                setShowModal(true);
                setMetersName(data)
                setTenetId(tenentIdSet);


            } else {
                throw new Error('Failed to fetch items');
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
        }

    };

    /////
    const [showMyModal, setShowMyModal] = useState(false);
    const [metersMyName, setMetersMyName] = useState([]);
    const closeMyModal = () => {
        return setShowMyModal(false);
    }

    const handleRemoveClick = async (tenentIdSet) => {


        try {
            const res = await fetch(`/tenants/${tenentIdSet}/assignedMeter/`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            });

            if (res.status === 200) {
                const data = await res.json();


                setShowMyModal(true);
                setMetersMyName(data)
                setTenetId(tenentIdSet);


            } else {
                throw new Error('Failed to fetch items');
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
        }

    };

    /**********************show meter name api */


    /******************************************************************************************************************************************* */

    /** Cash API Call CRUD */

    // Add new cash
    const [cash, setcash] = useState({
        costPerKwhNew: 0.0,
    });

    const handleInputscash = (e) => {
        const { name, value } = e.target;
        setcash({ ...cash, [name]: value });
    };

    const addcash = async (e) => {
        if (e) {
            e.preventDefault();
        }


        const { costPerKwhNew } = cash;
        // Convert costPerKwh from string to float
        const costPerKwh = parseFloat(costPerKwhNew);
        console.log(costPerKwh, "PPPPPPPPPPPPPppppp")


        if (!costPerKwh) {
            console.log("Please fill all fields");
            toast.error("Please fill all fields", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            return;
        }

        try {
            const response = await fetch("/cash", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    costPerKwh
                }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Cash Added Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
                setcash({
                    costPerKwhNew: 0.0,
                })
                console.log("cash Added Successfully");
            } else {
                const errors = data.errors;
                if (errors) {
                    console.log("Backend Errors:", Object.values(errors).join("\n"));
                    const errorMessage = Object.values(errors).join("\n");
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                    });
                } else {
                    toast.error("Invalid Cash Added", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                    });
                    console.log("Invalid Cash Added");
                }
            }
        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
            });
            console.log("Error:", error);
        }
    };



    //get all cash
    const [cashList, setCashList] = useState([]);

    const cashListShow = async () => {
        try {
            const res = await fetch('/cash', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            });

            if (res.status === 200) {
                const data = await res.json();
                setCashList(data);
            } else {
                throw new Error('Failed to fetch cash');
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
        }
    };
    // Delete API call for cash
    const deleteCashRequest = async (id) => {

        try {
            const res = await fetch(`/cash/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 204) {
                setCashList((prevcashList) =>
                    prevcashList.filter((cash) => cash.id !== id)
                );
                toast.success("Cash deleted successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });

            } else {
                throw new Error('Failed to delete Cash');
            }
        } catch (error) {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
        }
    };

    //get id data api call for cash
    const [isEditingCash, setIsEditingCash] = useState(false);

    const editCashRequest = async (id) => {
        console.log(id);

        try {
            const res = await fetch(`/cash/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) { // Check for a successful response
                const updatedCash = await res.json(); // Parse the response body
                setIsEditingCash(true);
                setcash({
                    id: updatedCash.id,
                    costPerKwhNew: updatedCash.costPerKwh,
                });
                toast.success('Cash edited Request Send successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true,
                });
                setActiveTabId('example6');
            } else if (res.status === 404) {
                throw new Error('Cash not found');
            } else {
                throw new Error('Cash to edit tenants');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true,
            });
        }
    };

    //edit api back for cash
    const editCash = async (id) => {
        const { costPerKwhNew } = cash;
        // Convert costPerKwh from string to float
        const costPerKwh = parseFloat(costPerKwhNew);

        if (!costPerKwh) {
            console.log("Please fill all fields");
            toast.error("Please fill all fields", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            return;
        }
        try {
            const response = await fetch(`/cash/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    costPerKwh

                }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Cash Edited Successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: true
                });
                setcash({
                    costPerKwhNew: 0.0,
                })
                console.log("Cash Edited Successfully");
                // Fetch the updated list of cash from the backend
                const updatedCashResponse = await fetch("/cash");
                const updatedCashData = await updatedCashResponse.json();
                setMetersList(updatedCashData); // Update the cash list state with the new data

            } else {
                const errors = data.errors;
                if (errors) {
                    console.log("Backend Errors:", Object.values(errors).join("\n"));
                    const errorMessage = Object.values(errors).join("\n");
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    });


                } else {
                    toast.error("Invalid Cash Edited", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true
                    });

                    console.log("Invalid Cash Edited");
                }
            }

        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: true
            });
            console.log("Error:", error);

        }

    }
    // // Handle status change for Meters
    // const handleStatusChangeMeters = async (id, status) => {
    //     try {
    //         const res = await fetch(`/meters/${id}/status`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ status }),
    //         });

    //         if (res.status === 200) {
    //             // Update the tenantsList state or the data source where you store the data
    //             const updatedMetersList = metersList.map((item) => {
    //                 if (item.id === id) {
    //                     return { ...item, status };
    //                 }
    //                 return item;
    //             });
    //             toast.success("Status Updated Successfully", {
    //                 position: toast.POSITION.TOP_RIGHT,
    //                 autoClose: true
    //             });
    //             setMetersList(updatedMetersList);
    //         } else {
    //             throw new Error('Failed to update status');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.message, {
    //             position: toast.POSITION.TOP_RIGHT,
    //             autoClose: true,
    //         });
    //     }
    // };





    // Cash CRUD ENDS 
    /************************************************************************************************************************************************************** */


    const tabs = [
        {
            id: 'example1',
            name: "Home",
            content: 'Welcome, Admin!.',
        },
        {
            id: 'example2',
            name: 'Tenant Add',
            content: (
                <EuiForm component="form" >
                    <EuiSpacer />
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiFormRow label="First Name" >
                                <EuiFieldText name="firstName" onChange={handleInputs} value={tenants.firstName} />
                            </EuiFormRow>
                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiFormRow label="Last Name" >
                                <EuiFieldText name="lastName" onChange={handleInputs} value={tenants.lastName} />
                            </EuiFormRow>
                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiFormRow label="Email" >
                                <EuiFieldText name="email" onChange={handleInputs} value={tenants.email} />
                            </EuiFormRow>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiSpacer />

                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiFormRow label="Phone Number" >
                                <EuiFieldText name="phoneNumber" onChange={handleInputs} value={tenants.phoneNumber} />
                            </EuiFormRow>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFormRow label="Status" >
                                <EuiSelect options={options} value={selectedOption} onChange={handleOptionSelect} />
                            </EuiFormRow>
                        </EuiFlexItem>

                        {/* <EuiFlexItem>
                            <EuiFormRow label="Meters" >
                                <EuiSelect options={optionsMeters} value={selectedOptionMeter} onChange={handleOptionSelectMeter} />
                            </EuiFormRow>
                        </EuiFlexItem> */}
                        {/* <EuiFlexItem>
                            <EuiFormRow label="Remarks" >
                                <EuiFieldText name="remarks" onChange={handleInputs} value={tenants.remarks}/>
                            </EuiFormRow>
                        </EuiFlexItem> */}

                    </EuiFlexGroup>


                    <EuiSpacer />
                    <EuiSpacer />
                    {isEditing ? (
                        <EuiButton type="button" fill onClick={() => { editTenats(tenants.id) }} >
                            Edit Tenant
                        </EuiButton>
                    ) : (
                        <EuiButton type="button" fill onClick={addTenats} >
                            Save Tenant
                        </EuiButton>
                    )}


                </EuiForm>



            ),
        },
        {
            id: 'example3',
            name: <div onClick={() => tenantsListShow()}>Tenant List</div>,
            content: (
                <>
                    <EuiTable >
                        <EuiTableHeader>
                            <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
                            <EuiTableHeaderCell>First Name</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Last Name</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Email</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Phone Number</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Status</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Status Perform</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Meter</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Assigned Meter</EuiTableHeaderCell>
                            <EuiTableHeaderCell>Action</EuiTableHeaderCell>
                            {/* <EuiTableHeaderCell>Remarks</EuiTableHeaderCell> */}
                        </EuiTableHeader>

                        <EuiTableBody >
                            {tenantsList.map((item, index) => (
                                <EuiTableRow key={index} >
                                    <EuiTableRowCell>{index + 1}</EuiTableRowCell>
                                    <EuiTableRowCell>{item.firstName}</EuiTableRowCell>
                                    <EuiTableRowCell>{item.lastName}</EuiTableRowCell>
                                    <EuiTableRowCell>{item.email}</EuiTableRowCell>
                                    <EuiTableRowCell>{item.phoneNumber}</EuiTableRowCell>
                                    <EuiTableRowCell>{item.status ? 'Enable' : 'Disable'}</EuiTableRowCell>
                                    {item.status ? (
                                        <EuiTableRowCell><EuiButton color="danger" fill size="s" onClick={() => handleStatusChange(item.id, false)}>Disable</EuiButton></EuiTableRowCell>
                                    ) : (
                                        <EuiTableRowCell><EuiButton color="primary" fill size="s" onClick={() => handleStatusChange(item.id, true)}>Enable</EuiButton></EuiTableRowCell>
                                    )}
                                    {item.assignedMeter.length !== 0 ? (
                                        <EuiTableRowCell>{item.assignedMeter[0].deviceName}</EuiTableRowCell>
                                    ) : (
                                        <EuiTableRowCell><EuiButton color="success" fill size="s" onClick={() => handleAssignClick(item.id)}>Assign</EuiButton></EuiTableRowCell>
                                    )}

                                    <EuiTableRowCell><EuiButton color="danger" fill size="s" onClick={() => handleRemoveClick(item.id)}>Remove</EuiButton></EuiTableRowCell>

                                    <EuiTableRowCell>
                                        <EuiFlexGroup>
                                            <EuiFlexItem >
                                                <EuiButton color="primary" fill size="s" onClick={() => { editTenantsRequest(item.id); }}><EuiIcon type="documentEdit" size="m" /></EuiButton>
                                            </EuiFlexItem>
                                            <EuiFlexItem >
                                                <EuiButton color="danger" fill size="s" onClick={() => deleteTenantsRequest(item.id)}><EuiIcon type="trash" size="m" /></EuiButton>
                                            </EuiFlexItem>
                                        </EuiFlexGroup>
                                    </EuiTableRowCell>
                                    {/* <EuiTableRowCell>Remarks</EuiTableRowCell> */}
                                </EuiTableRow>
                            ))}
                        </EuiTableBody>
                    </EuiTable>


                </>



            ),


        },
        {
            id: 'example4',
            name: 'Meter Add',
            content: (
                <EuiForm component="form" >
                    <EuiSpacer />
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiFormRow label="Hardware ID" >
                                <EuiFieldText name="hardwareId" onChange={handleInputsmeters} value={meters.hardwareId} />
                            </EuiFormRow>
                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiFormRow label="Device Name" >
                                <EuiFieldText name="deviceName" onChange={handleInputsmeters} value={meters.deviceName} />
                            </EuiFormRow>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFormRow label="Manufacture" >
                                <EuiFieldText name="manufacture" onChange={handleInputsmeters} value={meters.manufacture} />
                            </EuiFormRow>
                        </EuiFlexItem>

                        {/* <EuiFlexItem>
                            <EuiFormRow label="impkwh" >
                                <EuiFieldText name="impkwh" onChange={handleInputsmeters} value={meters.impkwh} />
                            </EuiFormRow>
                        </EuiFlexItem> */}


                    </EuiFlexGroup>
                    <EuiSpacer />
                    <EuiFlexGroup>

                        <EuiFlexItem>
                            <EuiFormRow label="Status" >
                                <EuiSelect options={options} value={selectedOption1} onChange={handleOptionSelect1} />
                            </EuiFormRow>
                        </EuiFlexItem>
                        {/* <EuiFlexItem>
                            <EuiFormRow label="Remarks" >
                                <EuiFieldText name="remarks" />
                            </EuiFormRow>
                        </EuiFlexItem> */}
                    </EuiFlexGroup>


                    <EuiSpacer />
                    <EuiSpacer />
                    {isEditingMeters ? (
                        <EuiButton type="button" fill onClick={() => { editMeters(meters.id) }} >
                            Edit Meter
                        </EuiButton>
                    ) : (
                        <EuiButton type="button" fill onClick={addmeters} >
                            Save Meter
                        </EuiButton>
                    )}

                </EuiForm>



            ),
        },
        {
            id: 'example5',
            name: <div onClick={() => metersListShow()}>Meter List</div>,

            content: (
                <EuiTable >
                    <EuiTableHeader>
                        <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Hardware ID</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Device Name</EuiTableHeaderCell>
                        <EuiTableHeaderCell>impkwh</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Manufacture</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Status</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Status Perform</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Action</EuiTableHeaderCell>
                        {/* <EuiTableHeaderCell>Remarks</EuiTableHeaderCell> */}
                    </EuiTableHeader>
                    <EuiTableBody >
                        {metersList.map((item, index) => (
                            <EuiTableRow key={index} >
                                <EuiTableRowCell>{index + 1}</EuiTableRowCell>
                                <EuiTableRowCell>{item.hardwareId}</EuiTableRowCell>
                                <EuiTableRowCell>{item.deviceName}</EuiTableRowCell>
                                <EuiTableRowCell>{item.impkwh}</EuiTableRowCell>
                                <EuiTableRowCell>{item.manufacture}</EuiTableRowCell>
                                <EuiTableRowCell>{item.status ? 'Enable' : 'Disable'}</EuiTableRowCell>
                                {item.status ? (
                                    <EuiTableRowCell><EuiButton color="danger" fill size="s" onClick={() => handleStatusChangeMeters(item.id, false)}>Disable</EuiButton></EuiTableRowCell>
                                ) : (
                                    <EuiTableRowCell><EuiButton color="primary" fill size="s" onClick={() => handleStatusChangeMeters(item.id, true)}>Enable</EuiButton></EuiTableRowCell>
                                )}

                                <EuiTableRowCell>
                                    <EuiFlexGroup>
                                        <EuiFlexItem >
                                            <EuiButton color="primary" fill size="s" onClick={() => { editMetersRequest(item.id) }}><EuiIcon type="documentEdit" size="m" /></EuiButton>
                                        </EuiFlexItem>
                                        <EuiFlexItem >
                                            <EuiButton color="danger" fill size="s" onClick={() => deleteMetersRequest(item.id)}><EuiIcon type="trash" size="m" /></EuiButton>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                </EuiTableRowCell>
                                {/* <EuiTableRowCell>Remarks</EuiTableRowCell> */}
                            </EuiTableRow>
                        ))}
                    </EuiTableBody>
                </EuiTable>

            ),

        },
        {
            id: 'example6',
            name: 'Cash Add',
            content: (
                <EuiForm component="form" >
                    <EuiSpacer />
                    <EuiFlexItem>
                        <EuiFormRow label="CostPerKwh" >
                            <EuiFieldText name="costPerKwhNew" onChange={handleInputscash} value={cash.costPerKwhNew} />
                        </EuiFormRow>
                    </EuiFlexItem>
                    <EuiSpacer />
                    <EuiSpacer />
                    {isEditingCash ? (
                        <EuiButton type="button" fill onClick={() => { editCash(cash.id) }} >
                            Edit Cash
                        </EuiButton>
                    ) : (
                        <EuiButton type="button" fill onClick={addcash} >
                            Save Cash
                        </EuiButton>
                    )}

                </EuiForm>



            ),
        },
        {
            id: 'example7',
            name: <div onClick={() => cashListShow()}>Cash List</div>,

            content: (
                <EuiTable >
                    <EuiTableHeader>
                        <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
                        <EuiTableHeaderCell>CostPerKwh</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Action</EuiTableHeaderCell>
                    </EuiTableHeader>
                    <EuiTableBody >
                        {cashList.map((item, index) => (
                            <EuiTableRow key={index} >
                                <EuiTableRowCell>{index + 1}</EuiTableRowCell>
                                <EuiTableRowCell>{item.costPerKwh}</EuiTableRowCell>
                                <EuiTableRowCell>
                                    <EuiFlexGroup>
                                        <EuiFlexItem >
                                            <EuiButton color="primary" fill size="s" onClick={() => editCashRequest(item.id)}><EuiIcon type="documentEdit" size="m" /></EuiButton>
                                        </EuiFlexItem>
                                        <EuiFlexItem >
                                            <EuiButton color="danger" fill size="s" onClick={() => deleteCashRequest(item.id)}><EuiIcon type="trash" size="m" /></EuiButton>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>
                                </EuiTableRowCell>
                            </EuiTableRow>
                        ))}
                    </EuiTableBody>
                </EuiTable>

            ),

        },


        {
            id: 'example8',
            name: 'Logout',
            content: <p onClick={() => callLogout()}>Logout</p>,
        }

    ];


    const activeTab = tabs.find((tab) => tab.id === activeTabId);


    return (
        <div>
            <ul className="tab-navigation">
                {tabs.map((tab) => (
                    <li key={tab.id} onClick={() => handleTabClick(tab.id)} style={{ color: activeTabId === tab.id ? 'yellow' : 'white' }}>
                        {tab.name}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {activeTab && activeTab.content}
            </div>
            <ToastContainer />
            {showModal && <MyModal closeModal={closeModal} handleAssignClick={handleAssignClick} meterDataList={metersName} metersListShow={metersListShow} tenentId={tenentId} tenantsListShow={tenantsListShow} />}
            {showMyModal && <MyModalRemove closeModal={closeMyModal} meterDataList={metersMyName} activeTabId={setActiveTabId} metersListShow={metersListShow} tenentId={tenentId} tenantsListShow={tenantsListShow} />}

        </div>


        //     <div className="admin-pannl">
        //         <EuiTabbedContent
        //             tabs={tabs}
        //         />
        //         <ToastContainer />
        //     </div>
    );
};

export default Admin;