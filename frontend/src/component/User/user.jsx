import React from 'react';
import { EuiButton, EuiFlexGroup,EuiFlexItem ,EuiTitle,EuiText, EuiSpacer,EuiCard} from '@elastic/eui';
const icons = ['Beats', 'Cloud', 'Logging', 'Kibana'];


const User = () =>{
  
    return (
        <div className='user'>
            <EuiFlexGroup className='user-header' justifyContent='spaceBetween'>
                <EuiFlexItem grow={false}>
                    <EuiTitle>
                      <h1>Energy Monitoring System</h1>
                    </EuiTitle>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                    <EuiButton color="primary" fill size="m" className='button-user-logout'>
                       Logout
                    </EuiButton>
                </EuiFlexItem>
            </EuiFlexGroup>
                <EuiSpacer size="l"/>
            <div className='user-dashboard'>
                <EuiSpacer size="s"/>
                <EuiText>
                    <h3>Dashboard</h3>
                </EuiText>
                <EuiSpacer size="s"/>
                <EuiSpacer size="s"/>
                <EuiText>
                    <h4>Welcome,<strong color='primary'>Bibek Airee</strong>, to the Energy Monitoring System!</h4>
                </EuiText>
                <EuiSpacer size="l"/>
                <EuiFlexGroup>
                    <EuiFlexItem >
                      <EuiCard  title="No. of Tenants" description="12" />
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiCard  title="Power Consumption" description="12 units" />
                    </EuiFlexItem>
                    <EuiFlexItem>
                      <EuiCard  title="Total Cost" description="Rs.360" />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        </div>
          
       
    )
}
export default User;