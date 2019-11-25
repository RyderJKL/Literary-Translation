import * as React from 'react';
export interface HeaderProps {
    sidebarCollapse: boolean;
    onChangeSidebarCollapse(): void;
}
declare const BasicLayoutHeader: React.FC<HeaderProps>;
export default BasicLayoutHeader;
