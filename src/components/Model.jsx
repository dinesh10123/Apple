import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, useState } from "react";
import { animateWithGsapTimeline } from "../utilis/animation";
import gsap from "gsap/all";
import ModelView from "./ModelView";
import { yellowImg } from "../utilis";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
const Model = () => {
  const [size, setSize] = useState("small");
  const [Model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  //camera controlfor modal view
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //model
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //rotation value
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const tl = gsap.timeline();

  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translate(-100%)",
        duration: 2,
      });
    }
    if (size === "small") {
      animateWithGsapTimeline(tl, large, smallRotation, "#view2", "#view1", {
        transform: "translate(0)",
        duration: 2,
      });
    }
  }, [size]);

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>
        <div className="flex flex-col items-centre mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controllRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={Model}
              size={size}
            />
            <ModelView
              index={1}
              groupRef={large}
              gsapType="view1"
              controllRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={Model}
              size={size}
            />

            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }}
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-center text-sm font-light mb-5">
              {models.title}
            </p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, i) => (
                  <li
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    key={i}
                    style={{ backgroundColor: item.color[0] }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
