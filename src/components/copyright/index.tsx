import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { utils } from 'lego-ui';
import styles from './index.scss';

export interface CopyrightProps {
    className: string;
}

const currentYear = moment().year();

const Copyright: React.FC<CopyrightProps> = ({ className }) => {
    const selfClass = classNames({
        [styles.copyright]: true,
        [className]: utils.isExist(className)
    });

    return (
        <div className={selfClass}>Copyright &copy; {currentYear} 绿湾大前端</div>
    );
}

export default Copyright;
