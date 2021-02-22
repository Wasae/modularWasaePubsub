const CategoryCounter =(function({publish,subscribe}) {
    function displayCategoryCount(c){
        const el = document.querySelector(".total-category")
        el.innerText = c.length
    }

    return {
        displayCategoryCount
    }
}(PubSub))