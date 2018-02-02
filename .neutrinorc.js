module.exports = {
    use: [
        'neutrino-preset-react',
        (neutrino) => {
            neutrino.config
                .devtool('source-map')
                .entry('vendor')
                .add('react')
                .add('react-dom')
        },
        'neutrino-middleware-style-loader',
        'neutrino-middleware-sass'
    ]
}
//'neutrino-preset-karma',