# Node-RED Timer Status Node

This custom Node-RED node provides a visual timer status for your flows.

## Features

- Starts a timer when it receives a payload of 0
- Resets the timer when it receives a payload of 1
- Visual status indicator:
  - Red: Idle
  - Yellow: Timer running
  - Green: Timer triggered (duration elapsed)

[Input] -> [Trigger] -> [Function] -> [UI LED]
             |
             v
         [Output]

## Installation

In your Node-RED user directory, typically `~/.node-red`, run:
npm install <path-to-node-directory>/node-red-contrib-timer-status

## Usage

1. Drag the "Timer Status" node from the function category in the palette to your flow.
2. Double-click the node to configure:
   - Set a name (optional)
   - Set the duration in seconds
3. Connect an input that sends 0 to start the timer and 1 to reset it.
4. Connect the output to the node you want to trigger when the timer elapses.

## Development

This node is open source and contributions are welcome. Please submit issues and pull requests on GitHub.