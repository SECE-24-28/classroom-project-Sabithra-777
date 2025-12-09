import React from "react";
import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const TitleBox = styled.div`
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
  }

  p {
    font-size: 1rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }
`;

const CategoriesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  h3 {
    font-size: 1.3rem;
    margin: 1rem;
    color: #1f2937;
  }
`;

const CategorySection = () => {
  return (
    <Section>
      <TitleBox>
        <h2>Top Categories</h2>
        <p>Explore furniture by category</p>
      </TitleBox>

      <CategoriesWrapper>
        <CategoryCard>
          <img src="https://hips.hearstapps.com/hmg-prod/images/designer-dining-rooms-gillian-segal-tef-q7-a-655e31d978e13.jpeg" />
          <h3>Dining Room</h3>
        </CategoryCard>

        <CategoryCard>
          <img src="https://www.comfortfurniture.com.sg/blog/wp-content/uploads/2020/04/modern-office-couches-with-mini-round-tables-comfort-furniture.jpg" />
          <h3>Office & Sofa</h3>
        </CategoryCard>

        <CategoryCard>
          <img src="https://www.modernfurnituredirect.co.uk/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/4/C/4C37F7A8FCBEDD372B8B4AB196C53875.jpg" />
          <h3>Beds & Mattresses</h3>
        </CategoryCard>
      </CategoriesWrapper>
    </Section>
  );
};

export default CategorySection;
