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
$ npm install -g msa
$ msa COMMAND
running command...
$ msa (-v|--version|version)
msa/0.0.0 darwin-x64 node-v12.7.0
$ msa --help [COMMAND]
USAGE
  $ msa COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`msa help [COMMAND]`](#msa-help-command)
* [`msa list`](#msa-list)
* [`msa use [FILE]`](#msa-use-file)

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
  -h, --help

ALIASES
  $ msa ls
```

_See code: [src/commands/list.ts](https://github.com/Gunmer/msa-js/blob/v0.0.0/src/commands/list.ts)_

## `msa use [FILE]`

describe the command here

```
USAGE
  $ msa use [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/use.ts](https://github.com/Gunmer/msa-js/blob/v0.0.0/src/commands/use.ts)_
<!-- commandsstop -->
