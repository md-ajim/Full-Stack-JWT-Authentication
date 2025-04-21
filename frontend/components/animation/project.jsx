// "use client"

// import * as React from "react"
// import Image from "next/image"
// import { motion } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// const features = [
//   {
//     title: "Premium Comfort",
//     desc: "Luxurious memory foam ear cushions wrapped in soft protein leather...",
//     img: "/images/comfort.jpg",
//     tag: "Feature 1 of 5",
//     version: null,
//   },
//   {
//     title: "Seamless Connection",
//     desc: "Bluetooth 5.3 with multipoint connection allows you to pair...",
//     img: "/images/burger.jpg",
//     tag: "Feature 2 of 5",
//     version: "5.3",
//   },
//   {
//     title: "Active Noise Cancellation",
//     desc: "Advanced microphones and proprietary algorithm block external noise...",
//     img: "/images/noise.jpg",
//     tag: "Feature 3 of 5",
//     version: null,
//   },

//   {
//     title: "Active Noise  s Cancellation",
//     desc: "Advanced microphones s and proprietary algorithm block external noise...",
//     img: "/images/noise.jpg",
//     tag: "Feature 5 of 6",
//     version: null,
//   },

  

  
// ]

// export default function FeatureCarousel() {
//   const [active, setActive] = React.useState(0)
//   const timerRef = React.useRef<NodeJS.Timeout | null>(null)

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setActive((prev) => (prev + 1) % features.length)
//     }, 4000)
//   }

//   const resetTimer = () => {
//     if (timerRef.current) clearInterval(timerRef.current)
//     startTimer()
//   }

//   React.useEffect(() => {
//     startTimer()
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current)
//     }
//   }, [])

//   const goPrev = () => {
//     setActive((prev) => (prev - 1 + features.length) % features.length)
//     resetTimer()
//   }

//   const goNext = () => {
//     setActive((prev) => (prev + 1) % features.length)
//     resetTimer()
//   }

//   return (
//     <div className="flex flex-col items-center justify-center w-full px-4 py-10 bg-black text-white space-y-10">
//       {/* Header */}
//       <div className="text-center space-y-3">
//         <div className="inline-block px-3 py-1 text-sm rounded-full bg-white text-black">
//           Premium Sound Experience
//         </div>
//         <h2 className="text-3xl md:text-4xl font-bold">Discover exceptional features</h2>
//         <p className="text-muted-foreground max-w-xl mx-auto">
//           Our flagship headphones combine cutting-edge technology with premium materials for an unparalleled listening experience.
//         </p>
//       </div>

//       {/* Carousel */}
//       <div className="relative w-full max-w-5xl overflow-hidden">
//         <div className="flex justify-center items-center gap-6 transition-all duration-500">
//           {features.map((feature, i) => (
//             <motion.div
//               key={i}
//               animate={i === active ? { scale: 1.05, opacity: 1 } : { scale: 0.9, opacity: 0.4 }}
//               transition={{ type: "spring", stiffness: 200, damping: 20 }}
//               className={cn("w-full md:w-1/3 px-2", i === active ? "z-20" : "z-10")}
//               onClick={() => {
//                 setActive(i)
//                 resetTimer()
//               }}
//               role="button"
//               tabIndex={0}
//             >
//               <Card className="overflow-hidden bg-white/10 backdrop-blur rounded-xl border-none">
//                 <div className="relative w-full h-60">
//                   <Image
//                     src={feature.img}
//                     alt={feature.title}
//                     fill
//                     className="object-cover rounded-t-xl"
//                   />
//                 </div>
//                 <CardContent className="p-4">
//                   <div className="text-sm text-pink-500 font-medium mb-1">{feature.tag}</div>
//                   <h3 className="text-xl font-bold">{feature.title}</h3>
//                   <p className="text-sm text-white/80">{feature.desc}</p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <button
//           onClick={goPrev}
//           aria-label="Previous feature"
//           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
//         >
//           <ChevronLeft />
//         </button>
//         <button
//           onClick={goNext}
//           aria-label="Next feature"
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       {/* Pagination */}
//       <div className="flex gap-2">
//         {features.map((_, i) => (
//           <motion.div
//             key={i}
//             className={cn("h-2 w-2 rounded-full", i === active ? "bg-white w-4" : "bg-white/30")}
//             transition={{ duration: 0.3 }}
//           />
//         ))}
//       </div>

//       {/* Detail Box */}
//       <motion.div
//         key={active}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white/5 backdrop-blur p-6 rounded-xl max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-6"
//       >
//         <div>
//           <h4 className="text-lg font-semibold">{features[active].title}</h4>
//           <p className="text-sm text-white/80">{features[active].desc}</p>
//           <ul className="list-disc list-inside text-sm mt-3 space-y-1">
//             <li>Adaptive technology adjusts to your environment</li>
//             <li>Customizable via the companion app</li>
//             <li>Premium materials ensure durability and comfort</li>
//           </ul>
//         </div>

//         {features[active].version && (
//           <motion.div
//             key={features[active].version}
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 150 }}
//             className="bg-pink-600 text-white text-center px-6 py-4 rounded-xl font-bold text-2xl"
//           >
//             {features[active].version}
//             <div className="text-sm font-medium">Bluetooth Version</div>
//           </motion.div>
//         )}
//       </motion.div>

//       <div className="flex gap-3">
//         <Button variant="outline">Learn more</Button>
//         <Button>See all features</Button>
//       </div>
//     </div>
//   )
// }

// "use client"

// import * as React from "react"
// import Image from "next/image"
// import { motion, AnimatePresence } from "framer-motion"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// const features = [
//   {
//     title: "Premium Comfort",
//     desc: "Luxurious memory foam ear cushions wrapped in soft protein leather create a perfect seal while distributing pressure evenly.",
//     img: "/images/comfort.jpg",
//     tag: "Feature 1 of 5",
//     version: null,
//   },
//   {
//     title: "Seamless Connection",
//     desc: "Bluetooth 5.3 with multipoint connection allows you to pair with multiple devices and switch between them effortlessly.",
//     img: "/images/burger.webp",
//     tag: "Feature 2 of 5",
//     version: "5.3",
//   },
//   {
//     title: "Active Noise Cancellation",
//     desc: "Advanced microphones and proprietary algorithms detect and cancel unwanted noise, allowing you to focus on what matters.",
//     img: "/images/noise.jpg",
//     tag: "Feature 3 of 5",
//     version: null,
//   },
//   {
//     title: "Extended Battery Life",
//     desc: "Up to 40 hours of playtime with quick charge capability ensures you stay powered throughout your day.",
//     img: "/images/battery.jpg",
//     tag: "Feature 4 of 5",
//     version: null,
//   },
//   {
//     title: "Premium Sound Quality",
//     desc: "Custom 40mm drivers deliver rich, balanced audio across all frequencies, immersing you in pure sound.",
//     img: "/images/sound.jpg",
//     tag: "Feature 5 of 5",
//     version: null,
//   },
// ]

// export default function FeatureCarousel() {
//   const [active, setActive] = React.useState(0)
//   const [direction, setDirection] = React.useState<"left" | "right">("right")
//   const timerRef = React.useRef<NodeJS.Timeout | null>(null)

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setDirection("right")
//       setActive((prev) => (prev + 1) % features.length)
//     }, 4000)
//   }

//   const resetTimer = () => {
//     if (timerRef.current) clearInterval(timerRef.current)
//     startTimer()
//   }

//   React.useEffect(() => {
//     startTimer()
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current)
//     }
//   }, [])

//   const goPrev = () => {
//     setDirection("left")
//     setActive((prev) => (prev - 1 + features.length) % features.length)
//     resetTimer()
//   }

//   const goNext = () => {
//     setDirection("right")
//     setActive((prev) => (prev + 1) % features.length)
//     resetTimer()
//   }

//   const getVisibleItems = () => {
//     return [
//       (active - 1 + features.length) % features.length,
//       active,
//       (active + 1) % features.length,
//     ]
//   }

//   const slideVariants = {
//     enterLeft: { x: "-100%", opacity: 0.5, scale: 0.9, zIndex: 10 },
//     enterRight: { x: "100%", opacity: 0.5, scale: 0.9, zIndex: 10 },
//     center: { x: "0%", opacity: 1, scale: 1.1, zIndex: 20 },
//     exitLeft: { x: "-100%", opacity: 0, scale: 0.8, zIndex: 0 },
//     exitRight: { x: "100%", opacity: 0, scale: 0.8, zIndex: 0 }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center w-full px-4 py-14 bg-black text-white space-y-12">
//       {/* Header */}
//       <div className="text-center space-y-4">
//         <div className="inline-block px-4 py-1 text-sm rounded-full bg-white text-black font-semibold">
//           Premium Sound Experience
//         </div>
//         <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Discover exceptional features</h2>
//         <p className="text-white/70 text-base max-w-2xl mx-auto">
//           Our flagship headphones combine cutting-edge technology with premium materials for an unparalleled listening experience.
//         </p>
//       </div>

//       {/* Carousel */}
//       <div className="relative w-full max-w-6xl h-[420px]">
//         <div className="relative h-full w-full flex items-center justify-center">
//           <AnimatePresence custom={direction} initial={false}>
//             {getVisibleItems().map((itemIndex, position) => {
//               const feature = features[itemIndex]
//               const isCenter = position === 1
//               const isLeft = position === 0
//               const isRight = position === 2

//               return (
//                 <motion.div
//                   key={itemIndex}
//                   className={cn(
//                     "absolute w-full md:w-1/3 px-4 group",
//                     isCenter ? "z-20" : "z-10"
//                   )}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial={isLeft ? "enterLeft" : isRight ? "enterRight" : "center"}
//                   animate="center"
//                   exit={direction === "left" ? "exitRight" : "exitLeft"}
//                   transition={{
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 30,
//                     mass: 0.8
//                   }}
//                   onClick={() => {
//                     if (isLeft) goPrev()
//                     if (isRight) goNext()
//                   }}
//                 >
//                   <motion.div whileHover={{ scale: isCenter ? 1.05 : 0.95 }} className="cursor-pointer">
//                     <Card className={cn(
//                       "overflow-hidden backdrop-blur-lg rounded-2xl border-none transition-all duration-300",
//                       isCenter
//                         ? "ring-2 ring-pink-500 shadow-2xl scale-105 bg-white/10"
//                         : "opacity-50 blur-sm scale-95 bg-white/5"
//                     )}>
//                       <div className="relative w-full h-60">
//                         <Image
//                           src={feature.img}
//                           alt={feature.title}
//                           fill
//                           className={cn(
//                             "object-cover rounded-t-2xl transition-transform duration-500",
//                             isCenter && "group-hover:scale-105"
//                           )}
//                           priority={isCenter}
//                         />
//                       </div>
//                       <CardContent className="p-4">
//                         <div className="text-sm text-pink-500 font-medium mb-1">{feature.tag}</div>
//                         <h3 className="text-xl font-bold">{feature.title}</h3>
//                         <p className="text-sm text-white/80">{feature.desc}</p>
//                       </CardContent>
//                     </Card>
//                   </motion.div>
//                 </motion.div>
//               )
//             })}
//           </AnimatePresence>
//         </div>

//         {/* Arrows */}
//         <button
//           onClick={goPrev}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full z-30"
//         >
//           <ChevronLeft />
//         </button>
//         <button
//           onClick={goNext}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full z-30"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       {/* Pagination Dots */}
//       <div className="flex gap-2">
//         {features.map((_, i) => (
//           <motion.div
//             key={i}
//             layout
//             className={cn("h-2 rounded-full", i === active ? "bg-white w-6" : "bg-white/30 w-2")}
//             transition={{ duration: 0.3 }}
//           />
//         ))}
//       </div>

//       {/* Feature Detail Section */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={active}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg"
//         >
//           <div>
//             <h4 className="text-lg font-semibold">{features[active].title}</h4>
//             <p className="text-sm text-white/80">{features[active].desc}</p>
//             <ul className="list-disc list-inside text-sm mt-3 space-y-1">
//               <li>Adaptive technology adjusts to your environment</li>
//               <li>Customizable via the companion app</li>
//               <li>Premium materials ensure durability and comfort</li>
//             </ul>
//           </div>

//           {features[active].version && (
//             <motion.div
//               key={features[active].version}
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 150 }}
//               className="bg-pink-600 text-white text-center px-8 py-6 rounded-2xl font-bold text-3xl shadow-md"
//             >
//               {features[active].version}
//               <div className="text-sm font-medium mt-1">Bluetooth Version</div>
//             </motion.div>
//           )}
//         </motion.div>
//       </AnimatePresence>

//       {/* CTA Buttons */}
//       <div className="flex gap-4 pt-4">
//         <Button variant="outline" className="rounded-full border-white/30 text-white/80 hover:border-white hover:text-white">
//           Learn more
//         </Button>
//         <Button className="rounded-full bg-pink-600 hover:bg-pink-700 text-white">
//           See all features
//         </Button>
//       </div>
//     </div>
//   )
// }


"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

const features = [
  {
    title: "Premium Comfort",
    desc: "Luxurious memory foam ear cushions wrapped in soft protein leather create a perfect seal while distributing pressure evenly.",
    img: "/images/comfort.jpg",
    tag: "Feature 1 of 5",
    version: null,
  },
  {
    title: "Seamless Connection",
    desc: "Bluetooth 5.3 with multipoint connection allows you to pair with multiple devices and switch between them effortlessly.",
    img: "/images/connection.webp",
    tag: "Feature 2 of 5",
    version: "5.3",
  },
  {
    title: "Active Noise Cancellation",
    desc: "Advanced microphones and proprietary algorithms detect and cancel unwanted noise, allowing you to focus on what matters.",
    img: "/images/noise-cancellation.jpg",
    tag: "Feature 3 of 5",
    version: null,
  },
  {
    title: "Extended Battery Life",
    desc: "Up to 40 hours of playtime with quick charge capability ensures you stay powered throughout your day.",
    img: "/images/battery.jpg",
    tag: "Feature 4 of 5",
    version: null,
  },
  {
    title: "Premium Sound Quality",
    desc: "Custom 40mm drivers deliver rich, balanced audio across all frequencies, immersing you in pure sound.",
    img: "/images/sound-quality.jpg",
    tag: "Feature 5 of 5",
    version: null,
  },
]

const FloatingParticles = () => {
  const [particles, setParticles] = React.useState<Array<{
    top: string
    left: string
    width: string
    height: string
  }>>([])

  React.useEffect(() => {
    setParticles(
      Array.from({ length: 5 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 40 + 10}px`,
        height: `${Math.random() * 40 + 10}px`,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((style, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-pink-500/20"
          animate={{
            y: [0, (Math.random() - 0.5) * 40],
            x: [0, (Math.random() - 0.5) * 40],
            opacity: [0.2, 0.5, 0.2],
            transition: {
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          style={style}
        />
      ))}
    </div>
  )
}



const FloatingBackground = () => {
  const [elements, setElements] = React.useState<Array<{
    top: string
    left: string
    width: string
    height: string
  }>>([])

  React.useEffect(() => {
    // Generate random positions only on client side
    setElements(
      Array.from({ length: 10 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 300 + 100}px`,
        height: `${Math.random() * 300 + 100}px`,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {elements.map((style, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            transition: {
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }
          }}
          style={style}
        />
      ))}
    </div>
  )
}

// Then in your main component, replace the floating background with:


export default function UltraModern3DCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(2)
  const [direction, setDirection] = React.useState<"left" | "right">("right")
  const [isAutoRotating, setIsAutoRotating] = React.useState(true)
  const [isHovering, setIsHovering] = React.useState(false)
  const timerRef = React.useRef<NodeJS.Timeout | null>(null)

  // Get the visible trio of features (prev, current, next)
  const visibleFeatures = React.useMemo(() => [
    features[(activeIndex - 1 + features.length) % features.length],
    features[activeIndex],
    features[(activeIndex + 1) % features.length]
  ], [activeIndex])

  // Start auto-rotation
  const startRotation = React.useCallback(() => {
    stopRotation()
    if (!isHovering && isAutoRotating) {
      timerRef.current = setInterval(() => {
        setDirection("right")
        setActiveIndex(prev => (prev + 1) % features.length)
      }, 3500)
    }
  }, [isHovering, isAutoRotating])

  // Stop auto-rotation
  const stopRotation = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  React.useEffect(() => {
    startRotation()
    return stopRotation
  }, [startRotation])

  const goPrev = () => {
    setDirection("left")
    setActiveIndex(prev => (prev - 1 + features.length) % features.length)
    setIsAutoRotating(false)
    startRotation()
  }

  const goNext = () => {
    setDirection("right")
    setActiveIndex(prev => (prev + 1) % features.length)
    setIsAutoRotating(false)
    startRotation()
  }

  

  // 3D animation variants
  const cardVariants = {
    left: {
      x: "-90%",
      scale: 0.85,
      rotateY: -30,
      zIndex: 10,
      opacity: 0.8,
      filter: "blur(2px) brightness(0.8)",
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    center: {
      x: "0%",
      scale: 1.1,
      rotateY: 0,
      zIndex: 20,
      opacity: 1,
      filter: "blur(0px) brightness(1)",
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    right: {
      x: "90%",
      scale: 0.85,
      rotateY: 30,
      zIndex: 10,
      opacity: 0.8,
      filter: "blur(2px) brightness(0.8)",
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exitLeft: {
      x: "-120%",
      opacity: 0,
      scale: 0.7,
      rotateY: -45,
      transition: { duration: 0.5 }
    },
    exitRight: {
      x: "120%",
      opacity: 0,
      scale: 0.7,
      rotateY: 45,
      transition: { duration: 0.5 }
    }
  }

  // Glow effect for center card
  const glowVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-4 overflow-hidden">

<FloatingBackground />

      {/* Header */}
      <motion.div 
        className="max-w-4xl mx-auto text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "backOut" }}
      >
        <motion.span 
          className="inline-block px-5 py-2 mb-6 text-sm font-medium rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg backdrop-blur"
          whileHover={{ scale: 1.05 }}
        >
          Immersive Audio Experience
        </motion.span>
        <motion.h2 
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 leading-tight"
        >
          Next Generation <br /> Sound Technology
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Discover the future of audio with our revolutionary 3D spatial sound
        </motion.p>
      </motion.div>

      {/* 3D Carousel Container */}
      <div 
        className="relative w-full max-w-7xl mx-auto h-[600px] mb-28 perspective-1200"
        onMouseEnter={() => {
          setIsHovering(true)
          setIsAutoRotating(false)
        }}
        onMouseLeave={() => {
          setIsHovering(false)
          setIsAutoRotating(true)
        }}
      >
        {/* Ambient glow behind carousel */}
        <motion.div 
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl opacity-0"
          animate={{
            opacity: [0, 0.3, 0],
            transition: {
              duration: 6,
              repeat: Infinity
            }
          }}
        />

        {/* 3D Carousel */}
        <div className="relative h-full w-full flex items-center justify-center">
          <AnimatePresence custom={direction} initial={false}>
            {visibleFeatures.map((feature, position) => {
              const isLeft = position === 0
              const isCenter = position === 1
              const isRight = position === 2

              return (
                <motion.div
                  key={`${feature.title}-${activeIndex}`}
                  className={`absolute w-full max-w-md ${isCenter ? 'z-30' : 'z-20'}`}
                  custom={direction}
                  variants={cardVariants}
                  initial={isLeft ? "left" : isRight ? "right" : "center"}
                  animate={isLeft ? "left" : isRight ? "right" : "center"}
                  exit={direction === "left" ? "exitRight" : "exitLeft"}
                  onClick={() => {
                    if (isLeft) goPrev()
                    if (isRight) goNext()
                  }}
                >
                  {/* Card Glow Effect */}
                  {isCenter && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/30 to-purple-500/30 pointer-events-none"
                      variants={glowVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  )}

                  <motion.div 
                    whileHover={{ 
                      scale: isCenter ? 1.05 : 0.95,
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    }}
                    className="cursor-pointer h-full px-4"
                  >
                    <Card className={cn(
                      "h-full overflow-hidden rounded-2xl border-none shadow-2xl relative",
                      isCenter 
                        ? "bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg"
                        : "bg-white/5 backdrop-blur-sm"
                    )}>
                      {/* 3D Depth Effect */}
                      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

                      {/* Image Container */}
                      <div className="relative h-72 w-full overflow-hidden">
                        <Image
                          src={feature.img}
                          alt={feature.title}
                          fill
                          className="object-cover rounded-t-2xl transform transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={isCenter}
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        {/* 3D reflection effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent opacity-50" />
                      </div>

                      {/* Card Content */}
                      <CardContent className="p-6 relative z-10">
                        <div className="text-pink-400 text-sm font-medium mb-2 flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-2 animate-pulse" />
                          {feature.tag}
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-gray-300 text-base">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={goPrev}
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full z-40 backdrop-blur shadow-xl"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={goNext}
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-4 rounded-full z-40 backdrop-blur shadow-xl"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Auto-rotate indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full transition-colors ${isAutoRotating ? 'bg-pink-500' : 'bg-white/30'}`} />
          <span className="text-sm text-white/70">
            {isAutoRotating ? "Auto-rotating" : "Click to rotate"}
          </span>
        </div>
      </div>

      {/* Feature Details - 3D Floating Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transition: { 
              type: "spring", 
              stiffness: 100,
              damping: 15
            }
          }}
          exit={{ 
            opacity: 0, 
            y: -40,
            transition: { duration: 0.3 }
          }}
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)",
            transition: { type: "spring", stiffness: 300 }
          }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 mb-16 relative overflow-hidden"
        >
          {/* Floating particles */}
          {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-pink-500/20"
                initial={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 40 + 10}px`,
                  height: `${Math.random() * 40 + 10}px`,
                }}
                animate={{
                  y: [0, (Math.random() - 0.5) * 40],
                  x: [0, (Math.random() - 0.5) * 40],
                  opacity: [0.2, 0.5, 0.2],
                  transition: {
                    duration: Math.random() * 10 + 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            ))}
          </div> */}       <FloatingParticles/>

          <div className="flex flex-col lg:flex-row gap-8 relative z-10">
            <div className="flex-1">
              <motion.h3 
                className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {features[activeIndex].title}
              </motion.h3>
              <motion.p 
                className="text-lg text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {features[activeIndex].desc}
              </motion.p>
              <motion.ul 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 mr-3 flex-shrink-0" />
                  <span>Adaptive technology adjusts to your environment</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 mr-3 flex-shrink-0" />
                  <span>Customizable via the companion app</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-pink-500 mt-2 mr-3 flex-shrink-0" />
                  <span>Premium materials ensure durability and comfort</span>
                </motion.li>
              </motion.ul>
            </div>

            {features[activeIndex].version && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl p-8 flex flex-col items-center justify-center min-w-[180px] h-fit self-center shadow-lg"
              >
                <span className="text-6xl font-bold mb-1">{features[activeIndex].version}</span>
                <span className="text-sm font-medium tracking-wider">BLUETOOTH</span>
                <span className="text-xs opacity-80 mt-1">MULTIPOINT CONNECTION</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive Pagination */}
      <motion.div 
        className="flex justify-center gap-3 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {features.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setActiveIndex(index)
              setIsAutoRotating(false)
              startRotation()
            }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={`relative rounded-full transition-all ${index === activeIndex ? 'w-8' : 'w-3'} h-3`}
          >
            <div className={`absolute inset-0 rounded-full ${index === activeIndex ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/30'}`} />
            {index === activeIndex && (
              <motion.div 
                className="absolute inset-0 rounded-full bg-white/20"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                  transition: {
                    duration: 2,
                    repeat: Infinity
                  }
                }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            className="rounded-full border-white/20 hover:border-white hover:text-white px-8 py-6 text-lg font-medium group relative overflow-hidden"
          >
            <span className="relative z-10">Explore Technology</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            className="rounded-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-10 py-6 text-lg font-medium shadow-xl relative overflow-hidden group"
          >
            <span className="relative z-10">Shop Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}