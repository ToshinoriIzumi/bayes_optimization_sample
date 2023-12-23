module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /.(jpg|jpeg|png|svg)$/,
                loader: 'file-loader',
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
            }
        ]
    },
    resolve: {
       extensions: ['.js', '.ts', '.tsx']
    },
}