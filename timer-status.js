module.exports = function(RED) {
    function TimerStatusNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var timer = null;
        var duration = config.duration * 1000; // Convert to milliseconds

        node.status({fill:"red",shape:"dot",text:"Idle"});

        function sendOutput(triggered) {
            var output = triggered ? parseInt(config.outputValue) : 1 - parseInt(config.outputValue);
            node.send({payload: output});
            node.warn("Sending output: " + output);
        }

        node.on('input', function(msg) {
            if (msg.payload === parseInt(config.triggerValue)) { // Start timer
                clearTimeout(timer);
                node.status({fill:"yellow",shape:"dot",text:"Running"});
                timer = setTimeout(function() {
                    node.status({fill:"green",shape:"dot",text:"Triggered"});
                    sendOutput(true); // Triggered state
                }, duration);
            } else if (msg.payload === 1 - parseInt(config.triggerValue)) { // Reset timer
                clearTimeout(timer);
                node.status({fill:"red",shape:"dot",text:"Idle"});
                sendOutput(false); // Idle state
            }
        });

        node.on('close', function() {
            clearTimeout(timer);
        });
    }

    RED.nodes.registerType("timer-status", TimerStatusNode, {
        defaults: {
            name: { value: "" },
            duration: { 
                value: 900, 
                required: true, 
                validate: function(v) {
                    return !isNaN(v) && Number.isInteger(parseFloat(v));
                }
            },
            triggerValue: { value: "0", required: true },
            outputValue: { value: "0", required: true }
        }
    });
}