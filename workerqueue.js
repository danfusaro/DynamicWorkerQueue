; {
    var queued = [];

    function WorkerQueue() {
        // Set number of conccurent processes based on hardware if available, or default to 4
        var WORKER_LIMIT = window.navigator.hardwareConcurrency ? window.navigator.hardwareConcurrency - 1 : 4;

        var exports = this;

        var urlProvider = window.URL || window.webkitURL || null;

        exports.addWorker = function(workFunction, callback) {
            var workers = queued;
            var workerInfo = {
                workFunction: workFunction,
                callback: callback
            };

            // Add to queue
            workers.push(workerInfo);
            // Encapsulate remove function since indices are always changing
            workerInfo.remove = function() {
                workers.splice(workers[length - 1], 1)
            };

            if (workers.length <= WORKER_LIMIT) {
                executeWorkerInfo(workerInfo);
            }
        }

        var executeWorkerInfo = function(workerInfo) {
            var workers = queued;
            // Spin off worker and remove from queue
            var blob = new Blob(['self.onmessage = ' + workerInfo.workFunction]);
            var url = urlProvider.createObjectURL(blob);
            var worker = new Worker(url);
            workerInfo.callback(worker);
            var callback = worker.onmessage;
            worker.onmessage = function(e) {
                callback(e);
                // TODO - optimize and remove errors
                workerInfo.remove();
                var info = workers.length > 0 ? workers[0] : null;
                // Move on to next worker in stack
                if (info) {
                    //console.log("Workers left to execute: " + workers.length);
                    executeWorkerInfo(info);
                }
            }
        };
        return exports;
    }
}
