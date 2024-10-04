# Step 1: Gunakan image Node.js
FROM node:22-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy file package.json dan package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy seluruh source code
COPY . .

# Step 6: Generate Prisma Client
RUN npx prisma generate

# Step 7: Build aplikasi untuk production
RUN npm run build

# Step 8: Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Step 9: Jalankan aplikasi
CMD ["npm", "start"]
