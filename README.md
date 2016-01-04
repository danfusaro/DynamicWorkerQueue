# DynamicWorkerQueue
Spin up an infinite number of self-executing dynamic worker threads in a queue.  
# Usage
```js
// Instantiate object
var wf = new WorkerFactory();

// Define worker inline
var test = function(event){
	console.log("From caller: " + event.data);
    postMessage('hi there, stranger');
  };
  
// Add definition to worker queue and define 'postMessage' callback
wf.toWorker(test, 
	function(worker){

		// This happens when the worker posts a message
		worker.onmessage = function(e){
    								console.log('From worker: ' + e.data)
                  };

    // Execute the defined method
  	worker.postMessage("hey worker");
  });
```
