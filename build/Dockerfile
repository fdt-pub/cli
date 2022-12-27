FROM docker.io/denoland/deno:distroless as build
WORKDIR /app

COPY tsconfig.json ./
COPY src ./src

CMD [ "run", "--allow-env","--allow-read", "--allow-write" ,"--allow-net" ,"--allow-run", "./src/main.ts"]
