FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Atlas mode — 603 atlas files instead of 23,000+ individual PNGs
COPY index_atlas.html /usr/share/nginx/html/index.html
COPY engine_atlas.js  /usr/share/nginx/html/engine_atlas.js
COPY nd1_scenes.json  /usr/share/nginx/html/nd1_scenes.json
COPY nd1_atlases/     /usr/share/nginx/html/nd1_atlases/
COPY nd1_images/      /usr/share/nginx/html/nd1_images/
COPY nd1_audio/       /usr/share/nginx/html/nd1_audio/

EXPOSE 80
