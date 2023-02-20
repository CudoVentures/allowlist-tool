FROM node:16-buster as builder

ARG WORKING_DIR="/usr/src/cudos-allowlist"

COPY ./ ${WORKING_DIR}

WORKDIR ${WORKING_DIR}

RUN npm i

RUN npm run build:prod

RUN npm run build:frontend:prod

FROM node:16-buster

ARG WORKING_DIR="/usr/local/cudos-allowlist" 

RUN if [ $USER_NAME != 'root' ]; then \
        groupmod -g 2000 node; \
        usermod -u 2000 -g 2000 node; \
        groupadd --gid ${GROUP_ID} ${GROUP_NAME}; \
        useradd --no-log-init --create-home --shell /bin/bash --uid ${USER_ID} --gid ${GROUP_ID} ${USER_NAME}; \
    fi

WORKDIR ${WORKING_DIR}
COPY --from=builder "/usr/src/cudos-allowlist" ./

# COPY --from=builder "/usr/src/cudos-allowlist/package.json" ./package.json


COPY --from=builder "/usr/src/cudos-allowlist/config/.env" ./config/.env

# RUN chown -R node:node ${WORKING_DIR}

# USER node

RUN npm i --omit=dev

CMD ["npm", "run", "start:backend:prod"] 