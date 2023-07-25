A sample Office add-in project based on [Next.js](https://nextjs.org/).
This is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and merged with add-in template generated from [yeoman generator](https://github.com/OfficeDev/generator-office).

## Getting Started

### Dev Server

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Note that the default behavior of `yarn dev` (`next dev`) is modified to launch a custom server (`server.js`) with `office-addin-dev-certs` plugin.This is because the Office add-in will not allow access without a valid HTTPS certificate.

Upon initial startup, you should be asked to confirm your self-issued certificates. Once confirmed, make sure the directory `~/.office-addin-dev-certs` is created. If you have some trouble on updating app settings, try to remove this directory and re-launch app.


See Next.js [custom server docs](https://nextjs.org/docs/pages/building-your-application/configuring/custom-server) in detail.

### Dev Client

Launch Word client:

```bash
yarn odev
```

This settings is provided with the `office-addin-debugging` plugin.

Tips. According to [Debugging with Safari Web Inspector on a Mac](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/debug-office-add-ins-on-ipad-and-mac#debugging-with-safari-web-inspector-on-a-mac), run the following command to enable debugger tool on Word:
- `defaults write com.microsoft.Word OfficeWebAddinDeveloperExtras -bool true`

## Deploy

First, deploy some hosting server (like vercel) on this app.
Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

To deliver add-in in your org, access [Microsoft 365 admin center > Settings > IntegratedApps](https://admin.microsoft.com/adminportal#/Settings/IntegratedApps) page, then upload `manifest.xml` with production settings.
Check out the official docs([Deploy add-ins in the Microsoft 365 admin center](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-deployment-of-add-ins)) for more details.