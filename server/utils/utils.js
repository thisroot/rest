<<<<<<< HEAD
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
=======
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
>>>>>>> e442bcc69c8499ebe53f24ff5c42dfb5eff20109
