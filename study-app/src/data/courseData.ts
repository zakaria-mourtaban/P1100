// Course data extracted from P1100 PDFs
export interface Topic {
  id: string;
  title: string;
  content: string;
  formulas?: string[];
  pdfRef?: { file: string; page: number };
}

export interface Exercise {
  id: string;
  title: string;
  problem: string;
  solution?: string;
  pdfRef?: { file: string; page: number };
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  icon: string;
  description: string;
  topics: Topic[];
  exercises: Exercise[];
  pdfs: string[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  chapter: string;
}

export const chapters: Chapter[] = [
  {
    id: "chapter0",
    number: 0,
    title: "Mathematical Foundations",
    icon: "Sigma",
    description: "Essential mathematical tools for mechanics",
    pdfs: ["Chap 0 - Mathematical Notions.pdf"],
    topics: [
      {
        id: "ch0-t1",
        title: "Scalar and Vector Quantities",
        content: "Scalar quantities are defined by magnitude only (mass, length, time, power, energy). Vector quantities require both magnitude and direction, represented by arrows. Vectors have four characteristics: point of application, line of application, direction, and magnitude. Examples: Position, Velocity, Acceleration, Momentum, Force.",
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 4 }
      },
      {
        id: "ch0-t2",
        title: "Vector Addition",
        content: "Vectors are added using the head-to-tail method. Place the tail of the second vector at the head of the first. The resultant vector goes from the tail of the first to the head of the last.",
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 5 }
      },
      {
        id: "ch0-t3",
        title: "Scalar Product (Dot Product)",
        content: "The scalar product of two vectors gives a scalar value. A⃗·B⃗ = |A||B|cos(θ). In orthonormal coordinates: A⃗·B⃗ = AxBx + AyBy + AzBz. Geometrical meaning: projection of one vector onto another.",
        formulas: ["A⃗·B⃗ = |A||B|cos(θ)", "A⃗·B⃗ = AxBx + AyBy + AzBz"],
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 9 }
      },
      {
        id: "ch0-t4",
        title: "Vector Product (Cross Product)",
        content: "The cross product of two vectors produces a vector perpendicular to both. Use the right-hand rule to determine direction. |A⃗×B⃗| = |A||B|sin(θ). The result is perpendicular to the plane containing A and B.",
        formulas: ["|A⃗×B⃗| = |A||B|sin(θ)"],
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 11 }
      },
      {
        id: "ch0-t5",
        title: "Derivatives in Physics",
        content: "Derivative shows rate of change. If f'≥0, f is increasing. If f'<0, f is decreasing. f'(x) represents the slope of the tangent line at any point x. Essential for velocity (dr/dt) and acceleration (dv/dt).",
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 15 }
      },
      {
        id: "ch0-t6",
        title: "Integration",
        content: "Integration calculates the area under a curve. Used to find displacement from velocity, work from force, etc. Reverse operation of differentiation.",
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 17 }
      }
    ],
    exercises: []
  },
  {
    id: "chapter1",
    number: 1,
    title: "Kinematics",
    icon: "Route",
    description: "Study of motion without considering forces",
    pdfs: ["ch 1-Lecture 1.pdf", "ch 1-Lecture 2.pdf", "ch 1-Lecture 3.pdf", "ch 1-Lecture 4.pdf", "Chap 1 - Tutorial.pdf", "P1100 -Tutorial Chap 1 - Given.pdf"],
    topics: [
      {
        id: "ch1-t1",
        title: "Introduction to Mechanics",
        content: "Mechanics describes and explains motion based on experimental results. Kinematics studies motion without knowing the cause. Dynamics studies motion and understands the cause (forces). A body can be treated as a material point if its dimensions are very small compared to other lengths involved.",
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 3 }
      },
      {
        id: "ch1-t2",
        title: "Units and Dimensions",
        content: "Fundamental quantities: Length (L), Mass (M), Time (T). Force: F = MLT⁻². Pressure: P = ML⁻¹T⁻². Work/Energy: W = ML²T⁻². Power: P = ML²T⁻³.",
        formulas: ["F = MLT⁻²", "P = ML⁻¹T⁻²", "1N = 10⁵ dyn"],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 5 }
      },
      {
        id: "ch1-t3",
        title: "Position, Velocity, and Acceleration in Cartesian Coordinates",
        content: "Position vector: r⃗(t) = x(t)î + y(t)ĵ + z(t)k̂. Velocity: v⃗ = dr⃗/dt = ẋî + ẏĵ + żk̂ (tangent to trajectory). Acceleration: a⃗ = dv⃗/dt = ẍî + ÿĵ + z̈k̂.",
        formulas: ["r⃗ = xî + yĵ + zk̂", "v⃗ = dr⃗/dt", "a⃗ = dv⃗/dt = d²r⃗/dt²"],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 8 }
      },
      {
        id: "ch1-t4",
        title: "Rectilinear Motion",
        content: "Uniform motion: v = constant, x = vt + x₀. Uniformly accelerated: a = constant, v = at + v₀, x = ½at² + v₀t + x₀. For erratic motion: use vdv = ads.",
        formulas: ["x = v₀t + x₀", "v = at + v₀", "x = ½at² + v₀t + x₀", "vdv = ads"],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 11 }
      },
      {
        id: "ch1-t5",
        title: "Projectile Motion",
        content: "2D motion with constant gravity. Along x: aₓ=0, vₓ=v₀cosθ, x=v₀ₓt+x₀. Along y: aᵧ=-g, vᵧ=-gt+v₀sinθ, y=-½gt²+v₀sinθ·t+y₀. Maximum height: h = v₀²sin²θ/(2g). Range: R = v₀²sin(2θ)/g.",
        formulas: ["h = v₀²sin²θ/(2g)", "R = v₀²sin(2θ)/g", "y = -gx²/(2v₀²cos²θ) + tanθ·x + y₀"],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 13 }
      },
      {
        id: "ch1-t6",
        title: "Cylindrical Coordinates",
        content: "Coordinates: (ρ, θ, z). Position: r⃗ = ρêᵨ + zk̂. Velocity: v⃗ = ρ'êᵨ + ρθ'êθ + z'k̂. Acceleration: a⃗ = (ρ'' - ρθ'²)êᵨ + (ρθ'' + 2ρ'θ')êθ + z''k̂.",
        formulas: ["v⃗ = ρ'êᵨ + ρθ'êθ + z'k̂", "aᵨ = ρ'' - ρθ'²", "aθ = ρθ'' + 2ρ'θ'"],
        pdfRef: { file: "ch 1-Lecture 2.pdf", page: 4 }
      },
      {
        id: "ch1-t7",
        title: "Polar Coordinates (2D)",
        content: "Special case of cylindrical with z=0. Position: r⃗ = ρêᵨ. Radial velocity vᵨ = ρ'. Orthoradial velocity vθ = ρθ'. Radial acceleration aᵨ = ρ'' - ρθ'². Orthoradial acceleration aθ = ρθ'' + 2ρ'θ'.",
        formulas: ["v = √(ρ'² + (ρθ')²)", "tanα = ρθ'/ρ'"],
        pdfRef: { file: "ch 1-Lecture 2.pdf", page: 7 }
      },
      {
        id: "ch1-t8",
        title: "Tangential and Normal Acceleration",
        content: "a⃗ = aₜτ̂ + aₙn̂. Tangential: aₜ = dv/dt (changes speed). Normal: aₙ = v²/ρ (changes direction). Radius of curvature: ρ = [1+(dy/dx)²]^(3/2) / |d²y/dx²|.",
        formulas: ["aₜ = dv/dt", "aₙ = v²/ρ", "a = √(aₜ² + aₙ²)"],
        pdfRef: { file: "ch 1-Lecture 3.pdf", page: 2 }
      },
      {
        id: "ch1-t9",
        title: "Circular Motion",
        content: "r = constant. v⃗ = ω×r⃗ = ωrêₜ. aₜ = αr (tangential). aₙ = ω²r (centripetal). Period T = 2π/ω. For uniform circular motion: aₜ = 0, only centripetal acceleration.",
        formulas: ["v = ωr", "aₜ = αr", "aₙ = ω²r = v²/r", "T = 2π/ω"],
        pdfRef: { file: "ch 1-Lecture 3.pdf", page: 5 }
      },
      {
        id: "ch1-t10",
        title: "Change of Reference Frames",
        content: "Absolute velocity: v⃗ₐ = v⃗ᵈ + v⃗ᵣ (driving + relative). Absolute acceleration: a⃗ₐ = a⃗ᵈ + a⃗ᵣ + a⃗ᶜ (driving + relative + Coriolis). Coriolis acceleration: a⃗ᶜ = 2ω⃗×v⃗ᵣ.",
        formulas: ["v⃗ₐ = v⃗ᵈ + v⃗ᵣ", "a⃗ₐ = a⃗ᵈ + a⃗ᵣ + 2ω⃗×v⃗ᵣ"],
        pdfRef: { file: "ch 1-Lecture 4.pdf", page: 2 }
      }
    ],
    exercises: [
      {
        id: "ch1-ex1",
        title: "Dimensional Analysis",
        problem: "The acceleration of a particle is given by a = k·V^(n+1)/r^n where k is a constant and n is an integer. Find the dimension of k.",
        pdfRef: { file: "P1100 -Tutorial Chap 1 - Given.pdf", page: 1 }
      },
      {
        id: "ch1-ex5",
        title: "Velocity and Acceleration Vectors",
        problem: "The parametric equations for a particle: x=3t², y=4t+2, z=6t³-8. Determine at t=2s: a) velocity and acceleration vectors, b) direction cosines of the tangent.",
        pdfRef: { file: "P1100 -Tutorial Chap 1 - Given.pdf", page: 2 }
      },
      {
        id: "ch1-ex6",
        title: "Projectile from Building",
        problem: "A ball is thrown upward from a 45m building at 30° with initial speed 20 m/s. Find: a) time to hit ground, b) speed at impact, c) horizontal distance.",
        pdfRef: { file: "P1100 -Tutorial Chap 1 - Given.pdf", page: 2 }
      },
      {
        id: "ch1-ex7",
        title: "Motorcycle Jump",
        problem: "A motorbike rider at 35 m/s jumps off a 30° ramp. Find the height h of ramp B needed for safe landing.",
        pdfRef: { file: "P1100 -Tutorial Chap 1 - Given.pdf", page: 2 }
      }
    ]
  },
  {
    id: "chapter2",
    number: 2,
    title: "Dynamics",
    icon: "Rocket",
    description: "Force, acceleration, and Newton's laws",
    pdfs: ["P1100 - Chap 2 - Dynamics.pdf", "P1100 -Tutorial Chap 2 - Given.pdf", "P1100-TUTORIAL CHAP 2-given.pdf"],
    topics: [
      {
        id: "ch2-t1",
        title: "Newton's First Law (Inertia)",
        content: "An isolated object (no external forces) remains at rest or moves with uniform rectilinear motion. When ΣF⃗ₑₓₜ = 0, v⃗ = constant. This is called inertial motion.",
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 4 }
      },
      {
        id: "ch2-t2",
        title: "Newton's Second Law",
        content: "ΣF⃗ₑₓₜ = ma⃗. The fundamental law of dynamics. Force causes acceleration proportional to mass. Mass is a measure of resistance to acceleration.",
        formulas: ["ΣF⃗ₑₓₜ = ma⃗"],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 5 }
      },
      {
        id: "ch2-t3",
        title: "Newton's Third Law (Action-Reaction)",
        content: "For every action, there is an equal and opposite reaction. F⃗ₐᵦ = -F⃗ᵦₐ. Forces always come in pairs acting on different objects.",
        formulas: ["F⃗ₐᵦ = -F⃗ᵦₐ"],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 5 }
      },
      {
        id: "ch2-t4",
        title: "Types of Forces",
        content: "Contact forces: friction, normal force, tension, spring force. Forces at distance: gravitational (F = GMm/r²), electromagnetic, nuclear forces.",
        formulas: ["F = GMm/r²"],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 6 }
      },
      {
        id: "ch2-t5",
        title: "Friction Forces",
        content: "Static friction: fₛ ≤ μₛN prevents motion. Kinetic friction: fₖ = μₖN opposes motion (μₖ < μₛ). Object starts moving when applied force exceeds fₛₘₐₓ = μₛN.",
        formulas: ["fₛₘₐₓ = μₛN", "fₖ = μₖN"],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 8 }
      },
      {
        id: "ch2-t6",
        title: "Universal Gravitation",
        content: "Two masses attract with force F = GMm/r². G = 6.67×10⁻¹¹ Nm²/kg². For satellites: orbital velocity v = √(GM/r), period T = 2π√(r³/GM).",
        formulas: ["F = GMm/r²", "v = √(GM/r)", "T = 2π√(r³/GM)"],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 17 }
      },
      {
        id: "ch2-t7",
        title: "Orbital Mechanics",
        content: "Trajectories are conics. Eccentricity e determines shape: e=0 circle, 0<e<1 ellipse, e=1 parabola, e>1 hyperbola. Escape velocity: vₑ = √(2GM/R). Conservation of energy and angular momentum.",
        formulas: ["vₑ = √(2GM/R)", "E = -GMm/(2a)", "rₘ/rₘ = (1+e)/(1-e)"],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 20 }
      },
      {
        id: "ch2-t8",
        title: "Fictitious Forces",
        content: "In non-inertial frames, add fictitious forces. Inertial force: -ma⃗ᵈ. Coriolis force: -2mω⃗×v⃗ᵣ. Centrifugal force: -mω⃗×(ω⃗×r⃗).",
        formulas: ["f⃗ᵣ = ΣF⃗ᵣₑₐₗ - ma⃗ᵈ - 2mω⃗×v⃗ᵣ"],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 26 }
      }
    ],
    exercises: [
      {
        id: "ch2-ex1",
        title: "Elevator Problem",
        problem: "An elevator (500kg) with weight (150kg) reaches 10 m/s after ascending 40m. Calculate the force at point B.",
        pdfRef: { file: "P1100 -Tutorial Chap 2 - Given.pdf", page: 1 }
      },
      {
        id: "ch2-ex4",
        title: "Parachutist with Air Resistance",
        problem: "Calculate the speed of a parachutist falling with air resistance f = kv². Deduce the terminal velocity.",
        pdfRef: { file: "P1100 -Tutorial Chap 2 - Given.pdf", page: 2 }
      },
      {
        id: "ch2-ex6",
        title: "Two Forces Problem",
        problem: "Two forces F₁=800N and F₂=1500N are applied to M=100kg body. Find distance to reach v=6m/s. Friction coefficient μₖ=0.2.",
        pdfRef: { file: "P1100 -Tutorial Chap 2 - Given.pdf", page: 3 }
      },
      {
        id: "ch2-ex13",
        title: "Circular Motion with Hanging Mass",
        problem: "Mass m₁ moves in circle of radius R with angular speed ω on frictionless table, connected to m₂ through a hole. Find ω for m₂ to remain stationary.",
        pdfRef: { file: "P1100 -Tutorial Chap 2 - Given.pdf", page: 4 }
      }
    ]
  },
  {
    id: "chapter3",
    number: 3,
    title: "Work and Energy",
    icon: "Zap",
    description: "Energy conservation and work-energy theorem",
    pdfs: ["P1100 - Tutorial Chap 3 - Given- 2024-2025.pdf", "P 1100 - Applications - chap 3.pdf"],
    topics: [
      {
        id: "ch3-t1",
        title: "Work of a Force",
        content: "Work W = ∫F⃗·dr⃗. For constant force: W = F⃗·d⃗ = Fd·cosθ. Work by gravity: W = -mgΔh. Work by spring: W = -½k(x₂² - x₁²).",
        formulas: ["W = ∫F⃗·dr⃗", "W = Fd·cosθ", "Wgravity = -mgΔh"],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 4 }
      },
      {
        id: "ch3-t2",
        title: "Power",
        content: "Power is rate of doing work. P = dW/dt = F⃗·v⃗. Unit: Watt (W) = J/s.",
        formulas: ["P = dW/dt = F⃗·v⃗"],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 2 }
      },
      {
        id: "ch3-t3",
        title: "Kinetic Energy",
        content: "Energy of motion: KE = ½mv². Work-Energy Theorem: ΣW = ΔKE = ½mv² - ½mv₀².",
        formulas: ["KE = ½mv²", "ΣW = ΔKE"],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 3 }
      },
      {
        id: "ch3-t4",
        title: "Potential Energy",
        content: "Gravitational PE: U = mgh. Spring PE: U = ½kx². For central force F = -C/r²: U = -C/r.",
        formulas: ["U = mgh", "U = ½kx²", "U = -GMm/r"],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 5 }
      },
      {
        id: "ch3-t5",
        title: "Conservation of Mechanical Energy",
        content: "For conservative forces: E = KE + PE = constant. Energy is conserved when no non-conservative forces do work.",
        formulas: ["E = KE + PE = constant", "½mv₁² + U₁ = ½mv₂² + U₂"],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 10 }
      },
      {
        id: "ch3-t6",
        title: "Conservative Forces",
        content: "A force is conservative if work is path-independent, or if ∮F⃗·dr⃗ = 0. Derives from potential: F⃗ = -∇U. Gravity and spring forces are conservative; friction is not.",
        formulas: ["F⃗ = -∇U", "∮F⃗·dr⃗ = 0"],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 9 }
      }
    ],
    exercises: [
      {
        id: "ch3-ex1",
        title: "Elevator Work",
        problem: "A 70kg man descends in elevator with a=4m/s². Elevator starts from rest, travels 6m. Calculate work by weight and normal reaction.",
        pdfRef: { file: "P1100 - Tutorial Chap 3 - Given- 2024-2025.pdf", page: 1 }
      },
      {
        id: "ch3-ex2",
        title: "Braking Distance",
        problem: "A truck at 40 km/h stops after 3m. Over what distance will it stop if speed is 80 km/h?",
        pdfRef: { file: "P1100 - Tutorial Chap 3 - Given- 2024-2025.pdf", page: 1 }
      },
      {
        id: "ch3-ex4",
        title: "Spring Compression",
        problem: "Object m=1kg slides on 30° incline (d=1m) to spring (K=50N/m). Find velocity before spring and max compression using energy conservation.",
        pdfRef: { file: "P1100 - Tutorial Chap 3 - Given- 2024-2025.pdf", page: 1 }
      },
      {
        id: "ch3-ex7",
        title: "Boy on Ice Mound",
        problem: "Boy slides down frictionless hemispherical ice mound (R=13.8m). At what height does he lose contact?",
        pdfRef: { file: "P1100 - Tutorial Chap 3 - Given- 2024-2025.pdf", page: 2 }
      }
    ]
  },
  {
    id: "chapter4",
    number: 4,
    title: "Linear Momentum",
    icon: "ArrowRightLeft",
    description: "Momentum, impulse, and collisions",
    pdfs: ["P1100 - Tutorial Chap 4 - Given- 2025-2026.pdf", "P1100 - Tutorial Chap 4 - Given.pdf", "P 1100 - Applications - chap 4.pdf"],
    topics: [
      {
        id: "ch4-t1",
        title: "Linear Momentum",
        content: "Momentum: p⃗ = mv⃗. Newton's 2nd law: ΣF⃗ = dp⃗/dt. For constant mass: ΣF⃗ = ma⃗.",
        formulas: ["p⃗ = mv⃗", "ΣF⃗ = dp⃗/dt"],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 1 }
      },
      {
        id: "ch4-t2",
        title: "Impulse",
        content: "Impulse: J⃗ = ∫F⃗dt = Δp⃗. For constant force: J⃗ = F⃗Δt. Impulse equals change in momentum.",
        formulas: ["J⃗ = ∫F⃗dt = Δp⃗", "J⃗ = F⃗Δt"],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 4 }
      },
      {
        id: "ch4-t3",
        title: "Conservation of Momentum",
        content: "For isolated system (no external forces): Σp⃗ = constant. Total momentum before = total momentum after collision.",
        formulas: ["Σp⃗ᵢ = Σp⃗f"],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 6 }
      },
      {
        id: "ch4-t4",
        title: "Center of Mass",
        content: "Position: R⃗cm = Σmᵢr⃗ᵢ/Σmᵢ. Velocity: V⃗cm = Σmᵢv⃗ᵢ/Σmᵢ. Total momentum: P⃗ = MV⃗cm.",
        formulas: ["R⃗cm = Σmᵢr⃗ᵢ/M", "V⃗cm = Σmᵢv⃗ᵢ/M"],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 2 }
      },
      {
        id: "ch4-t5",
        title: "Elastic Collisions",
        content: "Both momentum and kinetic energy conserved. Coefficient of restitution e = 1. Relative velocity reverses: v₂'-v₁' = -(v₂-v₁).",
        formulas: ["e = |v₂'-v₁'|/|v₂-v₁| = 1"],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 7 }
      },
      {
        id: "ch4-t6",
        title: "Inelastic Collisions",
        content: "Momentum conserved, kinetic energy NOT conserved. Perfectly inelastic: objects stick together (e = 0). Energy lost to deformation, heat.",
        formulas: ["e = |v₂'-v₁'|/|v₂-v₁|", "0 ≤ e ≤ 1"],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 7 }
      },
      {
        id: "ch4-t7",
        title: "Angular Momentum",
        content: "L⃗ = r⃗ × p⃗ = r⃗ × mv⃗. Torque: τ⃗ = dL⃗/dt. For central forces: L⃗ = constant (conservation of angular momentum).",
        formulas: ["L⃗ = r⃗ × mv⃗", "τ⃗ = dL⃗/dt"],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 8 }
      }
    ],
    exercises: [
      {
        id: "ch4-ex1",
        title: "Ball Kick Impulse",
        problem: "A player kicks a 200g ball. Ball leaves at θ=30° and lands after d=15m. Find the impulse on the ball.",
        pdfRef: { file: "P1100 - Tutorial Chap 4 - Given.pdf", page: 1 }
      },
      {
        id: "ch4-ex4",
        title: "Inelastic Collision",
        problem: "A 200g ball strikes a stationary 1800g block at v₀=30m/s and sticks. Find: a) height block rises, b) energy loss.",
        pdfRef: { file: "P1100 - Tutorial Chap 4 - Given.pdf", page: 1 }
      },
      {
        id: "ch4-ex7",
        title: "Three Ball Collision",
        problem: "Three balls of mass m. A hits B (at rest) with velocity v. B then hits C. Find velocities and energy loss for restitution coefficient e.",
        pdfRef: { file: "P1100 - Tutorial Chap 4 - Given.pdf", page: 2 }
      }
    ]
  },
  {
    id: "chapter5",
    number: 5,
    title: "Rotational Dynamics",
    icon: "RotateCw",
    description: "Rotation of solid bodies and moment of inertia",
    pdfs: ["P1100 - Tutorial Chap 5 - Given.pdf"],
    topics: [
      {
        id: "ch5-t1",
        title: "Moment of Inertia",
        content: "I = Σmᵢrᵢ² (for point masses). For continuous body: I = ∫r²dm. Parallel axis theorem: I = Icm + Md².",
        formulas: ["I = Σmᵢrᵢ²", "I = Icm + Md²"],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 1 }
      },
      {
        id: "ch5-t2",
        title: "Rotational Kinetic Energy",
        content: "KErot = ½Iω². For rolling: KEtotal = ½mv² + ½Iω² = ½mv²(1 + I/mr²).",
        formulas: ["KErot = ½Iω²", "KEroll = ½mv² + ½Iω²"],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 1 }
      },
      {
        id: "ch5-t3",
        title: "Torque and Angular Acceleration",
        content: "τ⃗ = r⃗ × F⃗. Rotational Newton's 2nd law: Στ = Iα. Angular acceleration α = dω/dt.",
        formulas: ["τ = rFsinθ", "Στ = Iα"],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 2 }
      },
      {
        id: "ch5-t4",
        title: "Conservation of Angular Momentum",
        content: "When Στₑₓₜ = 0: L = Iω = constant. If I changes, ω adjusts to conserve L.",
        formulas: ["I₁ω₁ = I₂ω₂"],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 1 }
      },
      {
        id: "ch5-t5",
        title: "Rolling Motion",
        content: "Pure rolling: v = ωr (no slipping). Acceleration: a = αr. For rolling down incline: a = gsinθ/(1 + I/mr²).",
        formulas: ["v = ωr", "a = gsinθ/(1 + I/mr²)"],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 2 }
      }
    ],
    exercises: [
      {
        id: "ch5-ex1",
        title: "Rotating Rod with Particles",
        problem: "Two particles of mass m at distance r from axis. Rod rotates at ω₀. Particles move to 2r. Find new ω and fraction of KE lost.",
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 1 }
      },
      {
        id: "ch5-ex2",
        title: "Simple Pendulum",
        problem: "Pendulum of mass m, length l released from θ=0. Find θ̈ in terms of θ, and angular velocity at θ=90°.",
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 1 }
      },
      {
        id: "ch5-ex5",
        title: "Rolling Sphere on Incline",
        problem: "Sphere (M=4kg, R=20cm, I=0.4MR²) rolls on 30° incline with 2kg block attached. Find acceleration.",
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 2 }
      }
    ]
  }
];

export const flashcards: Flashcard[] = [
  // Chapter 0
  { id: "fc1", front: "What is a scalar quantity?", back: "A quantity defined by magnitude only. Examples: mass, length, time, power, energy.", chapter: "chapter0" },
  { id: "fc2", front: "What is a vector quantity?", back: "A quantity requiring both magnitude and direction. Examples: position, velocity, acceleration, force.", chapter: "chapter0" },
  { id: "fc3", front: "Scalar product formula?", back: "A⃗·B⃗ = |A||B|cos(θ) = AxBx + AyBy + AzBz", chapter: "chapter0" },
  { id: "fc4", front: "Cross product magnitude?", back: "|A⃗×B⃗| = |A||B|sin(θ)", chapter: "chapter0" },
  
  // Chapter 1
  { id: "fc5", front: "Position vector in Cartesian?", back: "r⃗(t) = x(t)î + y(t)ĵ + z(t)k̂", chapter: "chapter1" },
  { id: "fc6", front: "How to get velocity from position?", back: "v⃗ = dr⃗/dt (differentiate position)", chapter: "chapter1" },
  { id: "fc7", front: "Maximum height in projectile motion?", back: "h = v₀²sin²θ/(2g)", chapter: "chapter1" },
  { id: "fc8", front: "Range in projectile motion?", back: "R = v₀²sin(2θ)/g (maximum at θ=45°)", chapter: "chapter1" },
  { id: "fc9", front: "Centripetal acceleration?", back: "aₙ = v²/r = ω²r (always toward center)", chapter: "chapter1" },
  { id: "fc10", front: "Tangential acceleration?", back: "aₜ = dv/dt = αr (changes speed, not direction)", chapter: "chapter1" },
  
  // Chapter 2
  { id: "fc11", front: "Newton's First Law?", back: "An object at rest stays at rest, and moving objects continue in straight line unless acted upon by external force.", chapter: "chapter2" },
  { id: "fc12", front: "Newton's Second Law?", back: "ΣF⃗ = ma⃗", chapter: "chapter2" },
  { id: "fc13", front: "Newton's Third Law?", back: "For every action, there is an equal and opposite reaction. F⃗ₐᵦ = -F⃗ᵦₐ", chapter: "chapter2" },
  { id: "fc14", front: "Static friction formula?", back: "fₛ ≤ μₛN (maximum: fₛₘₐₓ = μₛN)", chapter: "chapter2" },
  { id: "fc15", front: "Kinetic friction formula?", back: "fₖ = μₖN (μₖ < μₛ)", chapter: "chapter2" },
  { id: "fc16", front: "Universal gravitation?", back: "F = GMm/r²", chapter: "chapter2" },
  { id: "fc17", front: "Orbital velocity?", back: "v = √(GM/r)", chapter: "chapter2" },
  { id: "fc18", front: "Escape velocity?", back: "vₑ = √(2GM/R)", chapter: "chapter2" },
  
  // Chapter 3
  { id: "fc19", front: "Work formula?", back: "W = ∫F⃗·dr⃗ or W = Fd·cosθ (constant force)", chapter: "chapter3" },
  { id: "fc20", front: "Kinetic energy?", back: "KE = ½mv²", chapter: "chapter3" },
  { id: "fc21", front: "Work-Energy Theorem?", back: "ΣW = ΔKE = ½mv² - ½mv₀²", chapter: "chapter3" },
  { id: "fc22", front: "Gravitational PE?", back: "U = mgh (near Earth) or U = -GMm/r", chapter: "chapter3" },
  { id: "fc23", front: "Spring PE?", back: "U = ½kx²", chapter: "chapter3" },
  { id: "fc24", front: "Conservation of mechanical energy?", back: "KE₁ + PE₁ = KE₂ + PE₂ (when only conservative forces act)", chapter: "chapter3" },
  
  // Chapter 4
  { id: "fc25", front: "Linear momentum?", back: "p⃗ = mv⃗", chapter: "chapter4" },
  { id: "fc26", front: "Impulse-Momentum Theorem?", back: "J⃗ = Δp⃗ = ∫F⃗dt", chapter: "chapter4" },
  { id: "fc27", front: "Conservation of momentum?", back: "Σp⃗ᵢ = Σp⃗f (for isolated systems)", chapter: "chapter4" },
  { id: "fc28", front: "Coefficient of restitution?", back: "e = |v₂'-v₁'|/|v₂-v₁|. e=1 elastic, e=0 perfectly inelastic", chapter: "chapter4" },
  { id: "fc29", front: "Center of mass?", back: "R⃗cm = Σmᵢr⃗ᵢ/Σmᵢ", chapter: "chapter4" },
  
  // Chapter 5
  { id: "fc30", front: "Moment of inertia?", back: "I = Σmᵢrᵢ² or I = ∫r²dm", chapter: "chapter5" },
  { id: "fc31", front: "Parallel axis theorem?", back: "I = Icm + Md²", chapter: "chapter5" },
  { id: "fc32", front: "Rotational kinetic energy?", back: "KErot = ½Iω²", chapter: "chapter5" },
  { id: "fc33", front: "Rotational Newton's 2nd Law?", back: "Στ = Iα", chapter: "chapter5" },
  { id: "fc34", front: "Conservation of angular momentum?", back: "I₁ω₁ = I₂ω₂ (when Στₑₓₜ = 0)", chapter: "chapter5" },
  { id: "fc35", front: "Rolling condition?", back: "v = ωr (pure rolling, no slipping)", chapter: "chapter5" }
];

export const exams = [
  { id: "exam1", title: "2023-2024 Session 2", file: "P1100 2023-2024 s2 - En.pdf" },
  { id: "exam2", title: "2024-2025 Session 2", file: "P1100 2024-2025 s2 - En.pdf" },
  { id: "exam3", title: "1st & 2nd Session", file: "P1100 1st & 2nd session .pdf" },
  { id: "exam4", title: "Partial 2017-2018 Solution", file: "sol partial 17-18.pdf" },
  { id: "exam5", title: "Partial 2018-2019 Solution", file: "sol partial 18-19.pdf" },
  { id: "exam6", title: "Partial 2019-2020 Solution", file: "sol partial 19-20.pdf" }
];

export interface PdfFile {
  id: string;
  title: string;
  file: string;
  type: 'lecture' | 'tutorial' | 'exam' | 'other';
  chapter?: string;
}

export const pdfFiles: PdfFile[] = [
  // Chapter 0
  { id: "pdf1", title: "Mathematical Notions", file: "Chap 0 - Mathematical Notions.pdf", type: "lecture", chapter: "Chapter 0 - Mathematical Foundations" },
  
  // Chapter 1
  { id: "pdf2", title: "Lecture 1", file: "ch 1-Lecture 1.pdf", type: "lecture", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf3", title: "Lecture 2", file: "ch 1-Lecture 2.pdf", type: "lecture", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf4", title: "Lecture 3", file: "ch 1-Lecture 3.pdf", type: "lecture", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf5", title: "Lecture 4", file: "ch 1-Lecture 4.pdf", type: "lecture", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf6", title: "Tutorial", file: "Chap 1 - Tutorial.pdf", type: "tutorial", chapter: "Chapter 1 - Kinematics" },
  { id: "pdf7", title: "Tutorial (Given)", file: "P1100 -Tutorial Chap 1 - Given.pdf", type: "tutorial", chapter: "Chapter 1 - Kinematics" },
  
  // Chapter 2
  { id: "pdf8", title: "Dynamics Course", file: "P1100 - Chap 2 - Dynamics.pdf", type: "lecture", chapter: "Chapter 2 - Dynamics" },
  { id: "pdf9", title: "Dynamics Part 1", file: "P1100 chap 2 part 1.pdf", type: "lecture", chapter: "Chapter 2 - Dynamics" },
  { id: "pdf10", title: "Dynamics Part 2", file: "P1100-chap2-part2.pdf", type: "lecture", chapter: "Chapter 2 - Dynamics" },
  { id: "pdf11", title: "Tutorial (Given)", file: "P1100 -Tutorial Chap 2 - Given.pdf", type: "tutorial", chapter: "Chapter 2 - Dynamics" },
  { id: "pdf12", title: "Exercises 1-8", file: "P1100 - chap2- ex 1to8.pdf", type: "tutorial", chapter: "Chapter 2 - Dynamics" },
  
  // Chapter 3
  { id: "pdf13", title: "Course + Applications", file: "P1100_Chapter3_course+applications.pdf", type: "lecture", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf14", title: "Chapter 3 Notes", file: "chapter 3 p1100 .pdf", type: "lecture", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf15", title: "Applications", file: "P 1100 - Applications - chap 3.pdf", type: "lecture", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf16", title: "Tutorial 2024-2025", file: "P1100 - Tutorial Chap 3 - Given- 2024-2025.pdf", type: "tutorial", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf17", title: "Tutorial", file: "P1100- chap 3 -tuto.pdf", type: "tutorial", chapter: "Chapter 3 - Work & Energy" },
  { id: "pdf18", title: "TD Chap 3", file: "P1100 td chap 3.pdf", type: "tutorial", chapter: "Chapter 3 - Work & Energy" },
  
  // Chapter 4
  { id: "pdf19", title: "Course + Exercises", file: "Chap 4 - cours + ex tutoro.pdf", type: "lecture", chapter: "Chapter 4 - Linear Momentum" },
  { id: "pdf20", title: "Applications", file: "P 1100 - Applications - chap 4.pdf", type: "lecture", chapter: "Chapter 4 - Linear Momentum" },
  { id: "pdf21", title: "Tutorial 2025-2026", file: "P1100 - Tutorial Chap 4 - Given- 2025-2026.pdf", type: "tutorial", chapter: "Chapter 4 - Linear Momentum" },
  { id: "pdf22", title: "Tutorial (Given)", file: "P1100 - Tutorial Chap 4 - Given.pdf", type: "tutorial", chapter: "Chapter 4 - Linear Momentum" },
  
  // Chapter 5
  { id: "pdf23", title: "Tutorial (Given)", file: "P1100 - Tutorial Chap 5 - Given.pdf", type: "tutorial", chapter: "Chapter 5 - Rotational Dynamics" },
  
  // Exams
  { id: "pdf24", title: "2023-2024 Session 2", file: "P1100 2023-2024 s2 - En.pdf", type: "exam", chapter: "Exams" },
  { id: "pdf25", title: "2024-2025 Session 2", file: "P1100 2024-2025 s2 - En.pdf", type: "exam", chapter: "Exams" },
  { id: "pdf26", title: "1st & 2nd Session", file: "P1100 1st & 2nd session .pdf", type: "exam", chapter: "Exams" },
  { id: "pdf27", title: "Partial 17-18 Solution", file: "sol partial 17-18.pdf", type: "exam", chapter: "Exams" },
  { id: "pdf28", title: "Partial 18-19 Solution", file: "sol partial 18-19.pdf", type: "exam", chapter: "Exams" },
  { id: "pdf29", title: "Partial 19-20 Solution", file: "sol partial 19-20.pdf", type: "exam", chapter: "Exams" },
  
  // Other
  { id: "pdf30", title: "Course Summary", file: "Summary - P1100.pdf", type: "other", chapter: "Resources" },
  { id: "pdf31", title: "Exercises 10-12-13-15-17", file: "Ex10-12-13-15-17.pdf", type: "tutorial", chapter: "Resources" },
  { id: "pdf32", title: "Formulas (er-eθ-t-n)", file: "p1100(er-eø-t-n).pdf", type: "other", chapter: "Resources" }
];
