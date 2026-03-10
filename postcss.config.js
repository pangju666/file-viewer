export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16,
      //propList: ["font-size", "padding", "margin"],
      selectorBlackList: [],
      minPixelValue: 0,
      exclude: [/node_modules/i],
    },
  },
};
