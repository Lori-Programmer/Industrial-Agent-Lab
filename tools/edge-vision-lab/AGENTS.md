# AGENTS.md

Guidance for coding agents working on Edge Vision Lab.

## Mission

Keep the project safe, lightweight, and useful as an industrial vision portfolio demo.

## Non-Negotiable Safety Rules

- Do not add face recognition.
- Do not add identity recognition.
- Do not add emotion detection.
- Do not add personnel monitoring.
- Do not add attendance management.
- Do not identify age, gender, expression, fatigue, pressure, or personnel states.
- Do not identify license plates, ID cards, bank cards, student cards, or sensitive documents.
- Do not upload or save camera images/videos in V1.0.
- Do not add API keys, passwords, database accounts, or `.env` content.
- Do not commit real user data, camera recordings, faces, plates, student information, private-scene images, unauthorized models, or unauthorized datasets.

## Implementation Rules

- Keep browser camera constraints modest: 640x480, ideal 15 fps, max 20 fps.
- Keep inference throttled to 3-5 times per second unless there is a measured reason to change it.
- Avoid per-frame React state updates.
- Draw detection boxes with canvas.
- Always stop the previous stream before switching cameras.
- Always call `track.stop()` and clear `video.srcObject` when stopping.
- Keep ONNX Runtime Web lazy-loaded.
- Keep model files under `public/models/` only when they are authorized for redistribution.

## Documentation Rules

- Update `README.md`, `privacy-note.md`, `safety-boundary.md`, and `public-release-checklist.md` when changing data flow, camera behavior, model behavior, or release scope.
- Use bilingual Chinese/English summaries for public-facing docs.
- Keep TODO placeholders for future URLs, model names, and screenshots until they are real.

## Verification

Before handing off:

- Run `npm run build`.
- Test camera start, stop, and switch.
- Confirm JSON export uses mock/non-sensitive data.
- Confirm no sensitive files are staged.
