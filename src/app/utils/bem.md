> ~400 bytes gzipped

Bem is a _higher-order-function_... (it's just a function that creates a function)

`bem = BEM(Object): // Object { prefix: String, block: String } => Returns function`

`bem(String, Array|String|object, Array|String|Object)`

## Primary Options

 *  `block`  _mandatory_ : String
 *  `prefix`  _optional_ : String default ``

## Secondary Options

 * 1st argument (`element`) _optional_ : String
 * 2nd argument (`modifier`) _optional_ : String | Object | Array
 * 3rd argument (`util`) _optional_ : String | Object | Array

## Using Objects

The class name is built using the `keys` of the Object.  The values are evaluated, if they are falsey, they're ignored.

```json
{ 
  'potential-class': false, // ignored
  'another-class': true, // added
}

```
## Using Arrays

The class name is built using the `values` of the Array.  
```json
[ 'potential-class', 'another-class' ]
```


# Usage

```jsx
import Bem from 'argos-utils/esnext/bem'
const className = Bem({  prefix: 'ac-', block: 'my-component' })
...
<div className={ className() } /> // returns 'ac-my-component'
<div className={ className('element') } />  // returns 'ac-my-component__element '
<div className={ className('element', 'modifier') } />  // returns 'ac-my-component__element ac-my-component__element--modifier'
<div className={ className('element', 'modifier', 'util-class') } />  // returns 'ac-my-component__element ac-my-component__element--modifier util-class'

```

If you do not need an early argument, but _do_ need a later argument, use `falsey`

```jsx
import Bem from 'argos-utils/esnext/bem'
const className = Bem({  prefix: 'ac-', block: 'my-component' })
...
<div className={ className(null, 'modifier') } /> // returns 'ac-my-component ac-my-component--modifier'
<div className={ className('element', null, 'util') } />  // returns 'ac-my-component__element util'
<div className={ className(null, null, 'util') } />  // returns 'ac-my-component util'

```
