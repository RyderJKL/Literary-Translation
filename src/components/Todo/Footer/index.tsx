import * as React from 'react';
import * as styles from './style.scss';
import * as classNames from 'classnames';
import { Filter } from '../../../store/modules/todo/model';

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

export default class TodoFooter extends React.Component<Props>{
    public static defaultProps: Partial<Props> = {
        activeCount: 0,
        completedCount: 0
    };

    public renderTodoCount(): JSX.Element {
        const { activeCount } = this.props;
        const itemWord = activeCount === 1 ? 'item' : 'items';

        return (
            <span className={styles.count}>
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        );
    }

    public renderFilterLink(filter: Filter): JSX.Element {
        const { filter: selectedFilter, onClickFilter } = this.props;
        return (
            <a
                className={classNames({[styles.selected]: filter === selectedFilter})}
                style={{ cursor: 'pointer'}}
                onClick={() => onClickFilter(filter)}
            >{FILTER_TITLES[filter]}</a>
        );
    }

    public renderClearButton(): JSX.Element | void {
        const { completedCount, onClickClearCompleted } = this.props;
        if (completedCount! > 0) {
            return (
                <button
                    className={styles.clearCompleted}
                    onClick={onClickClearCompleted}
                    children={'Clear completed'}
                />
            );
        }
    }

    public render() {
        return (
            <footer className={styles.normal}>
                {this.renderTodoCount()}
                <ul className={styles.filters}>
                    {
                        (Object.keys(Filter) as (keyof typeof Filter)[]).map((key) => (
                            <li key={key} children={this.renderFilterLink(Filter[key])} />
                        ))
                    }
                </ul>
                {this.renderClearButton()}
            </footer>
        );
    }
}
