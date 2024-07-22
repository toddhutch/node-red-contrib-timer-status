module.exports = function(RED) {
    function TimerStatusNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var timer = null;
        var duration = config.duration * 1000; // Convert to milliseconds

        node.status({fill:"red",shape:"dot",text:"Idle"});

        node.on('input', function(msg) {
            if (msg.payload === 0) { // Start timer
                clearTimeout(timer);
                node.status({fill:"yellow",shape:"dot",text:"Running"});
                timer = setTimeout(function() {
                    node.status({fill:"green",shape:"dot",text:"Triggered"});
                    node.send(msg);
                }, duration);
            } else if (msg.payload === 1) { // Reset timer
                clearTimeout(timer);
                node.status({fill:"red",shape:"dot",text:"Idle"});
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
            }
        }
    });
    
}