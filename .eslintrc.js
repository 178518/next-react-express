module.exports = {
  'parser': 'babel-eslint',
  /**
   * https://www.jianshu.com/p/bf0ffe8e615a
   * 此项是用来指定javaScript语言类型和风格
   */
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  // 此项是用来提供插件的，插件名称省略了eslint-plugin-*
  'plugins': ['react', 'prettier'],
  'extends': [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  'settings': {
    'html/html-extensions': ['.html'],
  },
  // 所以需要定义这些额外的全局变量
  'globals': {
    '__ROOT__': true,
    'document': true,
    'window': true,
  },
  'rules': {
    'no-await-in-loop': 0,
    'no-shadow': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'semi': [2, 'always'],
    // this 的别名规则，只允许 self 或 that
    'consistent-this': [2, 'self', 'that'],
    // 构造函数中必须调用 super
    // @off 没必要
    'constructor-super': 0,
    // 禁止在 Node.js 中直接调用 Buffer 构造函数
    'no-buffer-constructor': 2,
    // 禁止对 const 定义重新赋值
    'no-const-assign': 2,
    // 禁止 ++ 和 --
    // @off 很常用
    'no-plusplus': 0,
    // 禁止使用 process.env.NODE_ENV
    // @off 使用很常见
    'no-process-env': 0,
    //禁止额外的括号，仅针对函数体
    'no-extra-parens': [2, 'functions'],
    //避免不必要的方括号
    'dot-notation': [0, { 'allowKeywords': true }],
    // 禁止使用 process.exit(0)
    // @off 使用很常见
    'no-process-exit': 0,
    // 逗号前后是否有空格
    // @off 不关心
    'comma-spacing': 0,
    'spaced-comment': 0,
    'space-before-function-paren': 0,
    'comma-dangle': [2, 'always-multiline'],
    'arrow-parens': [2, 'as-needed'],
    'consistent-return': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'template-curly-spacing': 'off',
    'indent': 'off',
  },
  // 此项指定环境的全局变量，使用 env 关键字指定你想启用的环境，并设置它们为 true
  'env': {
    'es6': true,
    'node': true,
  },
};
