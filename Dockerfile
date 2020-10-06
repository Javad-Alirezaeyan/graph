# Install dependencies
RUN npm install
RUN npm run migrate-up
RUN npm run start