<script>
    let { keyDown } = $props();
</script>

<section id="keyBoard">
    <button type="button" value="1" onclick={keyDown}>1</button>
    <button type="button" value="2" onclick={keyDown}>2</button>
    <button type="button" value="3" onclick={keyDown}>3</button>
    <button type="button" value="ac" onclick={keyDown}>AC</button>

    <button type="button" value="4" onclick={keyDown}>4</button>
    <button type="button" value="5" onclick={keyDown}>5</button>
    <button type="button" value="6" onclick={keyDown}>6</button>
    <button type="button" value="+" onclick={keyDown}>+</button>

    <button type="button" value="7" onclick={keyDown}>7</button>
    <button type="button" value="8" onclick={keyDown}>8</button>
    <button type="button" value="9" onclick={keyDown}>9</button>
    <button type="button" value="-" onclick={keyDown}>-</button>

    <button type="button" value="0" onclick={keyDown}>0</button>
    <button type="button" value="=" onclick={keyDown}>=</button>
    <button type="button" value="c" onclick={keyDown}>Back</button>
</section>

<style>
    section#keyBoard {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding: 5px;
        margin: 0 auto;
    }

    button {
        background-color: rgb(238, 236, 236);
        color: black;
        text-align: center;
        padding: 20px;
        border-radius: 8px;
        font-size: 1rem;
    }
</style>
