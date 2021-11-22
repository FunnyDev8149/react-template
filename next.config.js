const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    basePath: '/react/temp/demo4',
    trailingSlash: isProduction
}