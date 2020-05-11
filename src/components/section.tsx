import React, {FC} from 'react';
import styled from 'styled-components';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const SectionContainer = styled.section`
  height: 100%;
  margin: 0 20px;
  padding: 20px 20px 50px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  position: relative;
  flex: 1 0 0;
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
`;

const Section: FC<SectionProps> = props => {
  const {title, children} = props;

  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  )
}

export default Section;