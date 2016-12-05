// Subscribe a parse query for livequery, handlers are passed using object
function subscribe(query, handlers) {
    const subscription = query.subscribe();
    subscription.on('create', handlers.create);
    subscription.on('update', handlers.update);
    subscription.on('enter', handlers.enter);
    subscription.on('leave', handlers.leave);
    subscription.on('delete', handlers.delete);
    subscription.on('close', handlers.close);
    return subscription;
}

module.exports = subscribe;
