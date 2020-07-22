<template>
    <div id="app">
        <h1>Presets: {{ activePreset }}</h1>
        <ul>
            <li
                v-for="preset in activeScenePresets"
                :key="preset"
                @click="switchToPreset(preset)"
                :class="{ active: preset === activePreset }"
            >
                {{ preset }}
            </li>
        </ul>
        <button @click.prevent="addPreset">Add Preset</button>
    </div>
</template>

<script>
import xjs from "xjs-framework/dist/xjs-es2015";

export default {
    name: "App",
    data() {
        return {
            activeScene: {},
            activePreset: "",
            activeScenePresets: []
        };
    },
    methods: {
        async addPreset() {
            const newPreset = await this.activeScene.addPreset();
            await this.switchToPreset(newPreset);
        },
        async getCurrentPresets() {
            try {
                this.activeScene = await xjs.Scene.getActiveScene();
                this.activeScenePresets = await this.activeScene.getPresets();
                await this.getActivePreset();
                return this.activeScenePresets;
            } catch (e) {
                console.error(e);
            }
        },
        async getActivePreset() {
            try {
                this.activePreset = await this.activeScene.getActivePreset();
                return this.activePreset;
            } catch (e) {
                console.error(e);
            }
        },
        async switchToPreset(preset) {
            try {
                await this.activeScene.switchToPreset(preset);
                await this.getCurrentPresets();
            } catch (e) {
                console.error(e);
            }
        }
    },
    async mounted() {
        await xjs.ready();
        await this.getCurrentPresets();
        xjs.ExtensionWindow.on("scene-load", () => {
            this.getCurrentPresets();
        });
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
li.active {
    color: red;
}
</style>
