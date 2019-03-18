#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
const copyDir = require('copy-dir');
const {exec} = require('child_process');

const logo = chalk.magenta('[carafe-bundle]');

const log = (...args) => {
    console.log(logo, ...args)
};

log.error = (...args) => {
    console.log(chalk.red('[ERROR]'), ...args)
};

const cli = meow(
    `
  Usage

    $ npm init @soliant-consulting/carafe-bundle my-carafe-bundle
`,
    {
        booleanDefault: undefined,
        flags: {
            help: {
                type: 'boolean',
                alias: 'h',
            },
            version: {
                type: 'boolean',
                alias: 'v',
            },
        },
    }
);

const [name] = cli.input;

if (! name) {
    cli.showHelp(0)
}

const root = path.resolve(name);

if (fs.existsSync(root)) {
    log.error('Directory already exists');
    process.exit(1);
}

fs.mkdirSync(root, {recursive: true});
copyDir.sync(__dirname + '/template', root);
fs.renameSync(root + '/dist.gitignore', root + '/.gitignore');

log('Installing packages…');
exec('npm install', {
    cwd: root,
}, (err, stdout, stderr) => {
    if (err) {
        log.error('Error while installing packages');
        log.error(stderr);
    }

    log('Done installing packages');
});
