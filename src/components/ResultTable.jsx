import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 90%;
  margin: 40px auto;
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.12);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
`;

const Th = styled.th`
  background: #0b8a61;
  color: white;
  padding: 12px;
  border: 1px solid #ddd;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background: #f2f2f2;
  }
`;

const ResultTable = () => {
  const data = [
    { subject: "Maths", marks: 98 },
    { subject: "Physics", marks: 87 },
    { subject: "Chemistry", marks: 91 },
    { subject: "Computer", marks: 95 },
  ];

  return (
    <TableContainer>
      <Title>Semester Marks Table</Title>

      <StyledTable>
        <thead>
          <Tr>
            <Th>Subject</Th>
            <Th>Marks</Th>
          </Tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <Tr key={i}>
              <Td>{row.subject}</Td>
              <Td>{row.marks}</Td>
            </Tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default ResultTable;
