export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ["font-size"],
      selectorBlackList: [],
      minPixelValue: 0,
      exclude: [/node_modules/i],
    },
  },
};
