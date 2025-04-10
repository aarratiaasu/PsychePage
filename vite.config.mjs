import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { viteStaticCopy } from "vite-plugin-static-copy"; 

export default defineConfig({
    plugins: [
        wasm(),
        topLevelAwait(),
        viteStaticCopy({ 
            targets: [
                { src: "res", dest: "" },  
                { src: "css", dest: "" },  
                { src: "img", dest: "" }   
            ]
        })
    ],
    optimizeDeps: {
        include: ["three"]
    },
    build: {
        assetsDir: "assets",
        outDir: "dist"
    }
});
