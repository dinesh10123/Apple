import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utilis";
const Hero = () => {
  const [videoSrc, setvideoSrc] = useState(
    window.innerWidth < 750 ? smallHeroVideo : heroVideo
  );
  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 1,
      transition: 2,
    });
    gsap.to("#ctn", {
      Y: -50,
      delay: 2,
      opacity: 1,
    });
  }, []);

  const handleVideoSrc = () => {
    if (window.innerWidth < 760) {
      setvideoSrc(smallHeroVideo);
    } else {
      setvideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrc);
    return () => {
      window.removeEventListener("resize", handleVideoSrc);
    };
  }, []);
  return (
    <section className="w-full nav-height gb-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          IPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12 p-0">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div id="ctn" className="flex flex-col opacity-0 transition-y-20">
          <a href="#highlights" className="btn p-0">
            Buy:
          </a>
          <p className="font-normal text-xl">From $199/month or $999</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
