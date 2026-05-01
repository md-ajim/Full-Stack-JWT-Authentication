# 🔐 Full-Stack JWT Authentication System

A complete authentication system built with Django REST Framework (Backend) and Next.js (Frontend), featuring:

- ✅ Django Backend with JWT Authentication
- 🌐 Next.js Frontend with Next-Auth for Social Login
- 🎨 Tailwind CSS and Shadcn UI for a modern design
- 🔐 Secure OTP-based Email Verification
- 🔁 Forgot Password and Reset with OTP
- ⚙️ Customized Admin Panel (using Unfold for Django)
- 🛡️ Google OAuth Integration

---

## 🚀 Features

### 🔥 Backend (Django + Django REST Framework)
- User Registration with Email OTP Verification
- Secure Login with JWT Token Generation
- Forgot Password with Email OTP Reset
- Google OAuth (using `social-auth-app-django`)
- Modular apps and scalable architecture
- Customized Admin Panel with Unfold
- OTP Auto-expiry system for added security

### 🎨 Frontend (Next.js + Next-Auth + Tailwind CSS + Shadcn UI)
- Elegant UI/UX built with TailwindCSS and Shadcn UI components
- Next-Auth for authentication and Google Social Login
- Responsive mobile-first design
- JWT Token handling on client-side
- Seamless user experience with loading states and toast notifications

---

## 📁 Project Structure

```
Full-Stack-JWT-Authentication/
│
├— backend/                # Django Backend
│   ├— Authentication/     # User app (models, views, serializers)
│   ├— settings/           # Project settings, URLs
│   ├— templates/          # Email templates
│   ├— static/             # Custom static files
│   ├— staticfiles/        # Production collectstatic file
│   ├— mediafiles/         # Upload file (images, text, etc) 
│   └— manage.py
│
└— frontend/               # Next.js Frontend
    ├— app/                # Next.js App Directory
    ├— components/         # Reusable UI Components (Shadcn UI)
    ├— lib/                # Authentication and API utilities
    ├— public/             # Static assets
    └— tailwind.config.js  # TailwindCSS Configuration
```

---

## ⚙️ Backend Installation (Django)

```bash
# Clone the repository
git clone https://github.com/md-ajim/Full-Stack-JWT-Authentication.git
cd Full-Stack-JWT-Authentication/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```

### 🔑 Important Environment Variables (backend/.env)

```
EMAIL_HOST_USER=your_email@example.com
EMAIL_HOST_PASSWORD=your_email_password
SECRET_KEY=your_django_secret_key
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY=your_google_client_id
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET=your_google_client_secret
```

---

## 🎨 Frontend Installation (Next.js)

```bash
cd ../frontend

# Install Node modules
npm install

# Run the development server
npm run dev
```

### 🔑 Important Environment Variables (frontend/.env.local)

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret
NEXT_PUBLIC_API_URL=http://localhost:8000/api
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🔥 API Endpoints

| Method | Endpoint                  | Description                        |
|:------:|----------------------------|------------------------------------|
| POST   | /api/send-otp/              | User Registration (Email OTP)      |
| POST   | /api/verify-account/        | User Registration Verify OTP       |
| POST   | /api/login/                 | User Login (JWT access Token)      |
| POST   | /api/refresh/               | User Login (JWT refresh Token)     |
| POST   | /api/social-login/          | Social Provider Access Token       |
| POST   | /api/forget-password-send/  | Request OTP for password reset     |
| POST   | /api/reset-password/        | Reset Password with OTP            |

---

## 🌐 Social Login Setup

- Google OAuth2 using `social-auth-app-django` (backend)
- Next-Auth integration on frontend
- Configure your Google app credentials in both Django and Next.js `.env` files.

---
<!-- 
## 📸 Screenshots (Optional)

> (Add screenshots of Registration, OTP Verification, Admin Panel, Google Login, etc.)

---
-->
## 📃 License

This project is licensed under the MIT License.

---

## 👨‍💼 Author

**MD AJIM** — [mdajim.work](#)  
GitHub: [@md-ajim](#)

---

# 👨‍💼 How to Upload to GitHub

```bash
# After editing README.md locally:
git add README.md
git commit -m "Updated README with full project description"
git push origin master
```

---

# ✅ Bonus Tip

- Keep `.env`, secret keys, and sensitive info out of Git.
- Always use `.gitignore` to avoid accidental leaks.

