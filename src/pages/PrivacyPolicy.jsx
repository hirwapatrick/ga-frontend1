import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  color: #fff;
`;

function PrivacyPolicy() {
  return (
    <Container>
      <h2>Privacy Policy</h2>
      <p>
        At Getagasobanuye, we respect your privacy. This website does not collect personal data from users without consent.
      </p>
      <p>
        We may use cookies to improve your experience and analyze traffic. These are used only to enhance website performance and do not collect personally identifiable information.
      </p>
      <p>
        By using our site, you agree to our use of such cookies. If you have any questions regarding privacy, please contact us.
      </p>
    </Container>
  );
}

export default PrivacyPolicy;
