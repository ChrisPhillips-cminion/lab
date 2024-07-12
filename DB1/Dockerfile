FROM registry.redhat.io/ubi8/nodejs-16@sha256:35fb559bc20aee999444c6fe4f875efd27f7ad0aa42eac4ea788449249a36864

WORKDIR /app
RUN chmod 755 /app
COPY * /app
RUN npm i

CMD node index.js
