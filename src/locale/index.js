export default lang => {
    return require(`./${lang}`).default;
}