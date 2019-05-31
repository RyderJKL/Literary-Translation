import * as React from 'react';
import * as styles from './style.scss';
import * as classNames from 'classnames';
import {Filter} from '../../../store/modules/todo/model';

export const FILTER_TITLES = {
    [Filter.SHOW_ALL]: 'All',
    [Filter.SHOW_ACTIVE]: 'Active',
    [Filter.SHOW_COMPLETED]: 'Completed'
};

export interface Props {
    filter: Filter;
    activeCount?: number;
    completedCount?: number;
    onClickFilter: (filter: Filter) => any;
    onClickClearCompleted: () => any;
}

const TodoFooter = ({
    activeCount = 0,
    completedCount = 0,
    ...props
}: Props) => {
    const renderTodoCount: () => JSX.Element = () => {
        const itemWord = activeCount === 1 ? 'item' : 'items';
        return (
            <span className={styles.count}>
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        );
    };

    const renderFilterLink: (filter: Filter) => JSX.Element = (filter) => {
        const {filter: selectedFilter, onClickFilter} = props;
        return (
            <a
                className={classNames({[styles.selected]: filter === selectedFilter})}
                style={{cursor: 'pointer'}}
                onClick={() => onClickFilter(filter)}
            >{FILTER_TITLES[filter]}</a>
        );
    };

    const renderClearButton: () => JSX.Element | void = () => {
        const {onClickClearCompleted} = props;
        if (completedCount! > 0) {
            return (
                <button
                    className={styles.clearCompleted}
                    onClick={onClickClearCompleted}
                    children={'Clear completed'}
                />
            );
        }
    };

    return (
        <footer className={styles.normal}>
            {renderTodoCount()}
            <ul className={styles.filters}>
                {
                    (Object.keys(Filter) as (keyof typeof Filter)[]).map((key) => (
                        <li key={key} children={renderFilterLink(Filter[key])}/>
                    ))
                }
            </ul>
            {renderClearButton()}
        </footer>
    );
};

export default TodoFooter;
