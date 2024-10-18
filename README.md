# Expense Tracker App

This is a [Next.js](https://nextjs.org) project.

## Local Installation

#### System requirements

| Technology | Version  |
| ---------- | -------- |
| Node       | ^18.17.1 |

#### Enviroment

This project uses a .env file, so create a `.env.local` file in the root of the project and add the following structure:

```bash
NEXT_URI=uri_to_backend # eg. https://backend.com
NEXT_URI_AUTH=uri_to_login_service # eg. http://backend.com/login

NEXTAUTH_URL=url_to_the_frontend # Check NextAuth documentation
NEXTAUTH_SECRET=secret # Secret used by NextAuth
```

#### Installation

Let's run this as a local server. To archive the installation you must:

1. Make sure you have install Node, if not install it
2. Make sure you have install npm, yarn, pnpm or bun, if not install it
3. Clone the repository
4. Install the dependencies by running the command:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

After the system is running, open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Web deployment

Open [https://expense-tracker-frontend-six-red.vercel.app](https://expense-tracker-frontend-six-red.vercel.app) in your browser to see the result on the web.

## External Libraries

This system used external libraries to work, by default used Next.js basic configuration so it used Tailwind

### Shadcn

Is use for styling and components, also in the documentation it offer some 'blocks' that can let you build up the system in less time.

### DayJS

In this project is used to manage the day format and get the difference between dates

### NextAuth

Used to manage the authentication and authorization of the user by managin the access token

### Zod

It help in the client side form validation

### Other libraries

There are other libraries such @radix-ui, sonner, clsx, lucide-react, next-themes or recharts, those comes along with Shadcn for some components
