
const singleResourceResponse = (data) => {
    return {
        data: data,
    }
}

const collectionResourceResponse = (data) => {
    const items = createListItems(data);

    return {
        items: items,
        meta: {
            count: items.length,
        }
    };
}

const createListItems = (data) => {
    const items = [];
    data.forEach(function (item) {
        items.push(item);
    });
    return items;
}

const formatResponse = (results) => {
    const formattedResponse = Array.isArray(results)
        ? collectionResourceResponse(results)
        : singleResourceResponse(results);
    return formattedResponse;
}

module.exports = {
    formatResponse
};