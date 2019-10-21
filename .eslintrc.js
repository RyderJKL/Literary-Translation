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
       "prettier/prettier": "error"
    }
};
