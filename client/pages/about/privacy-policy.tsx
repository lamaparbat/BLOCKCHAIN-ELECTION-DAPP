import React from 'react';
import Navbar from '../../components/Navbar';
import { responsive } from '../../constants';

const Privacy = () => {
  return (
    <div className='constitutional--provision--container'>
      <Navbar />
      <div className='flex justify-center mt-3 mb-5 px-3 lg:px-0'>
        <div className={`${responsive} flex justify-between rounded-1 flex-wrap lg:px-3`}>
          <h4 className='my-3'>Privacy Policy</h4>
          <p>The ECN mobile App provides election related information and updates to users of this app.
            We do not collect, share, and use any personal information of user.</p>
          <p>We ask for your information solely to provide you with your personal details as per the
            official ECN's voter details record. None of the information you provide are stored in our
            server, used for any purpose or shared with other organizations/entities.</p>
          <p>If you have any queries regarding this policy, you can contact us by sending email at :
            <a href='mailto:info@election.gov.np'> info@election.gov.np</a></p><br /><br />
          <h5>Election Commission, nepal  </h5>
        </div>
      </div>
    </div>
  )
}

export default Privacy;
