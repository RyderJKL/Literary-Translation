module.exports = {
    parser: '@typescript-eslint/parser', //定义ESLint的解析器
    extends: [
        //定义文件继承的子规范
        'prettier',
        'plugin:@typescript-eslint/recommended',
        "plugin:react/recommended",
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        "prettier/react"
    ],
    plugins: [
        'prettier',
        '@typescript-eslint',
        'react',
    ],//定义了该eslint文件所依赖的插件
    env:{                          //指定代码的运行环境
        browser: true,
        node: true,
    },
    settings: {             // 自动发现 React 的版本，从而进行规范 React 代码
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },
    parserOptions: {        //指定ESLint可以解析 JSX 语法
        "ecmaVersion": 2019,
        "sourceType": 'module',
        "ecmaFeatures":{
            jsx:true
        }
    },
    rules: {
        "prettier/prettier": "error",
        //Possible Errors
        //"for-direction": "off",//强制 “for” 循环中更新子句的计数器朝着正确的方向移动
        //"getter-return": "off",//强制 getter 函数中出现 return 语句
        //"no-async-promise-executor": "off",//禁止使用异步函数作为 Promise executor
        //"no-compare-neg-zero": "off", //禁止与 -0 进行比较
        //"no-cond-assign": "off",  //禁止条件表达式中出现赋值操作符
        //"no-constant-condition": ["error", "always"], //禁止在条件中使用常量表达式
        "no-control-regex": "warn", //禁止在正则表达式中使用控制字符
        "no-debugger": "warn",  //禁用 debugger
        // "no-dupe-args": "off", //禁止 function 定义中出现重名参数
        // "no-dupe-keys": "off", //禁止对象字面量中出现重复的 key
        // "no-duplicate-case": "off", //禁止出现重复的 case 标签
        "no-empty": "warn", //禁止出现空语句块，查看智子代码，大部分是try catch中 do nothing，作为warn处理
        // "no-empty-character-class": "off", //禁止在正则表达式中使用空字符集
        //"no-ex-assign": "off", //禁止对 catch 子句的参数重新赋值
        "no-extra-boolean-cast": "warn", //禁止不必要的布尔转换
        //no-extra-semi: "off", //禁止不必要的分号
        //no-func-assign: "off", //禁止对 function 声明重新赋值
        //"no-inner-declarations": "off", //禁止在嵌套的块中出现变量声明或 function 声明
        //no-invalid-regexp: "off",  //禁止 RegExp 构造函数中存在无效的正则表达式字符串
        //"no-irregular-whitespace": "off",  //禁止不规则的空白
        //"no-misleading-character-class": "off", //不允许在字符类语法中出现由多个代码点组成的字符
        //"no-obj-calls": "off", //禁止把全局对象作为函数调用
        //"no-prototype-builtins": "off", //禁止直接调用 Object.prototypes 的内置属性
        //"no-regex-spaces": "off", //禁止正则表达式字面量中出现多个空格
        //"no-sparse-arrays": "off", //禁用稀疏数组
        //"no-unexpected-multiline": "off",//禁止出现令人困惑的多行表达式
        //"no-unreachable": "off", //禁止在 return、throw、continue 和 break 语句之后出现不可达代码
        //"no-unsafe-finally": "off", //禁止在 finally 语句块中出现控制流语句
        //"no-unsafe-negation": "off",//禁止对关系运算符的左操作数使用否定操作符
        //"require-atomic-updates": "off",//禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
        //"use-isnan": "off",//要求使用 isNaN() 检查 NaN
        //"valid-typeof": "off",//强制 typeof 表达式与有效的字符串进行比较

        //Best Practices
        "eqeqeq": "warn",
        "no-new": "warn",
        "no-eval": "warn",
        "no-case-declarations": "off", //不允许在 case 子句中使用词法声明
        //"no-empty-pattern": "off",//禁止使用空解构模式
        "no-fallthrough": "warn", // 禁止 case 语句落空
        //"no-global-assign": "off", //禁止对原生对象或只读的全局对象进行赋值
        //"no-octal": "off", //禁用八进制字面量
        //"no-redeclare": "off", //禁止多次声明同一变量
        //"no-self-assign": "off", //禁止自我赋值
        //"no-unused-labels": "off",//禁用出现未使用过的标
        //"no-useless-catch": "off",//禁止不必要的 catch 子句
        "no-useless-escape": "warn", //禁用不必要的转义字符
        //"no-with": "off",//禁用 with 语句
        "no-console": "warn", //不禁用console,
        "no-else-return": "warn",
        "no-extend-native": "error",


        //Variables
        //"no-delete-var": "off",//禁止删除变量
        //"no-shadow-restricted-names": "off",//禁止将标识符定义为受限的名字
        //"no-undef": "off",//禁用未声明的变量，除非它们在 /*global */ 注释中被提到
        //"no-unused-vars": "off", //禁止出现未使用过的变量
        "no-use-before-define": "error", //未定义前不能使用


        //Stylistic Issues
        "camelcase": "off",
        "no-array-constructor":  "warn",
        "one-var": "off",
        "no-var": "error", // 要求使用 let 或 const 而不是 var
        "no-lone-blocks": "warn",


        //ECMAScript 6
        //"constructor-super": "off", //要求在构造函数中有 super() 的调用
        "no-class-assign": "off", //禁止修改类声明的变量, 智子中这样的代码会报错MapPlaceholder = DragSource(DndTypes.MAPWRAPPER, mapWrapperSource, dragCollect)(MapPlaceholder);
        // https://cn.eslint.org/docs/rules/prefer-destructuring,强制对象解构，不强制数组
        "prefer-destructuring": ["error", {"object": true, "array": false}],
        "prefer-rest-params": "error", //建议使用剩余参数代替 arguments
        "prefer-template": "error",
        //"no-const-assign": "off", //禁止修改 const 声明的变量
        //"no-dupe-class-members": "off", //禁止类成员中出现重复的名称
        //"no-new-symbol": "off", //禁止 Symbolnew 操作符和 new 一起使用
        //"no-this-before-super": "off", 禁止在构造函数中，在调用 super() 之前使用 this 或 super
        //"require-yield": "off", //要求 generator 函数内有 yield

        //react
        "react/jsx-uses-react": "error", // 防止react被错误地标记为未使用
        "react/jsx-uses-vars": "error",//防止在JSX中使用的变量被错误地标记为未使用
        "react/no-deprecated": "off", //不使用弃用的方法
        "react/prop-types": "off", //防止在React组件定义中丢失props验证
        "react/jsx-no-target-blank": "off",//Prevent usage of unsafe target='_blank'
        "react/no-unescaped-entities": "warn",
        "react/display-name": "warn", //防止在React组件定义中丢失displayName
        //"react/jsx-key": "off", //Validate JSX has key prop when in array or iterator
        "react/forbid-prop-types": "off",
        "react/jsx-no-bind": "off",
        "react/no-string-refs": "off",

        //"react/jsx-no-duplicate-props" : "off", Prevent duplicate props in JSX
        //"react/no-find-dom-node": "off",//Prevent usage of findDOMNode
		// "react/jsx-no-literals": "off", //防止使用未包装的JSX字符串
        // "react/jsx-pascal-case": "off",//为用户定义的JSX组件强制使用PascalCase
        "react/jsx-sort-props": "off",//强化props按字母排序

        // "react/no-did-update-set-state": "off", //防止在componentDidUpdate中使用setState
        // "react/no-direct-mutation-state": "off", //防止this.state的直接变异
        // "react/no-multi-comp": "off", //防止每个文件有多个组件定义
        // "react/no-unknown-property": 2, //防止使用未知的DOM属性
    }
};
