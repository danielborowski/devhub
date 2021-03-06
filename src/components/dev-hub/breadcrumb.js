import React from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { colorMap } from './theme';

const StyledBreadcrumb = styled(Link)`
    display: inline-block;
    font-family: 'Fira Mono', monospace;
    text-decoration: none;
    :hover {
        color: ${colorMap.devWhite};
        transition: color 0.15s;
    }
    &:after {
        color: ${colorMap.lightGreen};
        /* 2192 is "RIGHTWARDS ARROW" */
        content: ' \u2192 ';
        white-space: pre;
    }
    :visited {
        color: ${colorMap.greyLightThree};
    }
    :visited:hover {
        color: ${colorMap.lightGreen};
    }
`;

const BreadcrumbList = styled('div')`
    /* This assumes the list link is the active one */
    a:last-of-type {
        color: ${colorMap.devWhite};
        :hover {
            color: ${colorMap.lightGreen};
        }
        &:after {
            content: none;
        }
    }
`;

/*
  The format of the children is [{Label, Target}, ...]
*/
const Breadcrumb = ({ children, ...props }) => {
    return (
        <BreadcrumbList {...props}>
            {children.map(c => (
                <StyledBreadcrumb tertiary key={c.label} to={c.to || c.target}>
                    {c.label}
                </StyledBreadcrumb>
            ))}
        </BreadcrumbList>
    );
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
