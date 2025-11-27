import type { Flashcard } from './types'

export const flashcards: Flashcard[] = [
  // Chapter 0 - Mathematical Foundations
  { id: "fc1", front: "What is a scalar quantity?", back: "A quantity defined by magnitude only. Examples: mass, length, time, power, energy.", chapter: "chapter0" },
  { id: "fc2", front: "What is a vector quantity?", back: "A quantity requiring both magnitude and direction. Examples: position, velocity, acceleration, force.", chapter: "chapter0" },
  { id: "fc3", front: "Scalar product formula?", back: "$\\vec{A} \\cdot \\vec{B} = |A||B|\\cos\\theta = A_xB_x + A_yB_y + A_zB_z$", chapter: "chapter0" },
  { id: "fc4", front: "Cross product magnitude?", back: "$|\\vec{A} \\times \\vec{B}| = |A||B|\\sin\\theta$", chapter: "chapter0" },
  
  // Chapter 1 - Kinematics
  { id: "fc5", front: "Position vector in Cartesian?", back: "$\\vec{r}(t) = x(t)\\hat{i} + y(t)\\hat{j} + z(t)\\hat{k}$", chapter: "chapter1" },
  { id: "fc6", front: "How to get velocity from position?", back: "$\\vec{v} = \\frac{d\\vec{r}}{dt}$ (differentiate position)", chapter: "chapter1" },
  { id: "fc7", front: "Maximum height in projectile motion?", back: "$h = \\frac{v_0^2\\sin^2\\theta}{2g}$", chapter: "chapter1" },
  { id: "fc8", front: "Range in projectile motion?", back: "$R = \\frac{v_0^2\\sin(2\\theta)}{g}$ (maximum at $\\theta = 45°$)", chapter: "chapter1" },
  { id: "fc9", front: "Centripetal acceleration?", back: "$a_n = \\frac{v^2}{r} = \\omega^2 r$ (always toward center)", chapter: "chapter1" },
  { id: "fc10", front: "Tangential acceleration?", back: "$a_t = \\frac{dv}{dt} = \\alpha r$ (changes speed, not direction)", chapter: "chapter1" },
  
  // Chapter 2 - Dynamics
  { id: "fc11", front: "Newton's First Law?", back: "An object at rest stays at rest, and moving objects continue in straight line unless acted upon by external force.", chapter: "chapter2" },
  { id: "fc12", front: "Newton's Second Law?", back: "$\\sum\\vec{F} = m\\vec{a}$", chapter: "chapter2" },
  { id: "fc13", front: "Newton's Third Law?", back: "For every action, there is an equal and opposite reaction. $\\vec{F}_{AB} = -\\vec{F}_{BA}$", chapter: "chapter2" },
  { id: "fc14", front: "Static friction formula?", back: "$f_s \\leq \\mu_s N$ (maximum: $f_{s,max} = \\mu_s N$)", chapter: "chapter2" },
  { id: "fc15", front: "Kinetic friction formula?", back: "$f_k = \\mu_k N$ (where $\\mu_k < \\mu_s$)", chapter: "chapter2" },
  { id: "fc16", front: "Universal gravitation?", back: "$F = \\frac{GMm}{r^2}$", chapter: "chapter2" },
  { id: "fc17", front: "Orbital velocity?", back: "$v = \\sqrt{\\frac{GM}{r}}$", chapter: "chapter2" },
  { id: "fc18", front: "Escape velocity?", back: "$v_e = \\sqrt{\\frac{2GM}{R}}$", chapter: "chapter2" },
  
  // Chapter 3 - Work & Energy
  { id: "fc19", front: "Work formula?", back: "$W = \\int\\vec{F} \\cdot d\\vec{r}$ or $W = Fd\\cos\\theta$ (constant force)", chapter: "chapter3" },
  { id: "fc20", front: "Kinetic energy?", back: "$KE = \\frac{1}{2}mv^2$", chapter: "chapter3" },
  { id: "fc21", front: "Work-Energy Theorem?", back: "$\\sum W = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2$", chapter: "chapter3" },
  { id: "fc22", front: "Gravitational PE?", back: "$U = mgh$ (near Earth) or $U = -\\frac{GMm}{r}$", chapter: "chapter3" },
  { id: "fc23", front: "Spring PE?", back: "$U = \\frac{1}{2}kx^2$", chapter: "chapter3" },
  { id: "fc24", front: "Conservation of mechanical energy?", back: "$KE_1 + PE_1 = KE_2 + PE_2$ (when only conservative forces act)", chapter: "chapter3" },
  
  // Chapter 4 - Linear Momentum
  { id: "fc25", front: "Linear momentum?", back: "$\\vec{p} = m\\vec{v}$", chapter: "chapter4" },
  { id: "fc26", front: "Impulse-Momentum Theorem?", back: "$\\vec{J} = \\Delta\\vec{p} = \\int\\vec{F}\\,dt$", chapter: "chapter4" },
  { id: "fc27", front: "Conservation of momentum?", back: "$\\sum\\vec{p}_i = \\sum\\vec{p}_f$ (for isolated systems)", chapter: "chapter4" },
  { id: "fc28", front: "Coefficient of restitution?", back: "$e = \\frac{|v_2' - v_1'|}{|v_2 - v_1|}$. $e=1$ elastic, $e=0$ perfectly inelastic", chapter: "chapter4" },
  { id: "fc29", front: "Center of mass?", back: "$\\vec{R}_{cm} = \\frac{\\sum m_i\\vec{r}_i}{\\sum m_i}$", chapter: "chapter4" },
  
  // Chapter 5 - Rotational Dynamics
  { id: "fc30", front: "Moment of inertia?", back: "$I = \\sum m_i r_i^2$ or $I = \\int r^2 \\, dm$", chapter: "chapter5" },
  { id: "fc31", front: "Parallel axis theorem?", back: "$I = I_{cm} + Md^2$", chapter: "chapter5" },
  { id: "fc32", front: "Rotational kinetic energy?", back: "$KE_{rot} = \\frac{1}{2}I\\omega^2$", chapter: "chapter5" },
  { id: "fc33", front: "Rotational Newton's 2nd Law?", back: "$\\sum\\tau = I\\alpha$", chapter: "chapter5" },
  { id: "fc34", front: "Conservation of angular momentum?", back: "$I_1\\omega_1 = I_2\\omega_2$ (when $\\sum\\tau_{ext} = 0$)", chapter: "chapter5" },
  { id: "fc35", front: "Rolling condition?", back: "$v = \\omega r$ (pure rolling, no slipping)", chapter: "chapter5" }
]
