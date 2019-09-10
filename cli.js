#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
const prompts = require('prompts');
const semver = require('semver');
const slugify = require('slugify');
const uuidv4 = require('uuid/v4');
const copyDir = require('copy-dir');
const {exec} = require('child_process');

const logo = chalk.magenta('[carafe-bundle]');
const bundleDirNamePattern = /^[\w\-]+$/;
const slugifyOptions = { remove: /[^\w\s]/, replacement: '-', lower: true };

const log = (...args) => {
    console.log(logo, ...args)
};

log.error = (...args) => {
    console.log(chalk.red('[ERROR]'), ...args)
};

const cli = meow(
    `
  Usage

    $ npm init @carafe-fm/bundle [my-new-bundle-name|-v|--version|-h|--help]
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

(async () => {

    let [bundleName] = cli.input;

    const questions = [
        {
            type: !bundleName ? 'text' : null,
            name: 'bundleName',
            message: 'Bundle Name?'
        },
        {
            type: 'text',
            name: 'bundleDirName',
            message: 'Bundle Directory Name?',
            initial: (prev, values) => slugify(bundleName ? bundleName : values.bundleName, slugifyOptions),
            validate: bundleDirName => bundleDirNamePattern.test(bundleDirName) ? true : `Letters, numbers, underscores, hypens only`
        },
        {
            type: 'autocomplete',
            name: 'bundleCategory',
            message: 'Bundle Category?',
            initial: 'Development',
            choices: [
              { title: 'Analysis' },
              { title: 'Calendar' },
              { title: 'Chart' },
              { title: 'Data Presentation' },
              { title: 'Date' },
              { title: 'Development' },
              { title: 'Hierarchy' },
              { title: 'Image Viewer' },
              { title: 'Map' },
              { title: 'Pivot' },
              { title: 'Progress Bar' },
              { title: 'Slider' },
              { title: 'Table' },
              { title: 'Text' },
              { title: 'Time' },
              { title: 'Tree' },
              { title: 'UI' },
              { title: 'Utility' }
            ],
            limit: 5
        },
        {
            type: 'text',
            name: 'bundleCreator',
            message: 'Bundle Creator?',
            initial: process.env.USER
        },
        {
            type: 'text',
            name: 'bundleVersion',
            message: 'Bundle Version?',
            initial: '0.0.1',
            validate: bundleVersion => carafeSemver(bundleVersion) ? true : `Not a valid version. Use MAJOR.MINOR.PATCH`
        }
    ]

    const response = await prompts(questions);
    bundleName = response.bundleName ? response.bundleName : bundleName;

    const root = extractTemplate(response.bundleDirName);
    const metaPath = root + '/src/meta.json';

    if (!fs.existsSync(metaPath)) {
        log.error('Error while reading meta.json');
        return;
    }

    const meta = JSON.parse(fs.readFileSync(metaPath));
    meta.id = uuidv4();
    meta.name = bundleName;
    meta.version = response.bundleVersion;
    meta.category = response.bundleCategory ? response.bundleCategory : 'Development';
    meta.creator = response.bundleCreator;
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 4));

    installPackages(root);

})();

function carafeSemver(bundleVersion) {
    return semver.valid(bundleVersion) && semver.valid(semver.coerce(bundleVersion)) === bundleVersion
};

function extractTemplate(name) {
    const root = path.resolve(name);
    if (fs.existsSync(root)) {
        log.error('Directory already exists');
        process.exit(1);
    }
    fs.mkdirSync(root, { recursive: true });
    copyDir.sync(__dirname + '/template', root);
    fs.renameSync(root + '/dist.gitignore', root + '/.gitignore');
    return root;
}

function installPackages(root) {
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
}
