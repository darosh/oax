# Markdown

This is [OAX](https://github.com/darosh/oax) OpenApi Specification Markdown and syntax highlight test. 

- compare it with [GitHub render](https://github.com/darosh/oax/blob/master/static/test/markdown/README.md)
- view raw [Markdown source](https://raw.githubusercontent.com/darosh/oax/master/static/test/markdown/README.md), 
- and try to [toggle dark/light theme](javascript:OAX.app.$store.commit('TOGGLE_DARK')).

## Headers

### Header (level 3)

#### Header (level 4)

##### Header (level 5)

###### Header (level 6)

## Text

* normal
* _emphasis_
* **strong**
* ~~strikethrough~~
* `code`
* [link](www.example.com)
* <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>Del</kbd>

## Table

| Header | Header | Header |
| --- | --- | --- |
| Cell | Cell | Cell |
| Cell | Cell | Cell |

## Auto-link

www.example.com

## List

1. A
2. B
3. C

## Blockquote

> &hellip;in blockquote

## Horizontal Rule

---

## Image dimensions

![](data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjZmZhYjAwIiB2aWV3Qm94PSIwIDAgMjQgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIzIDE4VjZjMC0xLjEtLjktMi0yLTJIM2MtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxOGMxLjEgMCAyLS45IDItMnpNOC41IDEyLjVsMi41IDMuMDFMMTQuNSAxMWw0LjUgNkg1bDMuNS00LjV6Ii8+PC9zdmc+ =96x*) ![](data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjZmZhYjAwIiB2aWV3Qm94PSIwIDAgMjQgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIzIDE4VjZjMC0xLjEtLjktMi0yLTJIM2MtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxOGMxLjEgMCAyLS45IDItMnpNOC41IDEyLjVsMi41IDMuMDFMMTQuNSAxMWw0LjUgNkg1bDMuNS00LjV6Ii8+PC9zdmc+ =72x*) ![](data:image/svg+xml;charset=utf-8;base64,PHN2ZyBmaWxsPSIjZmZhYjAwIiB2aWV3Qm94PSIwIDAgMjQgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIzIDE4VjZjMC0xLjEtLjktMi0yLTJIM2MtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxOGMxLjEgMCAyLS45IDItMnpNOC41IDEyLjVsMi41IDMuMDFMMTQuNSAxMWw0LjUgNkg1bDMuNS00LjV6Ii8+PC9zdmc+ =48x*)

## Todo List

- [x] Born 
- [x] Live
- [ ] Die

## Block

```
... in block
```

## Syntax Highlight

### JSON

```json
{
  "string": "string",
  "number": 3.14,
  "array": [1, 2, 3],
  "object": {},
  "null": null
}
```

### XML

```xml
<family>
  <parent role="father">
    <child name="John"></child>
  </parent>
</family>
```

### YAML

```yaml
# this is an example of the Uber API
# as a demonstration of an API spec in YAML
openapi: "3.0.0"
info:
  title: Uber API
  description: Move your app forward with the Uber API
  version: "1.0.0"
servers:
  - url: https://api.uber.com/v1
```

### HTTP

```http
POST /task?id=1 HTTP/1.1
Host: example.org
Content-Type: application/json; charset=utf-8
Content-Length: 137

{
  "status": "ok",
  "extended": true,
  "results": [
    {"value": 0, "type": "int64"},
    {"value": 1.0e+3, "type": "decimal"}
  ]
}
```

### Bash

```bash
#!/bin/bash

###### CONFIG
ACCEPTED_HOSTS="/root/.hag_accepted.conf"
BE_VERBOSE=false

if [ "$UID" -ne 0 ]
then
 echo "Superuser rights required"
 exit 2
fi

genApacheConf(){
 echo -e "# Host ${HOME_DIR}$1/$2 :"
}
```

### Typescript

```typescript
class MyClass {
  public static myValue: string;
  constructor(init: string) {
    this.myValue = init;
  }
}
import fs = require("fs");
module MyModule {
  export interface MyInterface extends Other {
    myProperty: any;
  }
}
declare magicNumber number;
myArray.forEach(() => { }); // fat arrow syntax
```

### JavaScript

```javascript
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }
}

export  $initHighlight;
```

### Python

```python
@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''
```

### Java

```java
/**
 * @author John Smith <john.smith@example.com>
*/
package l2f.gameserver.model;

public abstract class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}
```

### Diff

```diff
Index: languages/ini.js
===================================================================
--- languages/ini.js    (revision 199)
+++ languages/ini.js    (revision 200)
@@ -1,8 +1,7 @@
 hljs.LANGUAGES.ini =
 {
   case_insensitive: true,
-  defaultMode:
-  {
+  defaultMode: {
     contains: ['comment', 'title', 'setting'],
     illegal: '[^\\s]'
   },

*** /path/to/original timestamp
--- /path/to/new      timestamp
***************
*** 1,3 ****
--- 1,9 ----
+ This is an important
+ notice! It should
+ therefore be located at
+ the beginning of this
+ document!

! compress the size of the
! changes.

  It is important to spell
```

### HTML

```html
<!DOCTYPE html>
<title>Title</title>

<style>body {width: 500px;}</style>

<script type="application/javascript">
  function $init() {return true;}
</script>

<body>
  <p checked class="title" id='title'>Title</p>
  <!-- here goes the rest of the page -->
</body>
```

### Markdown

```md
# Markdown

## Text

* normal
* _emphasis_
* **strong**
* ~~strikethrough~~
* `code`
* [link](www.example.com)
* <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>Del</kbd>

## Table

| Header | Header | Header |
| --- | --- | --- |
| Cell | Cell | Cell |
| Cell | Cell | Cell |
```
