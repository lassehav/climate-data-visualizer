# Climate visualizer project

## Google cloud commands

### Local development with SQL Proxy

Use this when you have created a Cloud SQL database, but want to connect from local development environment. The "instances" address must be changed. You can find your correct address from the Cloud SQL database overview panel, under label "Connection name".

`cloud_sql_proxy_x64.exe -instances=awap2022demoproject:europe-west1:climate-db=tcp:3306`

### Deploying to App Engine
First build production version of the client first with command `npm run build` in the client directory.

Then execute the following command in the project root directory: 
`gcloud app deploy server/serverAppEngine.yaml client/clientAppEngine.yaml`
