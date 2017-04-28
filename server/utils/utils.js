/**
 * Created by workbook on 27.04.2017.
 */

export default function parseRawHeaders(data) {
    let header = {};
    for (let i = 0; i < data.length; i = i + 2) {
        header[data[i]] = data[i+1];
    }
    return header
}
