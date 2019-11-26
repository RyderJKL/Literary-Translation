import * as React from 'react';
import * as config from '@/config';
import { Link } from 'react-router-dom';
import { NavTheme } from '@/config/default-settings';
import { rootPath } from '@/config/routes';
import classNames from 'classnames';
import styles from './index.scss';

export interface LogoProps {
    collapse: boolean;
    theme: NavTheme;
}

const Logo: React.SFC<LogoProps> = ({ collapse, theme }) => {
    const componentClass = classNames({
        [styles.logo]: true,
        [styles.collapse]: collapse,
        [theme]: true
    });

    return (
        <div className={componentClass}>
            <Link to={rootPath}>
                <span className={styles.logoImg} />
                <h1>{config.SITE_NAME}</h1>
            </Link>
        </div>
    );
};

export default Logo;
