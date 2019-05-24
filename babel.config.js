const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                firefox: "60",
                chrome: "58",
                ie: "10"
            }
        }
    ]
];

const plugins = ["@babel/plugin-proposal-class-properties"];

module.exports = {
    presets,
    plugins,
};