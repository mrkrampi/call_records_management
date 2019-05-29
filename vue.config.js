// eslint-disable-next-line no-undef
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                ws: false,
                changeOrigin: true
            }
        }
    }
};
