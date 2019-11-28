# hooks

通用 hooks 集合

## user-store

## use-history-listener

当 `history` 改变的时候自动执行 `callback`。

## use-high-state

-   支持嵌套数据结构；
-   支持 state 变更后的 callback 回调;

```typescript
type defaultSate = {
    navTheme: string;
    collapse: boolean;
};

const defaultSate = {
    navTheme: 'light',
    collapse: false
};

const [basicLayoutState, setBasicLayoutState] = useHighState<BasicLayoutState>(defaultState);

setBasicLayoutState({ collapse: !basicLayoutState.collapse }, (newState) => console.log(newState));
```
