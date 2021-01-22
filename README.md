# Notion OSC Server

The purpose of this project is to be able to test the Neurosity OS functionality for OSC Streaming. The code in this repo mimics the OSC server running on Neurosity devices.

Created to test integration with [BrainFlow](https://github.com/brainflow-dev/brainflow) and [Neuromore Studio](https://neuromore.com).

### Setup

> Clone this repo and make sure NodeJS is installed

- `npm install`
- `npm start`

### Custom environment variables (optional)

- Create `.env` file in the root
- Add variables to override:

```
NEUROSITY_DEVICE_UUID=local7cca794fb5f4675a69371e949b2
NEUROSITY_DEVICE_MODEL_NAME=Notion
NEUROSITY_DEVICE_MODEL_VERSION=2
NEUROSITY_DEVICE_SAMPLING_RATE=250
NEUROSITY_DEVICE_CHANNELS=8
NEUROSITY_DEVICE_CHANNEL_NAMES=CP6,F6,C4,CP4,CP3,F5,C3,CP5
NEUROSITY_OSC_LOCAL_HOST=0.0.0.0
NEUROSITY_OSC_LOCAL_PORT=8000
NEUROSITY_OSC_REMOTE_PORT=9000
NEUROSITY_OSC_DATA_FORMAT=brainflow (or neuromore)
```
