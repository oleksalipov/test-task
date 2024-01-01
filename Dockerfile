FROM cypress/included:12.3.0

WORKDIR /app

COPY . /app/

RUN npm i

CMD ["npx", "cypress", "run"]

