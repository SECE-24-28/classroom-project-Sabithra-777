import React from "react";
import { GlanceWrapper, GlanceGrid, GlanceCard } from "./impact-at-glance-style";

const ImpactAtGlance = () => {
  const items = [
    {
      label: "Colleges",
      value: "100+",
      bg: "rgb(255, 230, 230)",
      img: "https://aptitudeguruhem.com/static/media/school.534dd7db3daaf4c66eff.png",
    },
    {
      label: "Students",
      value: "1,00,000",
      bg: "rgb(227, 241, 255)",
      img: "https://aptitudeguruhem.com/static/media/bag.52185bac9246c85ed48f.png",
    },
    {
      label: "Study Materials",
      value: "1000+",
      bg: "rgb(227, 255, 240)",
      img: "https://aptitudeguruhem.com/static/media/books.d290f0589bd8ed867b77.png",
    },
    {
      label: "Professional Trainers",
      value: "150",
      bg: "rgb(255, 230, 199)",
      img: "https://aptitudeguruhem.com/static/media/people.0b6f76ebbf0b209884e7.png",
    },
  ];

  return (
    <GlanceWrapper>
      <h1>
        Impact at a <span className="red">Glance</span>
      </h1>

      <GlanceGrid>
        {items.map((item, index) => (
          <GlanceCard bg={item.bg} key={index}>
            <div className="left">
              <div className="label">{item.label}</div>
              <div className="value">{item.value}</div>
            </div>

            <img src={item.img} alt={item.label} />
          </GlanceCard>
        ))}
      </GlanceGrid>
    </GlanceWrapper>
  );
};

export default ImpactAtGlance;
