import * as React from 'react';
import { Text } from 'react-native';

export const ColoredLine = ({ color }) => (
    <hr style={{ color: color, backgroundColor: color, height: 5 }} />
);

export const LineBreak = () => <Text>{"\n"}</Text>
