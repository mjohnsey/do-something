# USAGE
# docker build -t do-something .
# docker run -it --rm -v $HOME/.config/do-something/config.toml:/root/.config/do-something/config.toml do-something

FROM node:13.7.0-stretch as builder
RUN apt-get update && apt-get install -y jq

WORKDIR /opt/app
# caching voodoo to cut down on build times
COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

# Package the CLI
COPY . .
RUN yarn run oclif-dev pack -t "linux-x64"

# copy the output archive to a nice name
RUN export VERSION=$(cat package.json | jq -r '.version') && \
  test -n "$VERSION" && \
  cp "/opt/app/dist/do-something-v${VERSION}/do-something-v${VERSION}-linux-x64.tar.gz" /opt/app/export.tar.gz

FROM debian:10-slim
WORKDIR /cli
COPY --from=builder "/opt/app/export.tar.gz" .
RUN tar -xvzf "/cli/export.tar.gz"
ENTRYPOINT [ "/cli/do-something/bin/do-something" ]
