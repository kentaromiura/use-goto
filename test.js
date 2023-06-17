const useGoto = require('./index');

const output = [];
const test = () => {
    let i = 0;
    var {goto, start} = useGoto({
        loop(){
            if (i>=10) return goto('out');
            output.push(`hello world, ${i}`);
            i++;
            return goto('loop');
        },
        out() {
            output.push('done.')
        }
    });
    start();
    return output;
}

const TEST_RESULT = `hello world, 0
hello world, 1
hello world, 2
hello world, 3
hello world, 4
hello world, 5
hello world, 6
hello world, 7
hello world, 8
hello world, 9
done.` === test().join('\n');
console.log(`TEST ${TEST_RESULT? 'succeed!' : 'failed!'}`);

return TEST_RESULT ? 0 : -1;