const common = (function(PubSub,CategoryList,addCategory,CategoryCounter) {
    function subscribingOnLoads() {
        //Cycle of events that occurr after any updations in category list object as whold module rely on single bject
        PubSub.subscribe("onload",CategoryList.showTabCat)
        PubSub.subscribe("onload",CategoryCounter.displayCategoryCount)
        PubSub.subscribe("onload",CategoryList.renderList)

        //Now Raisable from any module whether it is available inside that or not by just publishing with key
        PubSub.subscribe("categoryadd",CategoryList.AddCategory)
        PubSub.subscribe("categoryedit",CategoryList.editHandler)

        //this is one way of accessing the onload due to some problem of accessing category object due to loading sequence
        PubSub.subscribe("indirectAccess",publisher)
    }

    function init() {
        subscribingOnLoads()
        PubSub.publish("onload",CategoryList.cnt)
    }

    function publisher(key) {
        PubSub.publish(key,CategoryList.cnt)
    }

    return {
        init
    }
}(PubSub,CategoryList,addCategory,CategoryCounter))