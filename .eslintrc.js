// Copyright (C) 2018, Oracle and/or its affiliates. All rights reserved.

/**
 * Configuration file for the ESLint utility (https://eslint.org)
 */

module.exports = {

  // Prevent ESLint from checking our ancestor directories for additional
  // configuration files.
  root: true,

  // Override the default parser with one that supports linting of all valid
  // Babel code (https://github.com/babel/babel-eslint).
  parser: 'babel-eslint',

  // https://github.com/yannickcr/eslint-plugin-react#configuration
  settings: {
    react: {
      version: "16.5"
    }
  },

  // Support ECMAScript 9, including JSX syntax. Assume all code is in ES modules.
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },

  // Support new ES6 global variables.
  env: {
    es6: true
  },

  // Assume "console" is globally defined.
  globals: {
    console: true,
    __ENABLE_USER_TIMING_API__ : true,
    __DEV__ : true
  },

  // Start with the ESLint recommended set of rules (those rules accompanied by
  // check marks in https://eslint.org/docs/rules/)
  extends: [
    'eslint:recommended'
  ],

  // Apply the following additional rules.
  rules: {

    // Allow console logging (normally prohibited by eslint:recommended).
    'no-console': 'off',

    // If an object property has a setter, also require a getter.
    'accessor-pairs': 'error',

    // Disallow spaces directly inside of brackets.
    //   [1, 2]  not  [ 1, 2 ]
    'array-bracket-spacing': ['error', 'never'],

    // Require space surrounding an arrow function’s arrow.
    //   (a) => {};  not  (a)=>{};
    'arrow-spacing': 'error',

    // Require space directly inside opening/closing braces in single-line blocks.
    //   { return true; }  not  {return true;}
    'block-spacing': 'error',

    // Require the following brace style for control statements and their bodies:
    //   if (foo) {
    //     bar();
    //   }
    //   else {
    //     baz();
    //   }
    'brace-style': ['error', 'stroustrup'],

    // Require non-constant variables, properties, and functions to be named
    // using camelCase.
    camelcase: 'error',

    // Disallow spaces before commas, and require spaces after commas.
    //   (foo, bar, baz)  not  (foo ,bar,baz)
    'comma-spacing': 'error',

    // Disallow spaces inside computed property brackets
    //   obj[foo]  not  obj[ foo ]
    'computed-property-spacing': ['error', 'never'],

    // Require curly braces around single-line blocks, even though they're optional.
    curly: 'error',

    // Disallow object property access using bracket notation.
    //   obj.foo  not  obj['foo']
    'dot-notation': 'error',

    // Require files to end with a newline.
    'eol-last': 'error',

    // Require comparison to use === or !== except when comparing two literal
    // values, evaluating the value of "typeof", or comparing against null.
    eqeqeq: ['error', 'smart'],

    // Require two-space indentation.
    indent: ['error', 2],

    // For object literal properties, require the format "key: value", i.e., no
    // space before the colon, and one space after the colon.
    'key-spacing': 'error',

    // Require space around keywords.
    //   if (foo)  not  if(foo)
    'keyword-spacing': 'error',

    // Require an empty line before a block comment.
    'lines-around-comment': 'error',

    // Require constructor names to begin with a capital letter.
    // 'new-cap': 'error',

    // Require parentheses when invoking a constructor with no arguments.
    'new-parens': 'error',

    // Require an empty line before a return statement, except when the return
    // is alone inside a statement block.
    'newline-before-return': 'error',

    // Requires a newline after each call in a method chain or deep member
    // access whose length exceeds 2, e.g.:
    //   obj
    //     .prop
    //     .method()
    'newline-per-chained-call': 'error',

    // Disallow use of Array constructor unless creating a sparse array of a given size.
    'no-array-constructor': 'error',

    // Disallow the use of bitwise operators.
    'no-bitwise': 'error',

    // Disallow the use of arguments.caller and arguments.callee.
    'no-caller': 'error',

    // Disallow modifying variables that are class declarations.
    'no-class-assign': 'error',

    // Disallow arrow functions where they could be confused with comparisons.
    'no-confusing-arrow': ['error', {'allowParens': true}],

    // Disallow modifying variables that are declared using "const".
    'no-const-assign': 'error',

    // Disallow a class member with the same name as another.
    'no-dupe-class-members': 'error',

    // Require a single import statement per module.
    'no-duplicate-imports': 'error',

    // Disallow use of the "eval" function.
    'no-eval': 'error',

    // Disallow an if statement as the only statement in an else block.
    'no-lonely-if': 'error',

    // Disallow consecutive empty lines within a file or at the end of a file.
    'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 1}],

    // Disallow nested ternary expressions, such as:
    //   let foo = bar ? baz : qux === quxx ? bing : bam;
    'no-nested-ternary': 'error',

    // Disallow invoking "new" without assigning the result to anything.
    'no-new': 'error',

    // Disallow the use of the "new" operator with the Function constructor.
    'no-new-func': 'error',

    // Disallow the use of the "new" operator with the Object constructor.
    'no-new-object': 'error',

    // Disallow the use of the "new" operator with the Symbol constructor.
    'no-new-symbol': 'error',

    // Disallow the use of the "new" operator with the Boolean, Number, or String constructor.
    'no-new-wrappers': 'error',

    // Disallow the use of the "__proto__" property of an object.
    'no-proto': 'error',

    // Don't allow variables to be declared more than once in the same scope.
    'no-redeclare': 'error',

    // Don't allow a assignment to be performed inside a return statement, e.g.,
    //   return foo = bar + 2;
    'no-return-assign': 'error',

    // Don't allow "javascript:" URLs, e.g.
    //   location.href = 'javascript:void(0)';
    'no-script-url': 'error',

    // Don't allow a variable to be compared against itself, e.g.
    //   let foo = bar === bar;
    'no-self-compare': 'error',

    // Disallow shadowing of restricted names, e.g.:
    //   let undefined = 'foo';
    'no-shadow-restricted-names': 'error',

    // Disallow use of this/super before calling super() in constructors.
    'no-this-before-super': 'error',

    // Don't allow throwing of literals.
    //   throw new Error();  not  throw "Error!";
    'no-throw-literal': 'error',

    // Disallow trailing whitespace at the end of lines.
    'no-trailing-spaces': 'error',

    // Disallow initializing variables to undefined.
    //   let foo;  not  let foo = undefined;
    'no-undef-init': 'error',

    // Disallow references to identifiers that have not yet been declared.
    'no-use-before-define': 'error',

    // Disallow empty constructors.
    'no-useless-constructor': 'error',

    // Require let or const instead of var.
    'no-var': 'error',

    // Disallow whitespace around the dot or before the opening bracket before properties of objects.
    //   foo.bar  not  foo .bar
    'no-whitespace-before-property': 'error',

    // Disallow the use of "with" statements.
    'no-with': 'error',

    // Disallow spaces directly inside of object-literal braces.
    //   {foo: 'bar'}  not  { foo: 'bar' }
    'object-curly-spacing': 'error',

    // Require the ES6 shorthand form for defining object literal methods and properties.
    //   let foo = {a() {}};  not  let foo = {a: function() {}};
    'object-shorthand': 'error',

    // For multi-line statements, place line breaks after operators, except place
    // them before "?" and ":", e.g.:
    //   let foo = bar +
    //     baz;
    //   let foo = bar
    //     ? baz
    //     : qux;
    'operator-linebreak': 'error',

    // Require "const" to be used for declaring variables that are never reassigned.
    'prefer-const': 'error',

    // Require single quotes for string literals unless the value contains a single quote.
    quotes: ['error', 'single', 'avoid-escape'],

    // Require the radix to be specified when calling parseInt.
    radix: 'error',

    // Disallow generator functions that do not have a yield expression.
    'require-yield': 'error',

    // Require a semicolon at the end of a statement, even though it's optional.
    semi: 'error',

    // Require imports to be sorted (https://eslint.org/docs/rules/sort-imports)
    'sort-imports': 'error',

    // Require variables in the same block to be declared alphabetically.
    'sort-vars': 'error',

    // Require space before braces that open blocks.
    //   if (a) {  not  if (a){
    'space-before-blocks': 'error',

    // When declaring a function, require a space after the function name.
    //   function foo ()  not  function foo()
    'space-before-function-paren': 'error',

    // Disallow spaces directly inside parentheses.
    //   (foo, bar)  not  ( foo, bar )
    'space-in-parens': 'error',

    // Require spacing around infix operators.
    //   a + b  not  a+b
    'space-infix-ops': 'error',

    // Require space after a keyword unary operator and no space between a non-word
    // unary operator and its operand, e.g.: delete foo.bar; ++baz;
    'space-unary-ops': 'error',

    // Require space immediately after the initial // or /* of a comment.
    'spaced-comment': 'error',

    // Require strict mode directives.
    strict: ['error', 'safe'],

    // Disallow spaces directly inside of braces in expressions in template strings.
    //   `Hi ${name}`  not  `Hi ${ name }`
    'template-curly-spacing': 'error',

    // Require no space before and space after the "*" in a yield expression.
    //    yield* x;  not  yield *x;
    'yield-star-spacing': 'error',

    // Don't allow comparisons to be "Yoda conditions".
    //   if (color === "red")  not  if ("red" === color)
    yoda: 'error'
  }
};
