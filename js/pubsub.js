const PubSub=(function() {
    let eventBucket = {}

    function subscribe(key,f) {
        if (eventBucket) eventBucket[key] = eventBucket[key] || []
        eventBucket[key].push(f)
    }

    function publish(key,data) {
        if (eventBucket[key]) eventBucket[key].forEach(function(func) { func(data) })
    }

    function unsubscribe(key) {
        if (eventBucket[key]) {
            delete eventBucket[key]
        }
    }

   return {
    publish,
    subscribe
   }
}())