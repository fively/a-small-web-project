// 使用插件
import { terser } from "rollup-plugin-terser";
export default {
  input: "./src/index.js",
  output: {
    file: "./dist/es.bundle.js",
    format: "es",
  },
  plugins: [terser()],
};
