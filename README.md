msa-js
======

maven settings administrator

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/msa-js.svg)](https://npmjs.org/package/msa-js)
[![Downloads/week](https://img.shields.io/npm/dw/msa-js.svg)](https://npmjs.org/package/msa-js)
[![License](https://img.shields.io/npm/l/msa-js.svg)](https://github.com/Gunmer/msa-js/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g msa-js
$ msa COMMAND
running command...
$ msa (-v|--version|version)
msa-js/1.1.0 darwin-x64 node-v12.7.0
$ msa --help [COMMAND]
USAGE
  $ msa COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`msa add NAME FILE`](#msa-add-name-file)
* [`msa delete SETTING`](#msa-delete-setting)
* [`msa doctor`](#msa-doctor)
* [`msa help [COMMAND]`](#msa-help-command)
* [`msa list`](#msa-list)
* [`msa update [CHANNEL]`](#msa-update-channel)
* [`msa use SETTING`](#msa-use-setting)

## `msa add NAME FILE`

Add a new setting

```
USAGE
  $ msa add NAME FILE

ARGUMENTS
  NAME  Name of setting
  FILE  Path of setting file

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ msa a
```

_See code: [src/commands/add.ts](https://github.com/Gunmer/msa-js/blob/v1.1.0/src/commands/add.ts)_

## `msa delete SETTING`

Delete a setting

```
USAGE
  $ msa delete SETTING

ARGUMENTS
  SETTING  Select setting for delete

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ msa d
```

_See code: [src/commands/delete.ts](https://github.com/Gunmer/msa-js/blob/v1.1.0/src/commands/delete.ts)_

## `msa doctor`

Tool for diagnostic and fix some issues

```
USAGE
  $ msa doctor

OPTIONS
  -f, --fix
  -h, --help  show CLI help
```

_See code: [src/commands/doctor.ts](https://github.com/Gunmer/msa-js/blob/v1.1.0/src/commands/doctor.ts)_

## `msa help [COMMAND]`

display help for msa

```
USAGE
  $ msa help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `msa list`

Show a list of settings

```
USAGE
  $ msa list

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ msa ls
```

_See code: [src/commands/list.ts](https://github.com/Gunmer/msa-js/blob/v1.1.0/src/commands/list.ts)_

## `msa update [CHANNEL]`

update the msa CLI

```
USAGE
  $ msa update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.9/src/commands/update.ts)_

## `msa use SETTING`

Select the setting to use

```
USAGE
  $ msa use SETTING

ARGUMENTS
  SETTING  Select setting for use

OPTIONS
  -h, --help  show CLI help

ALIASES
  $ msa u
```

_See code: [src/commands/use.ts](https://github.com/Gunmer/msa-js/blob/v1.1.0/src/commands/use.ts)_
<!-- commandsstop -->
