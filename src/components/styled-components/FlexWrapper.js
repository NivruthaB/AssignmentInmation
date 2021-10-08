import styled from 'styled-components';

const FlexWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  flex-direction: ${(props) => props.direction};
  height: 100%;
`;

FlexWrapper.defaultProps = {
  justify: 'center',
  align: 'center',
  direction: 'column',
};

export default FlexWrapper;
