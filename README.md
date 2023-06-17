# use-goto
allows to use the power of `goto` in `JavaScript`!

Once again inspired by [Tsoding implementing goto in OCaml](https://www.youtube.com/watch?v=iPrltr1b6Q4), I decided to try to do the same in `JavaScript`.

It's worth to remember that `JavaScript` already has _GOTO-like_ functionality in the form of `break` and `continue` as I described in https://kentaromiura.wordpress.com/2014/05/25/hoppa-goto-style/, but I think this `use-*` utility, could actually be useful when handling errors.

In the OCaml implementation above Exception has been abused for forcing code jumping around, I realized it's not needed if adding `return` in front of `goto` as per example:

```
var {goto, start} = useGoto({
    loop(){
        if (i>=10) return goto('out');
        console.log(`hello world, ${i}`);
        i++;
        return goto('loop');
    },
    out() {
        console.log('done.')
    }
});
start();
```

As you can see from the example above it's possible to use [object method definitions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)

instead of having to use strings for labels, this way it looks just a bit better IMHO.

The code is written in ES3 compliant mode (with the exception of Object.keys, of which you'll have to include the polyfill) so you can use this in your IE6 adventures.

Various notes: 
- if your flow will continue to the next block you can omit `return`, eg: in the example above `return goto('loop');` can be _safely_ replaced with just `goto('loop')`
- if your flow will continue to the next flow you can omit the goto from a return, in the example above `if (i>=10) return goto('out');` the `goto('out')` can be left out.
- start is synchronous so you don't need to await for it and can _safely_ return the value you've collected, like in the repository _test.js_
- this rely on the fact that `JavaScript` preserve the definition of properties in order of the source, this is [not always true](https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order/38218582#38218582), especially in case you define properties that can be numbers, in that case this will break, just don't use Symbols or numbers for labels and you're ok.

