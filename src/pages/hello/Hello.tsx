import * as React from 'react';
import * as styles from './style.scss';
import Progress from 'components/progress/Progress';

const Hello = () => {
    const format = (percentage) => {
       if (percentage === 100) { return '满'; }
       return `${percentage}`;
    };

    return (
        <div className={styles.helloContainer}>
            <Progress
                percentage={20}
                barRadius={'0px'}
                showText={false}
            />
        </div>
    );
};

export default Hello;
