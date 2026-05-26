<script>
    let { messageObj, myUid } = $props();

    let isMine = $derived(messageObj.sender_uid === myUid);
</script>

<div class="message" class:sent={isMine} class:received={!isMine}>
    {#if !isMine}
        <span class="sender-name">{messageObj.sender_username}</span>
    {/if}
    
    <p>{@html messageObj.message_txt}</p>     <!-- filter -->
    <span class="time">{messageObj.date}</span>
</div>

<style lang="scss">
    .message {
        max-width: 60%;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        position: relative;
        margin-bottom: 1rem;

        p {
            margin: 0;
            white-space: pre-wrap; 
        }

        .sender-name {
            font-size: 0.8rem;
            font-weight: bold;
            color: #555;
            margin-bottom: 0.3rem;
            display: block;
        }

        .time {
            font-size: 0.7rem;
            color: #777;
            display: block;
            text-align: right;
            margin-top: 0.5rem;
        }

        &.sent {
            align-self: flex-end; 
            background-color: #ff3e00;
            color: white;
            border-bottom-right-radius: 0; 
            
            .time { color: #fce8e1; }
        }

        &.received {
            align-self: flex-start; 
            background-color: #e0e0e0;
            color: #333;
            border-bottom-left-radius: 0;
        }
    }
</style>
