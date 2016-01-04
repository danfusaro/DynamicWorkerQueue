# DynamicWorkerQueue
Spin up an infinite number of self-executing, parallel dynamic worker threads in a queue.  
#Bower
```
bower install dynamic-worker-queue
```
# Usage
```js
// Instantiate object
var wq = new WorkerQueue();

// Define worker inline
var test = function(event){
  console.log("From caller: " + event.data);
    postMessage('hi there, stranger');
  };
  
// Add definition to worker queue and define 'postMessage' callback
wq.addWorker(test, 
  function(worker){

    // This happens when the worker posts a message
    worker.onmessage = function(e){
                    console.log('From worker: ' + e.data)
                  };

    // Execute the defined method
    worker.postMessage("hey worker");
  });
```
