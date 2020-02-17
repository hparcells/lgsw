# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-alpha.5] - 2020-02-17
### Fixes
- Fixed button not updating child modules when powering off.

## [1.0.0-alpha.4] - 2020-02-16
### Additions
- Saving and loading. Press `O` to save your game to a text file. Press `I` to load your game through the contents of the text file.

### Changes
- Further improved calculation method.

### Fixes
- Fixed being able to connect a module to itself.

## Known Issues
- In very rare cases, modules may be unremovable.
- Connecting three NOT gates together won't work as expected.
- Button doesn't update child modules when turning off.

## [1.0.0-alpha.3] - 2020-02-15
### Additions
- Speed control for clock. Not customizable yet.

### Fixes
- Partially fixed looping modules together crashes game. (NOR 1 -> NOR 2 -> NOR 3 -> NOR 1)
- Increased module calculation accuracy.

## Known Issues
- You can connect modules to themselves. (OR 1 -> OR 1)
- In very rare cases, modules may be unremovable.
- Connecting three NOT gates together won't work as expected. 

## [1.0.0-alpha.2] - 2020-02-15
### Additions
- Added Clock module. Alternates pulse every second. Press ` (back quote) to select.
- Added debug meters. Thanks [Dave](https://github.com/imdaveead).

### Known Issues
- Looping modules together crashes game. (NOR 1 -> NOR 2 -> NOR 3 -> NOR 1)
- You can connect modules to themselves. (OR 1 -> OR 1)
- In very rare cases, modules may be unremovable.
- Module calculation doesn't work as expected in some cases.

## [1.0.0-alpha.1] - 2020-02-15
### Additions
- Initial app.

### Known Issues
- Looping modules together crashes game. (NOR 1 -> NOR 2 -> NOR 3 -> NOR 1)
- You can connect modules to themselves. (OR 1 -> OR 1)
- In very rare cases, modules may be unremovable.
