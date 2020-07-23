<template>
    <div class="list-item" :class="{ 'list-item--active': isActive }">
        <span class="list-item__number">{{ presetNumber }}</span>
        <span class="list-item__name">Preset {{ presetNumber }}</span>
    </div>
</template>

<script>
export default {
    props: ["index", "isActive"],
    computed: {
        presetNumber() {
            return this.index + 1;
        }
    }
};
</script>

<style lang="scss">
.list-item {
    display: block;
    border-radius: 3px;
    padding: 7px;
    font-size: 13px;
    margin-top: 2px;
    cursor: pointer;
    &--active {
        background-color: #1ca3f2;
    }
    &:hover {
        background-color: #1ca3f2;
    }
    &:first-child {
        margin-top: 0;
    }
    &__number {
        font-size: 10px;
        border: 1px solid #fff;
        padding: 0 4px;
        margin-right: 5px;
    }
}
</style>
