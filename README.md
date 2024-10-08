# live-site

WIP migration & refactor of the previous [Cal Hacks live site](https://github.com/calhacks/ddoski/tree/master/live).

## Development

If this **isn't** your first time, [click here](#run)!

### First Time?

```bash
# clone `dev` branch
git clone https://github.com/calhacks/live-site -b dev

cd live-site

# install dependencies (please do not mix alternate package managers)
npm install
```

#### Environment Variables

```bash
# copy and complete the template
cp .env.template .env
```

`.env.template` documentation:

-   `NODE_ENV`
    -   The current environment.
    -   Value: `production`, `development`, or `testing`
    -   Example: `NODE_ENV="development"`
-   `SPREADSHEET_ID`
    -   The ID of the Google spreadsheet you want to fetch data from. Can be found in the URL of the spreadsheet.
        -   `https://docs.google.com/spreadsheets/d/1Lw79IjgwBlNbxntis6VPHmVJppS8SEkj2tzKlwdwzf8/edit?gid=0#gid=0` -> `1Lw79IjgwBlNbxntis6VPHmVJppS8SEkj2tzKlwdwzf8`
    -   Example: `SPREADSHEET_ID="1Lw79IjgwBlNbxntis6VPHmVJppS8SEkj2tzKlwdwzf8"`
-   `GOOGLE_CREDENTIALS_CLIENT_EMAIL`
    -   The client email is found in the `credentials.json` of a Google service account.
        -   More info can be found here: https://console.cloud.google.com/iam-admin/serviceaccounts?
        -   **IMPORTANT: MAKE SURE THAT YOU SHARE THE SPREADSHEET WITH THIS EMAIL OR ELSE YOU WILL ENCOUNTER A 401: UNAUTHORIZED**
    -   Example: `GOOGLE_CREDENTIALS_CLIENT_EMAIL="project-service-account@project.iam.gserviceaccount.com"`
-   `GOOGLE_CREDENTIALS_PRIVATE_KEY`
    -   The private key is found in the `credentials.json` of a Google service account.
        -   More info can be found here: https://console.cloud.google.com/iam-admin/serviceaccounts?
        -   **IMPORTANT: MAKE SURE YOU COPY THE PRIVATE KEY IN ITS ENTIRETY AND WITHOUT MODIFICATION (INCLUDE `\n`, etc.)**
    -   Example: `GOOGLE_CREDENTIALS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"`

### Run

```bash
npm run dev
```
