import styled from 'styled-components';
import Select from 'react-select';

export const StyledSelect = styled(Select)`
    width: 400px;
    font-family: Philosopher, cursive;
    color: black;
    font-size: 20px;
    font-weight: bold;
    padding: 0 20px 0 40px;
`;

export const StyledLabel = styled.div`
    padding: ${(prop) => (prop.paddingTop)} 20px 20px 40px;
    font-family: Cormorant Garamond, cursive;
    font-size: 20px;
    font-weight: bold;
    text-decoration: ${(prop) => (prop.decoration)};
`;

export const SelectButton = styled.button`
    display: block;
    text-align: center;
    height: 50px;
    width: 180px;
    margin: 160px 20px 20px 40px;
    font-family: Cormorant Garamond, cursive;
    font-size: 20px;
    font-weight: 700;
    color: white;
    background-color: ${(prop) => (prop.background)};
    border: 0;
    border-radius: 15px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
    opacity: 0.6;
    &:hover {
        opacity: 0.8;
        box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
        transform: translate(0, -5px);
    }
    @media screen and (max-width: 900px) {
    font-size: 15px;
  }
`;

export const SelectIcon = styled.span`
    font-size: 25px;
    cursor: pointer;
    margin: 0 5px;
    transition: opacity .25s ease-in;
    opacity: 0.5;
    &:hover {
        opacity: .95;
    }
    position: absolute;
    @media screen and (max-width: 900px) {
    visibility: hidden;
  }
`;
