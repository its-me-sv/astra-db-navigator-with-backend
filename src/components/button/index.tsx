import React from 'react';
import styled from 'styled-components';

interface ButtonStyleProps {
  variant: number;
  disabled: boolean;
  unfilled?: boolean;
  tiny?: boolean;
  medium?: boolean;
}

const BtnContainer = styled.div`
  max-height: 8.4vh;
  font-family: calibri;
  opacity: 0.84;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.14rem;
  border-radius: 0.42rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  ${(props: ButtonStyleProps) => {
    const property:string = props.unfilled ? 'border': 'background';
    switch (props.variant) {
      case 1:
        return `${property}-color: #fff568;`;
      case 2:
        return `${property}-color: #75e08b;`;
      case 3:
        return `${property}-color: red;`;
      case 4:
        return `${property}-color: #1f71d5;`;
      case 5:
        return `${property}-color: #fbaf5d;`;
      default:
        return ``;
    }
  }}
  color: white;
  ${(props: ButtonStyleProps) =>
    props.disabled && `opacity: 0.5; cursor: not-allowed;`}
  span {
    font-family: Roboto;
    font-size: 1.2rem;
    ${(props: ButtonStyleProps) => props.tiny && `
      font-size: 0.8rem;
      font-weight: 700;
    `}
    ${(props: ButtonStyleProps) => props.medium && `
      font-size: 0.9rem;
      font-weight: 400;
      color: black;
      padding: 0%;
    `}
  }
  ${(props: ButtonStyleProps) => props.tiny && `
    border-width: 1.99px;
    border-radius: 0.30rem;
    padding: 0.084rem;
  `}
  ${(props: ButtonStyleProps) => {
    if (!props.unfilled) return ``;
    switch (props.variant) {
      case 1:
        return `color: #fff568;`;
      case 2:
        return `color: #75e08b;`;
      case 3:
        return `color: red;`;
      case 4:
        return `color: #1f71d5;`;
      case 5:
        return `color: #fbaf5d;`;
      default:
        return ``;
    }
  }}
`;

interface ButtonProps {
  variant: number;
  text: string;
  onPress: () => void;
  disabled: boolean;
  unfilled?: boolean;
  tiny?: boolean;
  medium?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant, text, onPress, 
  disabled, unfilled, tiny, medium
}) => {
    return (
      <BtnContainer 
        disabled={disabled} 
        variant={variant} 
        onClick={onPress}
        unfilled={unfilled}
        tiny={tiny}
        medium={medium}
      >
        <span>{text}</span>
      </BtnContainer>
    );
};

export default Button;
