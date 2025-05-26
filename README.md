# Scenarios - POC

En testapp för att prova på konceptet med AI-assistent.

## Development

Installera appen:

```
yarn
```

Skapa en env-fil genom att kopiera exemplet.

```
cp .env.example.env .env
```

Appen pratar med [Intric](https://www.intric.ai/) via [AI Proxy api](https://github.com/Sundsvallskommun/web-app-intric-backend).

Lägg in dina assistent i din proxy och ange application+hash i din env, eller ange en api-nyckel i env.
Du måste alltid ange assistentens id.

Du behöver även ange urlen till din instans av AI proxy apit.

```
VITE_INTRIC_API_BASE_URL=
```

Stara sedan utvecklingsmiljön:

```
yarn dev
```

För produktion kör du

```
yarn build
yarn preview
```

### React + TypeScript + Vite

Appen är byggd med [React](https://react.dev/), [Typescript](https://www.typescriptlang.org/) och [Vite](https://vite.dev/).
