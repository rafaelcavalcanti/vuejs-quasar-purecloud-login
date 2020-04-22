# Combining Vuejs, Quasar Framework and Purecloud SDK (Token Implicit Grant)

![Printscreen of the Home](https://github.com/rafaelcavalcanti/vuejs-quasar-purecloud-login/blob/master/src/assets/screenshot001.jpg)

- VueJS
- Quasar Framework
- Genesys Purecloud SDK Authentication
- Vuex
- Vue-Router
- Vue-i18n
- @quasar/quasar-app-extension-dotenv

## Purecloud setup

1. Login into [https://apps.mypurecloud.com/](https://apps.mypurecloud.com/).
2. (optional) If shows to select between **Collaborate/Communicate** or **Architect**, pleaase choose the first one [Collaborate/Communicate](https://apps.mypurecloud.com/directory).
3. Admin > OAuth
4. Click on '+ Add Client' button
5. Fill the form following:

| Field                    | Value                                    | PS                                                                                                                                                      |
| :----------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| App Name                 | <your_app_name>                          | -                                                                                                                                                       |
| Description              | <describe_what_it_is_about>              | -                                                                                                                                                       |
| Token Duration           | 86400                                    | -                                                                                                                                                       |
| Grant Types              | Token Implicit Grant (Browser)           | -                                                                                                                                                       |
| Authorized redirect URIs | http://localhost:8080/oauth/callback     | When you use it in production you need to specify the ip/domain as well in another line.                                                                |
| Scope                    | <alerting:readonly> <analytics:readonly> | For better comprehension i strongly recommend to read the [Purecloud Scopes](https://developer.mypurecloud.com/api/rest/authorization/scopes.html) page |

7. Click in the 'Save' button.
8. After save it will show you others fields, please save the value of the ’**Client ID**’ one.

## Using the project

Clone the repository

```sh
$ git clone https://github.com/rafaelcavalcanti/vuejs-quasar-purecloud-login
$ cd vuejs-quasar-purecloud-login
```

Install the dependencies

```sh
$ npm install
```

Setup

```sh
$ cp .env.example .env
```

PS: Edit the _.env_ file and include the **Client ID** received earlier into the **PURECLOUD_CLIENT_ID** constant

# Done

Run development mode and enjoy

```sh
$ quasar dev
```

### Others commands

Lint the files

```sh
$ npm run lint
```

Build the app for production

```sh
$ quasar build
```

To customize the configuration please take a look into [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
