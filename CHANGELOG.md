# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-alpha.2] - 2020-02-15
### Additions
- Added Clock module. Alternates pulse every second. Press ` (back quote) to select.
- Added debug meters. Thanks [Dave](https://github.com/imdaveead).

## [1.0.0-alpha.1] - 2020-02-15
### Additions
- Initial app.

### Known Issues
- Looping modules together crashes game. (NOR 1 -> NOR 2 -> NOR 3 -> NOR 1)
- You can connect modules to themselves. (OR 1 -> OR 1)