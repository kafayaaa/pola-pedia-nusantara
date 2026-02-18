<div align="center">
  <img src="https://via.placeholder.com/150/FF4B4B/FFFFFF?text=PN" alt="Polapedia Logo" width="120" />
  <h1>Polapedia Nusantara</h1>
  <p>A Modern Blog CMS Platform built with Next.js 15 and Supabase for dynamic and responsive content management.</p>

  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Supabase-BaaS-green?style=for-the-badge&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" alt="Vercel" />
</div>

---

### 📖 Project Description
**Polapedia Nusantara** is an internal blog management system designed for speed and ease of use. This platform allows administrators to publish news, manage content via a Rich Text Editor, and handle image assets efficiently through integrated cloud storage.

### ✨ Key Features
- 🔒 **Secure Authentication**: Full integration with Supabase Auth for secure admin session management.
- 📝 **Rich Text Editor**: An interactive writing experience featuring a *SimpleEditor* and automatic slug generation.
- 🖼️ **Cloud Storage**: Upload blog covers directly to Supabase Storage with strict RLS (Row Level Security) policies.
- 🚀 **Server-Side Rendering (SSR)**: Leveraging Next.js App Router for optimal SEO performance and page load speeds.
- 📱 **Mobile Ready**: Fully responsive design tailored for seamless access across all devices.
- 🎭 **Smooth Animations**: Engaging UI interactions powered by GSAP (GreenSock Animation Platform).

### 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router - Fullstack)
- **Database & Auth**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage Buckets
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **Icons**: Lucide React & FontAwesome
- **Language**: TypeScript

### 🚀 Getting Started

Follow these steps to run the project in your local environment:

#### Prerequisites
- Node.js (v18 or higher)
- npm / yarn / pnpm
- A Supabase Project account

#### Installation & Setup
1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/username/polapedia-nusantara.git](https://github.com/username/polapedia-nusantara.git)
   cd polapedia-nusantara
2. **Install Dependencies**:
   ```bash
   npm install
3. **Configure Environment Variables:**
   Create a .env.local file in the root directory and add your Supabase credentials:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
4. **Run the development server:**
   ```bash
   npm run dev
Open http://localhost:3000 to see the result.
🏗️ Project Architecture
/app - Next.js App Router (Pages, API Routes, Layouts).

/components - Reusable UI components (Editor, UI Elements).

/lib - Supabase Client configuration (Singleton pattern).

/contexts - AuthContext for global user state management.

/public - Static assets (Logos, Placeholders).

🛡️ Security
This project implements Row Level Security (RLS) on both the database and storage to ensure:

The public can only read published blogs (is_published = true).

Only authenticated users can upload images and create new posts.

Authors can only edit or delete blogs that they own.

📄 License
This project is licensed under the MIT License.

<div align="center">
Developed with ❤️ by Polapedia Team
</div>


-----

### Key Documentation Highlights:

  * **Architecture Flow**: Clearly explains how Next.js interacts with Supabase via SSR and Client-side SDKs.
  * **Security Focus**: Highlights the Row Level Security (RLS) setup, which is a major technical achievement of your project.
  * **Type Safety**: Mentions TypeScript readiness, which is crucial for modern enterprise deployments.

**Would you like me to add a "Troubleshooting" section specifically for the Storage RLS or Middleware setup we solved e
