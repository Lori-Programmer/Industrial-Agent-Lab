# Edge Vision Lab User Guide

## Before You Start

Use this Demo only for fixed-scene object recognition. Do not point the camera at people, private areas, public crowds, license plates, ID cards, bank cards, student cards or other sensitive information.

## Basic Use

1. Open the Demo page in a browser that supports `navigator.mediaDevices.getUserMedia`.
2. Read the privacy and safety notice.
3. Confirm that the tool will only be used for object recognition.
4. Start camera recognition.
5. Review mock object results and engineering status.
6. Stop recognition when finished.

## Expected V1 Result

Mock objects:

- PLC Module
- Network Cable
- Mouse

Mock engineering status:

- Scene: PLC Debugging Desk
- Completeness: 75%
- Missing items: Switch, Power Adapter
- Status: Not Ready

## Troubleshooting

- If the camera cannot start, check browser permissions, camera device availability and HTTPS/localhost context.
- If the page feels slow, reduce preview size and recognition frequency.
- If mobile camera switching fails, stop the current stream before requesting the next `facingMode`.
