
const importAll = (r) => {
    return r.keys().map(r)
}

const images = importAll(require.context('../Assets/Images/', false, /\.(png|jpe?g|svg)$/)).map(o => o.default)
console.log('images images images')
console.log(images)

export default images