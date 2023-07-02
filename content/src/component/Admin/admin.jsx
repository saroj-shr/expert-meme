import React, { useState } from "react";
import { EuiForm, EuiFormRow, EuiTabbedContent, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiFieldText, EuiLink, EuiSelect, EuiFilePicker, EuiTableHeader, EuiTableRow, EuiTableRowCell, EuiTableBody, EuiTable, EuiTableHeaderCell, EuiButton, EuiSpacer, EuiTitle, EuiText } from "@elastic/eui";



const Admin = () => {
    //Drop down field
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    const options = [
        { value: 'option1', text: 'Enable' },
        { value: 'option2', text: 'Disable' },

    ];




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
                                <EuiFieldText name="firstName" />
                            </EuiFormRow>
                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiFormRow label="Last Name" >
                                <EuiFieldText name="lastName" />
                            </EuiFormRow>
                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiFormRow label="Email" >
                                <EuiFieldText name="email" />
                            </EuiFormRow>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiSpacer />
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiFormRow label="Status" >
                                <EuiSelect options={options} value={selectedOption} onChange={handleOptionSelect} />
                            </EuiFormRow>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFormRow label="Remarks" >
                                <EuiFieldText name="remarks" />
                            </EuiFormRow>
                        </EuiFlexItem>

                    </EuiFlexGroup>


                    <EuiSpacer />
                    <EuiSpacer />
                    <EuiButton type="button" fill  >
                        Save Tenant
                    </EuiButton>
                </EuiForm>



            ),
        },
        {
            id: 'example3',
            name: 'Tenants List',
            content: (
                <EuiTable >
                    <EuiTableHeader>
                        <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
                        <EuiTableHeaderCell>First Name</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Last Name</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Email</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Status</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Status Perform</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Meter</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Action</EuiTableHeaderCell>
                        <EuiTableHeaderCell>Remarks</EuiTableHeaderCell>
                    </EuiTableHeader>
                    <EuiTableBody>
                        <EuiTableRow >
                            <EuiTableRowCell>1.</EuiTableRowCell>
                            <EuiTableRowCell>Bibek</EuiTableRowCell>
                            <EuiTableRowCell>Airee</EuiTableRowCell>
                            <EuiTableRowCell>bibek@gmail.com</EuiTableRowCell>
                            <EuiTableRowCell>Enable</EuiTableRowCell>
                            <EuiTableRowCell><EuiButton color="danger" fill size="s" >Disable</EuiButton></EuiTableRowCell>
                            <EuiTableRowCell><EuiButton color="success" fill size="s" >Assign</EuiButton></EuiTableRowCell>
                            <EuiTableRowCell>
                                <EuiFlexGroup>
                                    <EuiFlexItem >
                                        <EuiButton color="primary" fill size="s" ><EuiIcon type="documentEdit" size="m" /></EuiButton>
                                    </EuiFlexItem>
                                    <EuiFlexItem >
                                        <EuiButton color="danger" fill size="s"><EuiIcon type="trash" size="m" /></EuiButton>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiTableRowCell>
                            <EuiTableRowCell>Remarks</EuiTableRowCell>
                        </EuiTableRow>
                    </EuiTableBody>
                </EuiTable>

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
                                <EuiFieldText name="hardwareId" />
                            </EuiFormRow>
                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiFormRow label="Device Name" >
                                <EuiFieldText name="deviceName" />
                            </EuiFormRow>
                        </EuiFlexItem>

                        <EuiFlexItem>
                            <EuiFormRow label="impkwh" >
                                <EuiFieldText name="impkwh" />
                            </EuiFormRow>
                        </EuiFlexItem>


                    </EuiFlexGroup>
                    <EuiSpacer />
                    <EuiFlexGroup>
                        <EuiFlexItem>
                            <EuiFormRow label="Manufacture" >
                                <EuiFieldText name="manufacture" />
                            </EuiFormRow>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFormRow label="Status" >
                                <EuiSelect options={options} value={selectedOption} onChange={handleOptionSelect} />
                            </EuiFormRow>
                        </EuiFlexItem>
                        <EuiFlexItem>
                            <EuiFormRow label="Remarks" >
                                <EuiFieldText name="remarks" />
                            </EuiFormRow>
                        </EuiFlexItem>
                    </EuiFlexGroup>


                    <EuiSpacer />
                    <EuiSpacer />
                    <EuiButton type="button" fill  >
                        Save Meter
                    </EuiButton>
                </EuiForm>



            ),
        },
        {
            id: 'example5',
            name: 'Meter List',
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
                        <EuiTableHeaderCell>Remarks</EuiTableHeaderCell>
                    </EuiTableHeader>
                    <EuiTableBody>
                        <EuiTableRow >
                            <EuiTableRowCell>1.</EuiTableRowCell>
                            <EuiTableRowCell>Bibek</EuiTableRowCell>
                            <EuiTableRowCell>Airee</EuiTableRowCell>
                            <EuiTableRowCell>bibek@gmail.com</EuiTableRowCell>
                            <EuiTableRowCell>industry</EuiTableRowCell>
                            <EuiTableRowCell>Disable</EuiTableRowCell>
                            <EuiTableRowCell><EuiButton color="danger" fill size="s" >Enable</EuiButton></EuiTableRowCell>
                            <EuiTableRowCell>
                                <EuiFlexGroup>
                                    <EuiFlexItem >
                                        <EuiButton color="primary" fill size="s" ><EuiIcon type="documentEdit" size="m" /></EuiButton>
                                    </EuiFlexItem>
                                    <EuiFlexItem >
                                        <EuiButton color="danger" fill size="s"><EuiIcon type="trash" size="m" /></EuiButton>
                                    </EuiFlexItem>
                                </EuiFlexGroup>
                            </EuiTableRowCell>
                            <EuiTableRowCell>Remarks</EuiTableRowCell>
                        </EuiTableRow>
                    </EuiTableBody>
                </EuiTable>

            ),

        },
        {
            id: 'example6',
            name: 'Logout',
            content: 'logout',
        }

    ];



    return (
        <div className="admin-pannl">
            <EuiTabbedContent
                tabs={tabs}
            />
        </div>
    );
};

export default Admin;