/// <reference types="react" />
export declare type ProgressFormat = (percentage: number) => string;
export interface ProgressProps {
    percentage: number;
    strokeWidth?: number;
    textInside?: boolean;
    textPosition?: string;
    format?: ProgressFormat;
    bgColor?: string;
    barColor?: string;
    barRadius?: string;
    showText?: boolean;
}
declare const Progress: (props: ProgressProps) => JSX.Element;
export default Progress;
