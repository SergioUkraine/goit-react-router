import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Controls = styled.nav`
  padding: 15px;
  background-color: #00006f;
`;

export const StyledLink = styled(NavLink)`
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 15px;
  background-color: white;
  color: black;
  &:not(:last-of-type) {
    margin-right: 10px;
  }

  &.active {
    background-color: orange;
  }

  &:hover {
    background-color: #5000ff;
    color: white;
    &.active {
      background-color: red;
    }
  }
`;

export const Container = styled.div`
  padding: 20px;
  margin: 0;
`;
