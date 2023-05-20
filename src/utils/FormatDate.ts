import moment from "moment"

const dateToString = (unixTime: string, outputFormat: string) => {
    const formated = moment.unix(Number(unixTime)).format(outputFormat)
    return formated
}

export default dateToString
