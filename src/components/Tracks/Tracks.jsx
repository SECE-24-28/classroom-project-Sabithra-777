import React from "react";
import styled from "styled-components";
import TrackCard from "./TrackCard";

import img1 from "../../assets/track1.jpg";
import img2 from "../../assets/track2.jpg";
import img3 from "../../assets/track3.jpg";

const Section = styled.section`
  padding: 60px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
`;

const Cards = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 30px;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Tracks = () => {
  const data = [
    { img: img1, title: "UI/UX Design", price: "$98" },
    { img: img2, title: "Front-end Developer", price: "$128" },
    { img: img3, title: "MERN Stack", price: "$238" },
  ];

  return (
    <Section>
      <Title>Our Tracks</Title>
      <Cards>
        {data.map((item, index) => (
          <TrackCard key={index} {...item} />
        ))}
      </Cards>
    </Section>
  );
};

export default Tracks;
