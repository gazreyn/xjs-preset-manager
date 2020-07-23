<template>
    <div id="app">
        <div class="header">
            <h1 class="header__title">Presets</h1>
            <h3 class="header__subtitle">
                Current Scene: {{ activeScene._name }}
            </h3>
        </div>
        <preset-list
            :presets="activeScenePresets"
            :activePreset="activePreset"
            @onSwitchPreset="switchToPreset"
        />
        <div class="button-bar">
            <button class="btn btn--destroy" @click.prevent="removePreset">
                <i class="material-icons btn__icon--small">delete</i>
            </button>
            <button class="btn btn--primary" @click.prevent="addPreset">
                <i class="material-icons btn__icon--small">add</i>Add Preset
            </button>
        </div>
    </div>
</template>

<script>
import xjs from "xjs-framework/dist/xjs-es2015";
import PresetList from "@/components/PresetList.vue";

export default {
    name: "App",
    components: {
        PresetList
    },
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
        async removePreset() {
            try {
                await this.activeScene.removePreset(this.activePreset);
                await this.getCurrentPresets();
            } catch (e) {
                console.error(e);
            }
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
        },
        async configureExtensionWindow() {
            try {
                await xjs.ExtensionWindow.setBorder(1);
                await xjs.ExtensionWindow.resize(381, 444);
                await xjs.ExtensionWindow.setTitle("Preset Manager");
            } catch (e) {
                console.error(e);
            }
        }
    },
    async mounted() {
        await xjs.ready();
        await this.configureExtensionWindow();
        await this.getCurrentPresets();
        xjs.ExtensionWindow.on("scene-load", () => {
            this.getCurrentPresets();
        });
    }
};
</script>

<style lang="scss">
@import "@/assets/styles/_buttons.scss";

html,
body {
    padding: 0;
    margin: 0;
    background-color: #232529;
    width: 381px;
    height: 444px;
}
#app {
    font-family: "Segoe UI", Arial, Helvetica, sans-serif;
    color: #fff;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}
.header {
    margin-bottom: 20px;
    &__title {
        margin: 0;
        padding: 0;
        font-size: 18px;
    }
    &__subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        font-size: 13px;
        color: #cbcbcb;
    }
}
.button-bar {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    & .btn {
        margin-left: 3px;
    }
}
</style>
