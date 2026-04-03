// Terms.js
import React from 'react';

const Terms = () => {
  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4">Terms and Conditions</h1>
          
          <div className="card">
            <div className="card-body">
              <section className="mb-4">
                <h5>1. Acceptance of Terms</h5>
                <p>By accessing and using Shopping By Apexium, you accept and agree to be bound by these Terms and Conditions.</p>
              </section>

              <section className="mb-4">
                <h5>2. User Accounts</h5>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
              </section>

              <section className="mb-4">
                <h5>3. Prohibited Activities</h5>
                <p>You may not use our site for any illegal or unauthorized purpose. You must not transmit any worms or viruses or any code of a destructive nature.</p>
              </section>

              <section className="mb-4">
                <h5>4. Intellectual Property</h5>
                <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of Shopping By Apexium and protected by copyright laws.</p>
              </section>

              <section className="mb-4">
                <h5>5. Limitation of Liability</h5>
                <p>Shopping By Apexium shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the service.</p>
              </section>

              <section className="mb-4">
                <h5>6. Governing Law</h5>
                <p>These terms shall be governed by and construed in accordance with the laws of your state/country without regard to its conflict of law provisions.</p>
              </section>

              <section className="mb-4">
                <h5>7. Contact Information</h5>
                <p>For any questions about these Terms and Conditions, please contact us at: support@shoppingbyapexium.com</p>
              </section>

              <div className="mt-4">
                <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;