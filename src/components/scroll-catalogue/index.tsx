import * as React from 'react';
import * as styles from './style.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import JsonData from './testData';
import classnames from 'classnames';

const Select = ({ onSelect }) => {
    return (
        <select onChange={(event) => onSelect(JsonData[event.currentTarget.selectedIndex])}>
    {
        JsonData.map((item) => (
            <option onClick={() => onSelect(item)}  key={item.id} value={item.id}>{item.text}</option>
    ))
    }
    </select>
);
};

const Hello = () => {
    const scrollbarsRef = React.useRef<Scrollbars>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const scrollEle = scrollbarsRef.current;
        scrollEle.scrollToBottom();
    });

    const onSelect = (currentItem) => {
        const containerEle = containerRef.current;
        const currentNavItem: HTMLLIElement = containerEle
            .getElementsByClassName(`list_${currentItem.id}`)[0] as HTMLLIElement;
        const currentNavItemOffsetTop = currentNavItem.offsetTop;
        const scrollEle = scrollbarsRef.current;
        scrollEle.scrollTop(currentNavItemOffsetTop);
    };

    const listItemClick = (target: HTMLLIElement) => {
        console.log(target.offsetTop);
    };

    return (
        <div className={styles.helloContainer}>
        <Select onSelect={onSelect}/>
    <div
    ref={containerRef}
    className={styles.contextContainer}
    >
    <Scrollbars
        ref={scrollbarsRef}
        >
        <ul>
            {
                JsonData.map((item, index) => (
                    <li
                        key={index}
                className={classnames(styles.contextItem, `list_${index + 1}`)}
    onClick={(ev) => listItemClick(ev.currentTarget)}
>
    {item.text}
    </li>))
}
    </ul>
    </Scrollbars>
    </div>
    </div>
);
};

export default Hello;
