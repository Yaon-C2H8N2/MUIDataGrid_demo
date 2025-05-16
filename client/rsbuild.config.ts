import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';

export default defineConfig({
    tools: {
        htmlPlugin: {
            template: './src/index.html',
            inject: true,
        }
    },
    plugins: [pluginReact()],
});
