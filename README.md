# Webtaskify

Create JS proxies to be able to call [webtask.io](https://webtask.io) easily from your FrontEnd app.

## Key Features
* Create a **Real backednless SPA** with [webtask.io](https://webtask.io)
* **Integrate with [webtask.io](https://webtask.io)** to run tasks.
* **In development mode**, send the code to be run on for each task for **easy debuggability**.
* **In production mode**, point to the URL where the code is located to allow caching and faster execution of tasks.
* **Inspect [webtask.io](https://webtask.io) logs** to debug any possible problem.

## Installing it

With [npm](http://npmjs.org/) run:

```
npm install -g webtaskify
```

## Using it

Once it's installed, you'll be able to call the `webtaskify` command from your terminal.

```bash
  Usage: cmd [options] [command]


  Commands:

    login              Enter your account name and WebTask token to run other tasks
    create [options]   Creates the proxy files to be able to call https://webtask.io/ to run your backend task
    logs [options]     Logs the output of Webtask.io. Usefull for debugging tasks

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

### Create

```bash
 Usage: create [options]

  Creates the proxy files to be able to call https://webtask.io/ to run your backend task

  Options:

    -h, --help                       output usage information
    -b, --baseUrl <baseUrl>          Base URL for all tasks files. By default, Referer will be used from the request if not specified
    -f, --files <files>              Glob that references all tasks that can be used
    -e, --env <env>                  The path to the .env file. Defaults to ./.env
    -o, --output <folder>            Location to save the proxy files. Defaults to current directory
```

### Logs

```bash
  Usage: logs [options]

  Logs the output of Webtask.io. Usefull for debugging tasks

  Options:

    -h, --help                       output usage information
    -r, --raw                       Outputs a raw JSON output
```

## Examples

### `webtaskify login`

Logs the user in

```bash
webtaskify login
> Enter your WebTask account name: mgonto
> Enter your WebTask Token (hidden):
```

### `webtaskify create`

#### Create the proxy files for all tasks inside the `/tasks/` folder

```bash
webtaskify create -f ./tasks/**/*.js
```

#### Create the proxy files for `email.js` and outputs the proxies into the `build/` folder

```bash
webtaskify create -f ./email.js -o build/
```

#### Create the proxy files with a baseUrl from Github Pages (Where the code will be deployed)

```bash
webtaskify create -f ./tasks/**/*.js -b 'http://auth0.github.io/taskd-sample/'
```

### `webtaskify logs`

#### Log the output of running the WebTask

```bash
webtaskify logs
```

## Contributing

Just clone the repo, do `npm i` and start hacking :D.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## License

MIT
