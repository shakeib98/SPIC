## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
To run on production:

```bash
npm run build
# or
yarn build
```
then,

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Customization

If you want to customize this app according to your needs, following are the things that you will need to change.

- Contract addresses in utils file.
- Contracts ABI in contracts folder.
- Baseurl for server in classes -> fetch.ts file.
- wasm file and zkey file in public folder.