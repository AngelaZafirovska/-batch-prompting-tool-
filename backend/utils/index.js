const splitArrayIntoChunks = (array, chunkSize = 10) =>
    Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) => {
        const chunk = array.slice(i * chunkSize, i * chunkSize + chunkSize);
        return typeof array[0] === 'string' ? chunk.join(' ') : chunk;
    });

const getDomain = (url) => {
    try {
        // Add protocol if missing
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        const parsedUrl = new URL(url);
        return parsedUrl.hostname;
    } catch (error) {
        return null;
    }
}

module.exports = { splitArrayIntoChunks, getDomain };