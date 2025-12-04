import React from "react";
import { PromiseWrapper, PromiseGrid, PromiseCard } from "./our-promise-style";

const OurPromise = () => {
  const items = [
    {
      title: "Top Code Quality",
      desc: "Our commitment goes beyond mere code - it encompasses providing solutions. You receive W3C fully compliant markup, without any compromise on quality.",
      icon: "💻",
      color: "#1ec0c3",
    },
    {
      title: "Responsive",
      desc: "We understand the value of a positive attitude, timely responsiveness, and adaptability. We're dedicated to listening and leveraging our utmost capabilities to serve you.",
      icon: "🖥️",
      color: "#f4b400",
    },
    {
      title: "Rockstar Team",
      desc: "You'll have access to an all-star team of experienced professionals fully dedicated to serving you, armed with coding skills that are truly exceptional.",
      icon: "👨‍💻",
      color: "#0099ff",
    },
    {
      title: "Fast Turn-arounds",
      desc: "We are swift, nimble, and capable of providing high-quality code within a timeframe that suits your preferences.",
      icon: "⚡",
      color: "#9b59b6",
    },
    {
      title: "Life-time support",
      desc: "Our commitment is exemplified by our enduring support. If any bugs appear in the future, feel free to reach out for assistance.",
      icon: "🎯",
      color: "#e63946",
    },
    {
      title: "Secured Agreement",
      desc: "Your creative work is entirely your own. We assure confidentiality with a Non-Disclosure Agreement (NDA).",
      icon: "🛡️",
      color: "#2ecc71",
    },
  ];

  return (
    <PromiseWrapper>
      <h1>Our Promise</h1>
      <p className="subtitle">
        As part of our high quality service, we'd like to offer something extra too.
      </p>

      <PromiseGrid>
        {items.map((item, index) => (
          <PromiseCard key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <div
              className="underline"
              style={{ backgroundColor: item.color }}
            ></div>
          </PromiseCard>
        ))}
      </PromiseGrid>
    </PromiseWrapper>
  );
};

export default OurPromise;
