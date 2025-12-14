import { Utensils, Star } from "lucide-react";
import { SiInstagram, SiFacebook, SiYoutube } from "react-icons/si";
import { useLocation } from "wouter";
import { useWelcomeAudio } from "../hooks/useWelcomeAudio";
import { MediaPreloader } from "../components/media-preloader";
import { useState, useEffect, useCallback } from "react";
import logoImage from "@assets/Untitled_design_(20)_1765720426678.png";
import bgPattern from "@assets/dark_bg_pattern.png";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { hasPlayedAudio, audioError, isReady } = useWelcomeAudio();
  const [mediaReady, setMediaReady] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 });
  const [scaleFactor, setScaleFactor] = useState(1);

  // Detect screen size and calculate scale factor
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenDimensions({ width, height });

      // Calculate scale factor based on screen size for better screen utilization
      // Base dimensions: 384px width, optimized for mobile screens

      // Scale up for better screen utilization while maintaining proportions
      if (height < 600) {
        setScaleFactor(0.85);
      } else if (height < 700) {
        setScaleFactor(1.0);
      } else if (height < 800) {
        setScaleFactor(1.1);
      } else if (height < 900) {
        setScaleFactor(1.2);
      } else {
        setScaleFactor(1.3);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Social media click handlers
  const handleSocialClick = useCallback((url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }, []);

  // Calculate responsive container height - use more screen space
  const containerHeight = Math.min(screenDimensions.height * 0.98, screenDimensions.height - 20);

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative" 
      style={{ 
        backgroundImage: `url(${bgPattern})`, 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Media preloader */}
      <MediaPreloader onComplete={() => setMediaReady(true)} />

      {/* Responsive background container - full width on mobile, centered on desktop */}
      <div
        className="relative w-full h-full md:mx-auto"
        style={{
          backgroundColor: 'transparent',
          ...(screenDimensions.width > 768 ? {
            maxWidth: `${Math.min(420 * scaleFactor, screenDimensions.width * 0.95)}px`,
            height: `${containerHeight}px`,
            aspectRatio: '9/16',
            margin: '0 auto',
          } : {
            width: '100%',
            height: '100%',
          })
        }}
      >
        {/* Content directly on background - dynamically scaled to fit viewport */}
        <div
          className="flex flex-col items-center justify-between h-full"
          style={{
            padding: `${12 * scaleFactor}px ${16 * scaleFactor}px`,
          }}
        >

          {/* Logo Image - at top */}
          <div className="flex flex-col items-center w-full">
            <img
              src={logoImage}
              alt="Barrelborn Dine & Draft"
              style={{
                width: `${220 * scaleFactor}px`,
                height: 'auto',
              }}
            />
          </div>

          {/* Social Media Icons - closer to logo */}
          <div className="flex" style={{ gap: `${12 * scaleFactor}px`, marginTop: `${-20 * scaleFactor}px` }}>
            <button
              onClick={() => handleSocialClick("https://www.instagram.com/mingschinesecuisine.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==")}
              className="border rounded-md flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: `${36 * scaleFactor}px`,
                height: `${36 * scaleFactor}px`,
                borderColor: '#dcd4c8',
                backgroundColor: 'transparent',
              }}
            >
              <SiInstagram style={{ width: `${18 * scaleFactor}px`, height: `${18 * scaleFactor}px`, color: '#dcd4c8' }} />
            </button>
            <button
              onClick={() => handleSocialClick("https://facebook.com")}
              className="border rounded-md flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: `${36 * scaleFactor}px`,
                height: `${36 * scaleFactor}px`,
                borderColor: '#dcd4c8',
                backgroundColor: 'transparent',
              }}
            >
              <SiFacebook style={{ width: `${18 * scaleFactor}px`, height: `${18 * scaleFactor}px`, color: '#dcd4c8' }} />
            </button>
            <button
              onClick={() => handleSocialClick("https://youtube.com")}
              className="border rounded-md flex items-center justify-center transition-opacity hover:opacity-80"
              style={{
                width: `${36 * scaleFactor}px`,
                height: `${36 * scaleFactor}px`,
                borderColor: '#dcd4c8',
                backgroundColor: 'transparent',
              }}
            >
              <SiYoutube style={{ width: `${18 * scaleFactor}px`, height: `${18 * scaleFactor}px`, color: '#dcd4c8' }} />
            </button>
          </div>

          {/* Explore Menu Button */}
          <button
            onClick={() => setLocation("/menu")}
            className="font-semibold border-2 rounded-full transition-colors flex items-center"
            style={{
              padding: `${12 * scaleFactor}px ${32 * scaleFactor}px`,
              gap: `${8 * scaleFactor}px`,
              fontSize: `${14 * scaleFactor}px`,
              borderColor: '#B8986A',
              color: '#dcd4c8',
              backgroundColor: 'transparent',
            }}
          >
            <Utensils style={{ width: `${20 * scaleFactor}px`, height: `${20 * scaleFactor}px`, color: '#dcd4c8' }} />
            <span>EXPLORE OUR MENU</span>
          </button>

          {/* Rating Section */}
          <div className="text-center">
            <p
              className="font-medium"
              style={{ fontSize: `${13 * scaleFactor}px`, marginBottom: `${4 * scaleFactor}px`, color: '#dcd4c8' }}
            >
              Click to Rate us on Google
            </p>
            <div
              className="flex justify-center cursor-pointer"
              style={{ gap: `${4 * scaleFactor}px` }}
              onClick={() => window.open("https://g.page/r/CePLzPaLyBLNEAI/review")}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  style={{ width: `${20 * scaleFactor}px`, height: `${20 * scaleFactor}px`, color: '#B8986A', fill: '#B8986A' }}
                />
              ))}
            </div>
          </div>

          {/* Address Section */}
          <div className="text-center">
            <div
              className="border-2 rounded-full inline-block"
              style={{
                padding: `${3 * scaleFactor}px ${14 * scaleFactor}px`,
                marginBottom: `${6 * scaleFactor}px`,
                borderColor: '#B8986A',
              }}
            >
              <span
                className="font-semibold"
                style={{ fontSize: `${11 * scaleFactor}px`, color: '#dcd4c8' }}
              >
                ADDRESS
              </span>
            </div>
            <div
              className="leading-tight"
              style={{ fontSize: `${10 * scaleFactor}px`, color: '#E8DFD1', maxWidth: `${260 * scaleFactor}px` }}
            >
              <p>Shop No: 3, Madanlal Dhingra Rd,</p>
              <p>beside Satranj Wafers, Bhakti Mandir,</p>
              <p>Panch Pakhdi, Thane West</p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <div
              className="border-2 rounded-full inline-block"
              style={{
                padding: `${3 * scaleFactor}px ${14 * scaleFactor}px`,
                marginBottom: `${6 * scaleFactor}px`,
                borderColor: '#B8986A',
              }}
            >
              <span
                className="font-semibold"
                style={{ fontSize: `${11 * scaleFactor}px`, color: '#dcd4c8' }}
              >
                CONTACT
              </span>
            </div>
            <div
              style={{ fontSize: `${10 * scaleFactor}px`, color: '#E8DFD1' }}
            >
              <p>+91 1234567890</p>
              <p>info@barrelborn.in</p>
            </div>
          </div>

          {/* Website URL and Developer Credit - grouped at bottom */}
          <div className="text-center">
            <p
              className="cursor-pointer no-underline"
              style={{ textDecoration: 'none', color: '#B8986A', fontSize: `${10 * scaleFactor}px`, marginBottom: `${6 * scaleFactor}px` }}
              onClick={() => window.open("https://www.barrelborn.in", "_blank")}
            >
              www.barrelborn.in
            </p>
            <div style={{ fontSize: `${9 * scaleFactor}px`, color: '#E8DFD1' }}>
              <p>Developed By</p>
              <p
                className="font-medium cursor-pointer no-underline"
                onClick={() => window.open("http://www.airavatatechnologies.com", "_blank")}
                style={{ textDecoration: 'none', color: '#B8986A' }}
              >
                AIRAVATA TECHNOLOGIES
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
