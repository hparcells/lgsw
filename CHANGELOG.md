# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Alpha [2020-02-15 - Present]
### [1.0.0-alpha.7] - 2020-02-20
#### Additions
- Even more cursor styles.
- Delete tool selection area will now be red.

#### Fixes
- Exiting delete mode actually removes you from delete mode.
- Using the delete tool no longer clears your clipboard.

### Known Issues
- Connecting three NOT gates together won't work as expected.
- Cuting a selection will randomize the IDs on paste.
- Switches that are on will not be displayed as on when in your hand.

### [1.0.0-alpha.6] - 2020-02-20
### Additions
- Copying. Press `Ctrl + C` to copy a selection. Then press `Ctrl + V` to recall it.
- Cuting. Press `Ctrl + X` to select an area. That area gets removed then placed in your clipboard.
- Mass deleting. Press `Ctrl + Z` to select an area. That area will be removed.

### Known Issues
- Connecting three NOT gates together won't work as expected.
- Cuting a selection will randomize the IDs on paste.
- Switches that are on will not be displayed as on when in your hand.
- Using the delete tool copies the area to your clipboard.
- Deleting a selection and placing something keeps you in delete mode.

### [1.0.0-alpha.5] - 2020-02-17
#### Additions
- Displays running version in the bottom left.

#### Fixes
- Fixed button not updating child modules when powering off.
- Fixed modules being uninteractable in certain cases of zoom levels and mouse position.

### Known Issues
- Connecting three NOT gates together won't work as expected.

### [1.0.0-alpha.4] - 2020-02-16
#### Additions
- Saving and loading. Press `O` to save your game to a text file. Press `I` to load your game through the contents of the text file.

#### Changes
- Further improved calculation method.

#### Fixes
- Fixed being able to connect a module to itself.

### Known Issues
- In very rare cases, modules may be unremovable.
- Connecting three NOT gates together won't work as expected.
- Button doesn't update child modules when turning off.

### [1.0.0-alpha.3] - 2020-02-15
#### Additions
- Speed control for clock. Not customizable yet.

#### Fixes
- Partially fixed looping modules together crashes game. (NOR 1 -> NOR 2 -> NOR 3 -> NOR 1)
- Increased module calculation accuracy.

### Known Issues
- You can connect modules to themselves. (OR 1 -> OR 1)
- In very rare cases, modules may be unremovable.
- Connecting three NOT gates together won't work as expected. 

### [1.0.0-alpha.2] - 2020-02-15
#### Additions
- Added Clock module. Alternates pulse every second. Press ` (back quote) to select.
- Added debug meters. Thanks [Dave](https://github.com/imdaveead).

#### Known Issues
- Looping modules together crashes game. (NOR 1 -> NOR 2 -> NOR 3 -> NOR 1)
- You can connect modules to themselves. (OR 1 -> OR 1)
- In very rare cases, modules may be unremovable.
- Module calculation doesn't work as expected in some cases.

### [1.0.0-alpha.1] - 2020-02-15
#### Additions
- Initial app.

#### Known Issues
- Looping modules together crashes game. (NOR 1 -> NOR 2 -> NOR 3 -> NOR 1)
- You can connect modules to themselves. (OR 1 -> OR 1)
- In very rare cases, modules may be unremovable.
