import * as React from 'react';
import { IIMenuItems } from '@/router/routes';

export interface IISideBarProps {
    menusData: IIMenuItems;
}

const SideBar: React.FC<IISideBarProps> = ({ children, menusData }) => {
    console.log(menusData, 'menusData');
    return <div>
        {children}
    </div>;
};

export default SideBar;
