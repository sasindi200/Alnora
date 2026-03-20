# Alnora — Golden Hall Gallery

A beautiful digital art gallery built with React, Vite, TypeScript, and Tailwind CSS.

## Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Add your image assets
Place these images in `src/assets/`:
- `hero-hallway.jpg`
- `art-1.jpg`
- `art-2.jpg`
- `art-3.jpg`
- `art-4.jpg`
- `art-5.jpg`
- `art-6.jpg`
- `art-7.jpg`
- `art-8.jpg`

> You can find these in your Lovable project's asset explorer or GitHub repo under `src/assets/`.

### 3. Run the dev server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── assets/          # Image files (add manually)
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── Footer.tsx
│   ├── GalleryNav.tsx
│   └── GoldFrame.tsx
├── data/
│   └── artworks.ts  # Artwork data
├── hooks/
│   ├── use-scroll-reveal.ts
│   └── use-toast.ts
├── lib/
│   └── utils.ts
├── pages/
│   ├── About.tsx
│   ├── ArtworkDetail.tsx
│   ├── Collection.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── App.tsx
├── index.css
└── main.tsx
```
