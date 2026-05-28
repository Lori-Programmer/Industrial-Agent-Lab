# Elevator Dispatch Simulator Architecture

## Planned Modules

- `src/simulation`: discrete event simulation.
- `src/policies`: dispatch policies.
- `src/metrics`: wait time, travel time, energy proxy and throughput.
- `src/visualization`: future UI or chart layer.

## Core Loop

1. Generate passenger requests.
2. Update elevator states.
3. Apply dispatch policy.
4. Move elevators and resolve pickups/drop-offs.
5. Record metrics.
