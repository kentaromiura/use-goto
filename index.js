module.exports = function useGoto(blocks) {
    var skipping = true;
    function goto(block_name) {
        skipping = true;
        for (var x in blocks) {
            if (!skipping || x == block_name) {
                skipping = false;
                blocks[x]();
            }
        }
        skipping = true;
    }

    return {
        start: function(){
            return goto(Object.keys(blocks)[0])
        },
        goto: goto
    }
}