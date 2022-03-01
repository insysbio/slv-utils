# slv-utils

Utilities for transformation of DBSolve files (.SLV, .RCT and .DAT). It can be used as node package as well as command line tool.

DBSolveOptimum is modeling software for systems biology and systems pharmacology modeling developed by InSysBio, see <http://insysbio.com/en/software/db-solve-optimum>.

[![Autotests](https://github.com/insysbio/slv-utils/workflows/Autotests/badge.svg)](https://github.com/insysbio/slv-utils/actions)
[![GitHub issues](https://img.shields.io/github/issues/insysbio/slv-utils.svg)](https://GitHub.com/insysbio/slv-utils/issues/)
[![GitHub npm](https://img.shields.io/npm/v/slv-utils/latest.svg)](https://www.npmjs.com/package/slv-utils)
[![GitHub license](https://img.shields.io/github/license/insysbio/slv-utils.svg)](https://github.com/insysbio/slv-utils/blob/master/LICENSE)

## Installation

Required `nodejs` installed. Recommended version is >= 10.0.0.
```
npm install --global slv-utils
slv --version
```

## Help
See list of commands
```shell
slv -h
```
See help for particular command
```shell
slv help [command]
```

## Transformation of .SLV files

Parse SLV file and save in SLVJS format (JSON).
```shell
slv parse -o output.json model.slv
```

Export SLV file to Heta module file (.HETA).

```shell
slv slv2heta -o output.heta model.slv
```
**Note.** Conversion of SLV to Heta modules is intended for learning purposes and should NOT be used for modeling workflow. 
After creating Heta file one should check and manually fix update file for proper structure.
Known restrictions are:

- slv-utils does not transform slv functions to Heta supported list.
- All SLV ODE variables are transformed to species.
- slv-utils ignores Pools and if/else statements.
- slv-utils throw error when **Initial Values** includes expressions.

Export SLV file to Heta JSON file.

```shell
slv slv2heta --json -o output.json model.slv
```

## Transformation of .RCT files

Parse and save RCT in RCTJS format (JSON).
```shell
slv rct-parse -o output.json structure.rct
```

Serialize RCT from RCTJS format (reverse to slv rct-parse).
```shell
slv rct-serialize -o output.rct input.json
```

## Transformation of .DAT files

Parse and save DAT file in DATJS format (JSON).
```shell
slv dat-parse -o output.json data.dat
```

Serialize DAT from DATJS format (reverse to slv dat-parse).
```shell
slv dat-serialize -o output.dat input.json
```

## Transformations available in previous versions

Convert XLSX file with specific structure to DAT.
```shell
slv excel2dat -o output.dat input.xlsx
```

Convert XLSX file with specific structure to DATJS (JSON).
```shell
slv excel2json -o output.json input.xlsx
```
Convert DATJS file to XLSX.
```shell
slv json2excel -o output.xlsx input.json
```

## Usage for git

The tool can be used to display changes in Git diff command. It represents .SLV as text file based on **RHS** and **Initial Values** part.

Try
```shell
slv clear model.slv >> out.txt
```

For implementation in all git repositories use
```shell
git config --global diff.slv.textconv "slv clear"
```
In particular project include lines in .gitattributes
```
*.slv diff=slv
```

### Git settings

- [config gist](https://gist.github.com/metelkin/c9999257e75fabf75058b930f1859337)
- [.gitattributes gist](https://gist.github.com/metelkin/abbec1201627084da2950a7b16ca4469)

## Developers

- Evgeny Metelkin @metelkin
- Viktoria Tkachenko @vetedde
