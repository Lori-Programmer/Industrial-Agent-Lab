# Public Release Checklist
## 公开发布检查清单

Use this checklist before pushing Edge Vision Lab to a public GitHub repository.

公开发布到 GitHub 前，请逐项检查。

## Product Scope

- [ ] The project is clearly described as a fixed-scene object detection demo.
- [ ] The README explains the website experience version and GitHub local-run version.
- [ ] The demo is not described as face recognition, identity recognition, emotion recognition, surveillance, or attendance.
- [ ] The demo is not described as a production safety, law enforcement, or commercial decision system.

## Privacy And Safety

- [ ] `privacy-note.md` is present and updated.
- [ ] `safety-boundary.md` is present and updated.
- [ ] The UI has an obvious safety notice before camera usage.
- [ ] The camera confirmation text is visible before starting.
- [ ] The camera stops with `track.stop()`.
- [ ] The page does not upload or save images/videos in V1.0.
- [ ] No analytics, user tracking, or feedback storage is enabled unless documented.

## Files That Must Not Be Published

- [ ] No `.env`.
- [ ] No API Key.
- [ ] No server password.
- [ ] No database account.
- [ ] No real user submitted data.
- [ ] No real camera video.
- [ ] No test image containing faces, license plates, ID cards, bank cards, student information, or private scenes.
- [ ] No unauthorized model.
- [ ] No unauthorized dataset.

## Build And Experience

- [ ] `npm install` succeeds.
- [ ] `npm run build` succeeds.
- [ ] Camera can start.
- [ ] Camera can stop and the browser camera indicator turns off.
- [ ] Camera can switch when the device has multiple cameras.
- [ ] Mock detection boxes render with canvas.
- [ ] The page remains responsive on mobile and desktop.
- [ ] JSON export contains only mock data and privacy flags.

## Repository Hygiene

- [ ] `.gitignore` includes `.env*`, `node_modules`, build outputs, logs, videos, and local captures.
- [ ] `AGENTS.md` is present for future coding agents.
- [ ] README can be understood within 10 seconds from the first screen.
- [ ] The release does not push directly to `main` without review.
