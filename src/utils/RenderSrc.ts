const renderImgSrc = (imgUrl: string) => {
    const regex = /\([^)]*\)/g;
    const src = imgUrl.match(regex)?.map(match => match.slice(1, -1))[0]
    return src
}

export default renderImgSrc

