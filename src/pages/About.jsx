import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  color: #fff;
`;

function About() {
  return (
    <Container>
      <h2>About Getagasobanuye</h2>
      <p>
        Getagasobanuye is a movie platform dedicated to providing clear and accessible movie summaries in Kinyarwanda and other languages. 
        Our goal is to help users easily discover and understand movies through curated summaries and reviews.
      </p>
      <p>
        Whether you're looking for something new to watch or want to explore films by genre, we've got you covered with an easy-to-use interface and regularly updated content.
      </p>
    </Container>
  );
}

export default About;
