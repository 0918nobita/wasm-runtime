/* @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { EventLayout, NodePosition } from '../struct';
type Props = {
    x: number;
    y: number;
    text?: string;

    height?: number;
    width?: number;
    dentDepth?: number;
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;

    onLayout: EventLayout;
};

const IONode = ({
    x,
    y,
    onLayout,
    text = '',
    height = 30,
    width = 60,
    dentDepth = 10,
    fillColor = 'transparent',
    strokeColor = 'red',
    strokeWidth = 2,
}: Props): JSX.Element => {
    const points: NodePosition[] = [
        [x - width / 2 - dentDepth / 2, y - height / 2],
        [x - width / 2 + dentDepth / 2, y],
        [x - width / 2 - dentDepth / 2, y + height / 2],
        [x + width / 2 - dentDepth / 2, y + height / 2],
        [x + width / 2 + dentDepth / 2, y],
        [x + width / 2 - dentDepth / 2, y - height / 2],
    ];
    const pointsText = points.map(p => p.join(',')).join(' ');

    onLayout({
        inputPoint: [points[1]],
        outputPoint: points[4],
    });

    return (
        <React.Fragment>
            <polygon fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} points={pointsText} />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="node-text">
                {text}
            </text>
        </React.Fragment>
    );
};

export default React.memo(IONode);
