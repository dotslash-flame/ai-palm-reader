# Palm Reader AI 🔮🖐️

![Tarot img](https://images.unsplash.com/photo-1600430073932-e915854d9d4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "Palm Reader AI")
[Image: Unsplash - Viva Luna Studios](https://unsplash.com/@vivalunastudios)

Palm Reader AI is an innovative (but mostly fun) web application that uses Google's Gemini AI to analyze palm images and provide mystical readings. Images are processed locally in your browser for privacy, with only the image data sent to Gemini for analysis.

Note: This deployment is customized by DotSlash (FLAME University) for the Club Fair, built on top of the original open-source project by Eric Hernández Villa.

## 🌟 Features

- Upload or capture palm images for AI analysis
- Hand detection validation using MediaPipe
- Privacy-focused: images stored locally in browser
- Receive personalized palm readings from Gemini AI
- Gallery of past readings with local storage
- Responsive and mystical UI design

## 🚀 Tech Stack

- **Frontend**: Next.js with React
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Hand Detection**: MediaPipe Tasks Vision
- **AI Analysis**: Google Gemini AI
- **Local Storage**: Browser localStorage

## 🧠 AI Models

- **Hand Detection**: MediaPipe Hand Landmarker
- **Palm Reading**: Google Gemini 1.5 Flash (Vision + Text)
- **Text-to-Speech**: espnet/kan-bayashi_ljspeech_vits

## 🏗️ Project Structure

- `components/`: React components (Hero, FileUpload, PalmReading, etc.)
- `pages/`: Next.js pages and API routes
- `lib/`: Utility functions and AI model interactions
- `public/`: Static assets

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   # Original upstream repository
   git clone https://github.com/ehernandezvilla/palm-reader-ai
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   Get your Gemini API key from: https://aistudio.google.com/app/apikey

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Privacy & Security

- **Local Storage**: Images are stored locally in your browser's memory during analysis
- **No File Uploads**: No images are uploaded to external servers
- **Secure Processing**: Only base64 image data is sent to Gemini for analysis
- **Data Control**: You control your data - delete readings anytime from your browser

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ehernandezvilla/palm-reader-ai/issues).

## 📜 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

Attribution:
- Original author: [Eric Hernández Villa](https://github.com/ehernandezvilla) — source repo: [ehernandezvilla/palm-reader-ai](https://github.com/ehernandezvilla/palm-reader-ai)
- This fork/customization: DotSlash (FLAME University) for Club Fair

## 🙏 Credits & Acknowledgements

- [Google Gemini](https://gemini.google.com/) for providing powerful multimodal AI capabilities
- [MediaPipe](https://mediapipe.dev/) for hand detection and computer vision
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [shadcn/ui](https://ui.shadcn.com/) for elegant UI components
- [Unsplash](https://unsplash.com/) for the beautiful mystical imagery
- All open-source libraries and tools used in this project

Special thanks to [Eric Hernández Villa](https://github.com/ehernandezvilla) for the original Palm Reader AI project (MIT), which served as the foundation for this DotSlash deployment.