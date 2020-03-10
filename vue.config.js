module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                onProxyRes(res) {
                    res.headers['access-control-allow-origin'] = 'http://localhost:8000';
                }
            }
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        }
    }
}