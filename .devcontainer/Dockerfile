FROM node:24-bookworm

WORKDIR /workspace

COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

RUN npm --prefix frontend ci \
    && npm --prefix backend ci

CMD ["sleep", "infinity"]