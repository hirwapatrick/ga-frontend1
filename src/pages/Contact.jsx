import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  color: #fff;
`;

function Contact() {
  return (
    <Container>
      <h2>Contact Us</h2>
      <p>
        Have questions or feedback? We'd love to hear from you!
      </p>
      <ul>
        <li>Email: support@getagasobanuye.xyz</li>
        <li>WhatsApp: +250 78X XXX XXX</li>
        <li>Location: Rwanda</li>
      </ul>
    </Container>
  );
}

export default Contact;
