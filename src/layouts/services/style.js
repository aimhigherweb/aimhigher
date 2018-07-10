import styled from 'react-emotion';

export const ServicesList = styled('div')`
    display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
`;

export const Product = styled('div')`
    background: ${props => props.theme.colours.primary.light[10]};
    border-radius: 10px;
    flex: 1 1 auto;
    margin: 15px;
    padding: 15px;
    text-align: center;
    width: 250px;

    > div {
        height: 250px;
        max-height: 250px;
        width: 100%;
    }

    svg {
        height: 250px;
        margin: 0;
        width: auto;
    }
`;