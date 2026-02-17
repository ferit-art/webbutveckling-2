<script>
    import KeyBoard from "/home/ferit/Webbutveckling/Webbutveckling_2/Moment 2/src/lib/components/Keyboard.svelte";

    let display = $state("");
    let tal1 = $state("");
    let tal2 = $state("");

    function keyDown(e) {
        let val = e.target.value; // Knappens value-värde
        if (val === "ac") {
            display = "";
        } else if (val === "c") {
            display = display.slice(0, -1);
        } else if (Number(val) >= 0 && Number(val) < 10) {
            display += val;
            tal2 = val;
        } else if (val === "+" || val === "-") {
            tal1 = display;
            display += val;
        } else if (val === "=") {

            let result = 0;
            if (display.includes("+")) {
                result = Number(tal1) + Number(tal2);
            } else if (display.includes("-")) {
                result = Number(tal1) - Number(tal2);
            }

            display = String(result);
            tal1 = "";
            tal2 = "";
        }
    }
</script>

<fieldset>
    <legend>KeyBoard</legend>
    <input type="text" value={display} disabled />
    <KeyBoard {keyDown} />
</fieldset>
