<template>
    <teleport to="body">
        <div v-if="show" @click="tryClose" class="backdrop"></div>
        <transition name="dialog">
            <dialog open v-if="show">
                <section>
                    <slot></slot>
                    
                </section>
            </dialog>
        </transition>
    </teleport>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 10;
    font-family: "Kufam", sans-serif;
}

dialog {
    font-family: "Kufam", sans-serif;
    position: fixed;
    top: 40vh;
    right: 25%;
    width: 80%;
    height: auto;
    z-index: 100;
    border-radius: 20px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: white;
}

header {
    background-color: #3a0061;
    color: white;
    width: 100%;
    padding: 1rem;
}

header h2 {
    margin: 0;
}

section {
    padding: 1rem;
    text-align: center;
    color: #3a0061;
    font-size: 30px;
}

menu {
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.dialog-enter-active {
    transition: all 0.3s ease-out;
}

.dialog-leave-active {
    transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
    opacity: 1;
    transform: scale(1);
}

@media (min-width: 768px) {
    dialog {
        left: calc(50% - 20rem);
        width: 40rem;
    }
}
</style>
