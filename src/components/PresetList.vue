<template>
    <div class="preset-list">
        <preset-list-item
            v-for="(preset, index) in presets"
            :key="preset"
            :index="index"
            :is-active="preset === activePreset"
            @click.native="onPresetClick(preset)"
        />
    </div>
</template>

<script>
import PresetListItem from "@/components/PresetListItem.vue";
export default {
    components: {
        PresetListItem
    },
    props: ["presets", "activePreset"],
    methods: {
        onPresetClick(preset) {
            this.$emit("onSwitchPreset", preset);
        }
    }
};
</script>

<style>
.preset-list {
    background-color: #171717;
    height: 294px;
    padding: 2px;
    box-sizing: border-box;
}
</style>
