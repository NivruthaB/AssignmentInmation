import styled from 'styled-components';

export const Nav = styled.nav`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: ${(props) => (props.responsive ? 'flex-end' : 'center')};
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};;
  font-family: Poiret One, cursive;
  font-size: 30px;
  font-weight: bolder;
  letter-spacing: 3px;
  padding-left: 40px;
  z-index: 2;
  position: fixed;
  flex-direction: ${(props) => (props.responsive ? 'column' : 'row')};
  .icon {
    padding-right: 2vw;
    display: none;
    &:hover {
      color: #e6be8a;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 600px) {
    .nav-link {
      display: none;
    }
    .icon {
      float: right;
      display: block;
    }
  }

  @media screen and (max-width: 600px) {
    .nav-link {
      ${(props) => props.responsive && {
    display: 'block',
    textAlign: 'left',
    alignSelf: 'flex-start',
  }}
    }
  }
`;
