import React from "react";
import styled from "styled-components";

const Section = styled.section`
  background: #fff7e6;
  padding: 60px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;

  span {
    color: #2563eb;
  }
`;

const Grid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Box = styled.div`
  text-align: left;
`;

const Features = () => {
  return (
    <Section>
      <Title>
        Premium <span>Learning</span> Experience
      </Title>

      <Grid>
        <Box>
          <h3>Easily Accessible</h3>
          <p>Courses are easy to access anytime.</p>
        </Box>
        <Box>
          <h3>Fun Learning</h3>
          <p>Learn with interactive sessions.</p>
        </Box>
        <Box>
          <h3>Personalized Journey</h3>
          <p>Custom recommendations.</p>
        </Box>
        <Box>
          <h3>Learn Anywhere</h3>
          <p>Learn at your own pace.</p>
        </Box>
      </Grid>
    </Section>
  );
};

export default Features;
