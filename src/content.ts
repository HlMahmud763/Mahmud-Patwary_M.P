// All site content — images are the originals from the GitHub repository
// (served from raw.githubusercontent.com) plus the Unsplash imagery used on the
// current site, requested at 4K-friendly resolutions.

const REPO = "https://raw.githubusercontent.com/HlMahmud763/Mahmud-Patwary_M.P/main";

export const site = {
  brand: "Mahmud (MP)",
  name: "Mahmud Patwary",
  initials: "MP",
  roles: ["Programmer", "Web Developer", "Graphics Designer"],
  welcome: "Welcome To My Website",
  tagline:
    "Professional Web Development, Graphics Design & Programming Solutions With Modern UI, Responsive Layouts, Smooth Animations And Premium User Experience.",
  intro:
    "I create modern websites, professional graphics designs and interactive digital experiences with clean UI and premium animations.",
  profile: `${REPO}/MP-Profile-Photo.jpg`,
  location: "Dhaka, Bangladesh",
  availability: "All over the world",
  phone: "+880 1792 644763",
  whatsapp: "https://wa.me/8801792644763",
  whatsappDisplay: "+880 1792 644763",
  github: "https://github.com/HlMahmud763",
  githubUser: "HlMahmud763",
  repo: "https://github.com/HlMahmud763/Mahmud-Patwary_M.P",
  email: "mahmudpatwary763@gmail.com",
  facebook: "https://www.facebook.com/hlmahmud.mp",
  instagram: "https://instagram.com/hlmahmud.mp",
  telegram: "https://t.me/HlMahmud763",
};

export const socialLinks = [
  { label: "Facebook", href: site.facebook, icon: "facebook" },
  { label: "Instagram", href: site.instagram, icon: "instagram" },
  { label: "WhatsApp", href: site.whatsapp, icon: "whatsapp" },
  { label: "Email", href: `mailto:${site.email}`, icon: "envelope" },
  { label: "Telegram", href: site.telegram, icon: "telegram" },
  { label: "GitHub", href: site.github, icon: "github" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Web Designs", href: "#webdesign" },
  { label: "Graphics", href: "#graphics" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certificates", href: "#certificates" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const heroSlides = [
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=85&w=2400&auto=format&fit=crop",
];

export const projects = [
  {
    id: "01",
    title: "Mahmud Patwary (MP)",
    category: "Portfolio Website",
    description:
      "Modern responsive portfolio website with premium UI, animations and interactive design.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=85&w=2000&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript", "Animations"],
  },
  {
    id: "02",
    title: "Creative Dashboard",
    category: "Admin Interface",
    description:
      "Professional admin dashboard interface with glassmorphism effects and smooth animations.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=85&w=2000&auto=format&fit=crop",
    tags: ["UI/UX", "Glassmorphism", "Dashboard"],
  },
  {
    id: "03",
    title: "Business Landing Page",
    category: "Marketing Site",
    description:
      "Modern business landing page with responsive layout and premium user experience.",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=85&w=2000&auto=format&fit=crop",
    tags: ["Responsive", "Landing", "Conversion"],
  },
];

export const webFeatures = [
  {
    title: "Modern UI",
    description: "Beautiful responsive web layouts crafted with refined typography and spacing.",
    icon: "layers",
  },
  {
    title: "Responsive",
    description: "Fully mobile friendly design systems that feel native on every screen.",
    icon: "devices",
  },
  {
    title: "Interactive",
    description: "Smooth animations and effects that guide the eye and reward attention.",
    icon: "sparkle",
  },
  {
    title: "Performance",
    description: "Fast optimized websites engineered for speed, SEO and conversion.",
    icon: "bolt",
  },
];

export const liveWebsites = [
  {
    id: "shahid",
    title: "Shahid Osman Hadi",
    description: "Professional personal portfolio website with premium design.",
    image: "https://osmanhadi.lovable.app/assets/osman6-LChoTCRD.jpg",
    href: "https://hlmahmud763.github.io/shahid-osman-hadi/",
    tags: ["Portfolio", "Personal", "UI"],
  },
  {
    id: "gallery",
    title: "Graphics Designs Gallery",
    description: "Creative gallery website for modern graphics designs showcase.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfv-qC-R7hQ3ztdsCyP0blPOuHBZmkeAsZ-Q&s",
    href: "https://hlmahmud763.github.io/Photo-Gallery_MP/",
    tags: ["Gallery", "Graphics"],
  },
  {
    id: "pcedge1",
    title: "PC EDGE (V1)",
    description: "Modern PC and gaming products website with clean UI.",
    image:
      "https://i.pinimg.com/736x/c5/af/70/c5af70861cfb25ff868f0a1f383bef11.jpg",
    href: "https://hlmahmud763.github.io/PC-EDGE_V1/",
    tags: ["E-commerce", "Gaming"],
  },
  {
    id: "pcedge2",
    title: "PC EDGE (V2)",
    description: "Advanced premium PC marketplace website design.",
    image:
      "https://i.pinimg.com/736x/b3/44/b6/b344b6935809903e8270890cc208d077.jpg",
    href: "https://hlmahmud763.github.io/PC-EDGE-ORG/",
    tags: ["Marketplace", "Premium"],
  },
];

export const graphics = [
  {
    title: "Allahu Akbar",
    arabic: "الله أكبر",
    description: 'Beautiful calligraphy design for the phrase "Allah is the Great".',
    image: `${REPO}/AllahuAkbar.jpg`,
  },
  {
    title: "Alhamdulillah",
    arabic: "الحمد لله",
    description: 'Beautiful calligraphy design for the phrase "All praise belongs to Allah".',
    image: `${REPO}/Alhamdulillah.jpg`,
  },
  {
    title: "SubhanAllah",
    arabic: "سبحان الله",
    description: 'Beautiful calligraphy design for the phrase "Glory be to Allah".',
    image: `${REPO}/SubhanAllah.jpg`,
  },
  {
    title: "Astagfirullah",
    arabic: "أستغفر الله",
    description: 'Beautiful calligraphy design for the phrase "I seek Allah\'s forgiveness".',
    image: `${REPO}/Astagfirullah.jpg`,
  },
  {
    title: "Sabr",
    arabic: "صبر",
    description: 'Beautiful calligraphy design for "Patience".',
    image: `${REPO}/Sabr.jpg`,
  },
  {
    title: "La ilaha illallah",
    arabic: "لا إله إلا الله",
    description: 'Beautiful calligraphy design for "There is no god but Allah".',
    image: `${REPO}/Lailaha.jpg`,
  },
  {
    title: "Eid Mubarak",
    arabic: "عيد مبارك",
    description: 'Beautiful festive design on "Eid Mubarak".',
    image:
      "https://previews.123rf.com/images/kchung/kchung1705/kchung170500170/78840540-arabic-calligraphy-design-for-eid-mubarak-with-crescent-symbol-and-golden-traditional-patterns.jpg",
  },
];

export const achievements = [
  {
    title: "Web Design Certificate",
    description: "Completed modern web development training.",
    stat: "HTML / CSS / JS",
  },
  {
    title: "Graphics Design Course",
    description: "Professional graphics and branding course.",
    stat: "Photoshop / Illustrator",
  },
  {
    title: "Programming Achievement",
    description: "Built multiple responsive websites and apps.",
    stat: "Python & Web",
  },
];

export const certificates = [
  {
    title: "Python",
    description: "Certificate of completion — Coding Fundamentals with Python.",
    image: `${REPO}/Python_Certificate.jpg`,
  },
  {
    title: "Website Designing",
    description: "Certificate of completion — Website Design with HTML / CSS / JavaScript.",
    image: `${REPO}/WebDesign_certificate.jpg`,
  },
  {
    title: "Graphics Design",
    description:
      "Certificate of completion — Graphics Design with Photoshop / Illustrator / PixelLab.",
    image: `${REPO}/GraphicDesign_certificate.jpg`,
  },
];

export const about = {
  greeting: "Assalamualaikum!",
  p1: "I'm Mahmud Patwary, a passionate programmer, web developer and graphics designer from Bangladesh.",
  p2: "I love building modern responsive websites, designing creative graphics and creating smooth user experiences with animations and premium UI designs.",
  image:
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=85&w=2000&auto=format&fit=crop",
};

export const stats = [
  { value: 3, suffix: "+", label: "Certified Skills" },
  { value: 7, suffix: "+", label: "Design Pieces" },
  { value: 100, suffix: "%", label: "Responsive" },
  { value: 24, suffix: "h", label: "Reply Time" },
];

export const process = [
  {
    step: "01",
    title: "Discover",
    text: "We start with your goals, audience and brand — the blueprint of every pixel.",
  },
  {
    step: "02",
    title: "Design",
    text: "Premium layouts, typography and motion are composed into a living design system.",
  },
  {
    step: "03",
    title: "Develop",
    text: "Clean, fast, responsive code brings the design to life on every device.",
  },
  {
    step: "04",
    title: "Deliver",
    text: "Launch, polish and support — a website that keeps earning for your business.",
  },
];
