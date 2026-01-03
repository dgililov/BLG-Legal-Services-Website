# BLG Legal Services Website - Cloud Run Deployment
# Uses nginx to serve static files

FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/

# Copy website files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY pages/ /usr/share/nginx/html/pages/
COPY es/ /usr/share/nginx/html/es/
COPY fr/ /usr/share/nginx/html/fr/
COPY ru/ /usr/share/nginx/html/ru/
COPY he/ /usr/share/nginx/html/he/
COPY ka/ /usr/share/nginx/html/ka/
COPY fa/ /usr/share/nginx/html/fa/
COPY uz/ /usr/share/nginx/html/uz/

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

