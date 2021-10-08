import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

export const GraphContainer = styled(ResponsiveContainer)`
    margin: 50px 0;
    padding: 20px 20px;
    background: ${(props) => (props.background === 'dark' ? '#062a78' : '#f4f0ec')};;
    border-radius: 10px;
`;

export const StyledToolTip = styled.div`
    background: white;
    padding: 10px 10px;
    font-family: Philosopher, cursive;
`;
