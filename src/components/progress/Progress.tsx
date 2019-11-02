/* tslint:disable */
import * as React from 'react';
import styles from './style.scss';

// export enum ProgressType {
//     line = 'line',
//     circle = 'circle',
//     dashboard = 'dashboard'
// }
//
// export enum ProgressStatus {
//     success = 'success',
//     exception = 'exception',
//     warning = 'warning'
// }

export type ProgressFormat = (percentage: number) => string;

export interface ProgressProps {
    percentage: number;
    // type?: ProgressType;
    // status?: ProgressStatus;
    strokeWidth?: number;
    textInside?: boolean;
    textPosition?: string;
    format?: ProgressFormat;
    bgColor?: string;
    barColor?: string;
    barRadius?: string;
    showText?: boolean;
}

const Progress = (props: ProgressProps) => {
    const {
        percentage,
        // type = ProgressType.line,
        // status = ProgressStatus.success,
        showText = true,
        format,
        bgColor,
        barColor,
        barRadius
    } = props;

    const getPercentageText = () => {
        let formatText = `${percentage}%`;

        if (format) {
            formatText = format(percentage);
        }

        return <span style={{color: barColor}}>{formatText}</span>;
    };

    return (
        <div className={styles.progressBar}>
            <div
                className={styles.progressBarOuter}
                style={{
                    backgroundColor: bgColor,
                    borderRadius: barRadius
                }}
            >
                <div
                    className={styles.progressBarInner}
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: barColor,
                        borderRadius: barRadius
                    }}
                />
            </div>
            {showText ? <div className={styles.progressBarText}> {getPercentageText()} </div> : null}
        </div>
    );
};

export default Progress;
