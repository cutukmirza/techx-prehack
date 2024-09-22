// components/KPISection.js
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const KPICard = styled.View`
  background-color: ${(props) => props.theme.widgetBackground};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const KPIText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export default function KPISection({ label, value }) {
  return (
    <KPICard>
      <KPIText>{label}</KPIText>
      <Text>{value}</Text>
    </KPICard>
  );
}
