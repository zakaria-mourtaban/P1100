// Course data extracted from P1100 PDFs
// Formulas use LaTeX notation for proper rendering via the Latex component
// Explanations are written in simple terms for 10th-grade understanding
// Diagrams can use LaTeX (TikZ-style) or Mermaid.js for flowcharts

export interface Topic {
  id: string;
  title: string;
  content: string;           // Brief summary (legacy)
  explanation?: string;      // Detailed explanation in simple terms (supports $latex$ inline)
  formulas?: string[];       // LaTeX formulas (without $ delimiters, rendered in display mode)
  diagrams?: {
    type: 'latex' | 'mermaid';
    content: string;
    caption?: string;
  }[];
  keyPoints?: string[];      // Bullet points for quick review (supports $latex$ inline)
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
        content: "Scalar quantities are defined by magnitude only (mass, length, time, power, energy). Vector quantities require both magnitude and direction, represented by arrows.",
        explanation: `Imagine you're describing something to a friend. Sometimes you only need to give them a number — like "the box weighs 5 kg" or "it took 3 hours." These are called **scalar quantities** because a single number (magnitude) tells the whole story.

But other times, a number isn't enough. If someone asks "which way to the store?", saying "500 meters" isn't helpful — you need to say "500 meters *north*." Quantities that need both a size AND a direction are called **vector quantities**.

**Scalars** (just a number):
• Mass: "5 kg" — no direction needed
• Time: "2 hours" — just how long
• Temperature: "25°C" — just how hot
• Energy: "100 Joules" — just how much

**Vectors** (number + direction):
• Position: "3 meters to the right"
• Velocity: "60 km/h heading north"  
• Force: "Push 10 N to the left"
• Acceleration: "Speeding up at $9.8 \\text{ m/s}^2$ downward"

Vectors are drawn as arrows. The arrow's length shows the magnitude (how big), and where it points shows the direction. Every vector has four key properties:
1. **Point of application** — where the vector starts
2. **Line of application** — the line the arrow sits on
3. **Direction** — which way along that line (the arrowhead)
4. **Magnitude** — how long the arrow is`,
        keyPoints: [
          "Scalars need only magnitude (size): mass, time, temperature, energy",
          "Vectors need magnitude AND direction: position, velocity, force, acceleration",
          "Vectors are drawn as arrows — length = magnitude, arrowhead = direction",
          "Vectors have 4 properties: point of application, line, direction, magnitude"
        ],
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 4 }
      },
      {
        id: "ch0-t2",
        title: "Vector Addition",
        content: "Vectors are added using the head-to-tail method. Place the tail of the second vector at the head of the first. The resultant vector goes from the tail of the first to the head of the last.",
        explanation: `Adding vectors isn't like adding regular numbers because direction matters! You can't just add "5 north" + "3 east" and get "8 northeast" — we need a special method.

**The Head-to-Tail Method (Triangle/Polygon Rule):**

Think of vectors as walking directions:
1. Start at point A and walk along the first vector $\\vec{A}$ (draw the first arrow)
2. From where you ended up (the "head" of $\\vec{A}$), attach the "tail" of vector $\\vec{B}$ and walk along it
3. The **resultant** $\\vec{R} = \\vec{A} + \\vec{B}$ goes directly from where you started to where you finished

It's like asking "if I walk 3 blocks east, then 4 blocks north, where am I compared to where I started?" The answer is the diagonal shortcut — that's your resultant vector!

**The Parallelogram Method:**

When you place both vectors at the same starting point:
1. Draw both vectors starting from the same point
2. Complete a parallelogram using these as two sides
3. The diagonal from the starting point is the resultant

**Important Properties:**
• Order doesn't matter: $\\vec{A} + \\vec{B} = \\vec{B} + \\vec{A}$ (commutative)
• Grouping doesn't matter: $(\\vec{A} + \\vec{B}) + \\vec{C} = \\vec{A} + (\\vec{B} + \\vec{C})$ (associative)
• Subtracting is adding the opposite: $\\vec{A} - \\vec{B} = \\vec{A} + (-\\vec{B})$`,
        keyPoints: [
          "Head-to-tail method: place second vector's tail at first vector's head",
          "Resultant goes from start of first vector to end of last vector",
          "Parallelogram method: same starting point, diagonal is resultant",
          "Vector addition is commutative: $\\vec{A} + \\vec{B} = \\vec{B} + \\vec{A}$"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph LR
    A[Start] -->|"Vector A"| B[Middle Point]
    B -->|"Vector B"| C[End]
    A -.->|"Resultant R = A + B"| C`,
            caption: "Head-to-tail vector addition"
          }
        ],
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 5 }
      },
      {
        id: "ch0-t3",
        title: "Scalar Product (Dot Product)",
        content: "The scalar product of two vectors gives a scalar value. Geometrical meaning: projection of one vector onto another.",
        explanation: `The **dot product** (or scalar product) is a way to multiply two vectors and get a regular number (scalar) out. It measures "how much" two vectors point in the same direction.

**The Formula:**
$$\\vec{A} \\cdot \\vec{B} = |A||B|\\cos(\\theta)$$

Where $\\theta$ is the angle between the vectors. Think of it as: "How much of vector $\\vec{B}$ is going in the same direction as vector $\\vec{A}$?"

**Why does $\\cos(\\theta)$ appear?**
• When vectors point the **same direction** ($\\theta = 0°$): $\\cos(0°) = 1$ → Maximum positive result
• When vectors are **perpendicular** ($\\theta = 90°$): $\\cos(90°) = 0$ → Result is zero!
• When vectors point **opposite** ($\\theta = 180°$): $\\cos(180°) = -1$ → Maximum negative result

**In Coordinates (the easy calculation method):**
If $\\vec{A} = (A_x, A_y, A_z)$ and $\\vec{B} = (B_x, B_y, B_z)$:
$$\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y + A_z B_z$$

Just multiply matching components and add them up!

**Geometric Meaning — Projection:**
The dot product $\\vec{A} \\cdot \\vec{B}$ gives you: (length of $\\vec{A}$) × (length of $\\vec{B}$'s shadow on $\\vec{A}$). It's like shining a flashlight straight down on $\\vec{B}$ and measuring its shadow on $\\vec{A}$.

**Quick Check for Perpendicular Vectors:**
If $\\vec{A} \\cdot \\vec{B} = 0$, the vectors are perpendicular (at 90°). This is super useful!`,
        formulas: [
          "\\vec{A} \\cdot \\vec{B} = |A||B|\\cos(\\theta)",
          "\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y + A_z B_z",
          "|\\vec{A}| = \\sqrt{\\vec{A} \\cdot \\vec{A}} = \\sqrt{A_x^2 + A_y^2 + A_z^2}"
        ],
        keyPoints: [
          "Dot product gives a scalar (number), not a vector",
          "Formula: $\\vec{A} \\cdot \\vec{B} = |A||B|\\cos(\\theta)$",
          "In components: multiply matching parts and add",
          "If dot product = 0, vectors are perpendicular",
          "Useful for finding angles and projections"
        ],
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 9 }
      },
      {
        id: "ch0-t4",
        title: "Vector Product (Cross Product)",
        content: "The cross product of two vectors produces a vector perpendicular to both. Use the right-hand rule to determine direction.",
        explanation: `The **cross product** is another way to multiply vectors, but this time the answer is a NEW VECTOR, not a number! This new vector is perpendicular (at 90°) to both original vectors.

**The Formula:**
$$|\\vec{A} \\times \\vec{B}| = |A||B|\\sin(\\theta)$$

This gives the *magnitude* (length) of the result. The *direction* needs the right-hand rule.

**The Right-Hand Rule:**
1. Point your fingers in the direction of $\\vec{A}$ (first vector)
2. Curl your fingers toward $\\vec{B}$ (second vector)
3. Your thumb points in the direction of $\\vec{A} \\times \\vec{B}$!

**Why does $\\sin(\\theta)$ appear?**
• When vectors are **parallel** ($\\theta = 0°$ or $180°$): $\\sin = 0$ → Cross product is zero!
• When vectors are **perpendicular** ($\\theta = 90°$): $\\sin = 1$ → Maximum result

This is OPPOSITE to the dot product! Cross product is biggest when vectors are perpendicular.

**Key Properties:**
• **NOT commutative**: $\\vec{A} \\times \\vec{B} = -\\vec{B} \\times \\vec{A}$ (switching order flips the direction!)
• $\\vec{A} \\times \\vec{A} = \\vec{0}$ (a vector crossed with itself is zero)

**Physical Meaning:**
The magnitude $|\\vec{A} \\times \\vec{B}|$ equals the **area of the parallelogram** formed by the two vectors. Cross products appear in:
• Torque (rotational force): $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$
• Angular momentum: $\\vec{L} = \\vec{r} \\times \\vec{p}$
• Magnetic force: $\\vec{F} = q\\vec{v} \\times \\vec{B}$`,
        formulas: [
          "|\\vec{A} \\times \\vec{B}| = |A||B|\\sin(\\theta)",
          "\\vec{A} \\times \\vec{B} = -\\vec{B} \\times \\vec{A}",
          "\\vec{A} \\times \\vec{B} = (A_y B_z - A_z B_y)\\hat{i} + (A_z B_x - A_x B_z)\\hat{j} + (A_x B_y - A_y B_x)\\hat{k}"
        ],
        keyPoints: [
          "Cross product gives a VECTOR perpendicular to both inputs",
          "Magnitude: $|\\vec{A} \\times \\vec{B}| = |A||B|\\sin(\\theta)$",
          "Use right-hand rule for direction",
          "NOT commutative: swapping order reverses direction",
          "Parallel vectors have zero cross product"
        ],
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 11 }
      },
      {
        id: "ch0-t5",
        title: "Derivatives in Physics",
        content: "Derivative shows rate of change. Essential for velocity (dr/dt) and acceleration (dv/dt).",
        explanation: `The **derivative** tells you how fast something is changing at any instant. In physics, derivatives are EVERYWHERE because physics is all about how things change!

**The Basic Idea:**
Imagine you're driving and watching your odometer. The derivative answers: "Right now, how fast is my position changing?" That's your velocity!

$$\\text{velocity} = \\frac{d(\\text{position})}{dt} = \\frac{dr}{dt}$$

**What the Derivative Tells You:**
• If $f'(x) > 0$: The function is **increasing** (going up)
• If $f'(x) < 0$: The function is **decreasing** (going down)  
• If $f'(x) = 0$: The function is flat (could be a maximum, minimum, or plateau)

**Key Physics Connections:**
1. **Position → Velocity**: $v = \\frac{dr}{dt}$ (how fast position changes)
2. **Velocity → Acceleration**: $a = \\frac{dv}{dt}$ (how fast velocity changes)
3. **Acceleration → Position**: $a = \\frac{d^2r}{dt^2}$ (second derivative of position)

**Common Derivative Rules You'll Use:**
• Power rule: $\\frac{d}{dx}(x^n) = nx^{n-1}$
• Constant: $\\frac{d}{dx}(c) = 0$
• Sum: $\\frac{d}{dx}(f + g) = f' + g'$
• Chain rule: $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$

**Example:**
If position is $r(t) = 5t^2 + 3t$ meters:
• Velocity: $v = \\frac{dr}{dt} = 10t + 3$ m/s
• Acceleration: $a = \\frac{dv}{dt} = 10$ m/s² (constant!)`,
        formulas: [
          "v = \\frac{dr}{dt}",
          "a = \\frac{dv}{dt} = \\frac{d^2r}{dt^2}",
          "\\frac{d}{dx}(x^n) = nx^{n-1}"
        ],
        keyPoints: [
          "Derivative = rate of change = slope of tangent line",
          "Positive derivative → function increasing; negative → decreasing",
          "Velocity is derivative of position: $v = dr/dt$",
          "Acceleration is derivative of velocity: $a = dv/dt$",
          "Acceleration is second derivative of position: $a = d^2r/dt^2$"
        ],
        pdfRef: { file: "Chap 0 - Mathematical Notions.pdf", page: 15 }
      },
      {
        id: "ch0-t6",
        title: "Integration",
        content: "Integration calculates the area under a curve. Used to find displacement from velocity, work from force, etc. Reverse operation of differentiation.",
        explanation: `**Integration** is the reverse of differentiation. If derivatives tell you how fast something changes, integrals tell you the total amount that accumulated.

**The Basic Idea:**
Imagine you know your velocity at every moment during a trip. Integration answers: "How far did I travel in total?" It adds up all the tiny bits of distance.

$$\\text{displacement} = \\int v \\, dt$$

**Visual Understanding — Area Under the Curve:**
If you graph velocity vs. time, the integral equals the **area** under that curve. This area represents total displacement!

• Positive area (above x-axis) = movement in positive direction
• Negative area (below x-axis) = movement in negative direction

**Key Physics Connections (going backwards from derivatives):**
1. **Acceleration → Velocity**: $v = \\int a \\, dt$
2. **Velocity → Position**: $r = \\int v \\, dt$
3. **Force → Work**: $W = \\int F \\, dr$
4. **Power → Energy**: $E = \\int P \\, dt$

**Common Integration Rules:**
• Power rule: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ (except when $n = -1$)
• Constant: $\\int c \\, dx = cx + C$
• Sum: $\\int (f + g) dx = \\int f dx + \\int g dx$

**The Constant of Integration (C):**
When you integrate, you always add a constant $C$ because many functions have the same derivative. For example, $x^2$, $x^2 + 5$, and $x^2 - 3$ all have derivative $2x$. The initial conditions tell you what $C$ is.

**Definite vs Indefinite Integrals:**
• **Indefinite**: $\\int f(x)dx = F(x) + C$ (gives a function)
• **Definite**: $\\int_a^b f(x)dx = F(b) - F(a)$ (gives a number — the actual area)`,
        formulas: [
          "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
          "r = \\int v \\, dt",
          "v = \\int a \\, dt",
          "W = \\int \\vec{F} \\cdot d\\vec{r}"
        ],
        keyPoints: [
          "Integration is the reverse of differentiation",
          "Integral = area under the curve",
          "Position is integral of velocity: $r = \\int v\\,dt$",
          "Velocity is integral of acceleration: $v = \\int a\\,dt$",
          "Always add constant $C$ for indefinite integrals; use initial conditions to find it"
        ],
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
        content: "Mechanics describes and explains motion based on experimental results.",
        explanation: `**Mechanics** is the branch of physics that studies motion. It's one of the oldest and most fundamental areas of physics — it explains everything from a ball rolling down a hill to planets orbiting the sun!

**Two Main Branches:**

1. **Kinematics** — The "what" of motion
   - Describes motion: where, how fast, what direction
   - Doesn't care about WHY things move
   - Uses position, velocity, acceleration
   - Example: "The car moved 100 meters in 5 seconds"

2. **Dynamics** — The "why" of motion
   - Explains what CAUSES motion (forces!)
   - Connects force to acceleration
   - Example: "The car accelerated because the engine applied a force"

**The Material Point Model:**
In physics, we often simplify objects as "points" — like dots with mass but no size. Why? Because an object's size doesn't matter when it's tiny compared to the distances involved.

Example: A car driving 100 km can be treated as a point — the car's 4-meter length doesn't significantly affect our calculations about the trip.

When does size matter? When you're studying rotation or when objects are close together (like two balls colliding).`,
        keyPoints: [
          "Mechanics = study of motion (oldest branch of physics)",
          "Kinematics = describes motion (position, velocity, acceleration)",
          "Dynamics = explains motion (forces cause acceleration)",
          "Material point = object treated as point with mass but no size",
          "Use material point when object size << distances involved"
        ],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 3 }
      },
      {
        id: "ch1-t2",
        title: "Units and Dimensions",
        content: "Fundamental quantities: Length (L), Mass (M), Time (T).",
        explanation: `**Dimensional analysis** is a powerful tool to check if equations make sense and to derive formulas. Every physical quantity can be expressed using three fundamental dimensions:

• **L** = Length (meters)
• **M** = Mass (kilograms)  
• **T** = Time (seconds)

**How It Works:**
Every quantity has "dimensions" — a recipe made from L, M, and T.

**Common Dimensions:**
| Quantity | Dimension | Why |
|----------|-----------|-----|
| Velocity | $LT^{-1}$ | distance ÷ time |
| Acceleration | $LT^{-2}$ | velocity ÷ time |
| Force | $MLT^{-2}$ | mass × acceleration |
| Energy | $ML^2T^{-2}$ | force × distance |
| Pressure | $ML^{-1}T^{-2}$ | force ÷ area |
| Power | $ML^2T^{-3}$ | energy ÷ time |

**Why This Is Useful:**

1. **Check your work**: Both sides of an equation must have the same dimensions!
   - $v = at$ → $LT^{-1} = LT^{-2} \\cdot T = LT^{-1}$ ✓
   
2. **Derive formulas**: If you know what a quantity depends on, dimensions can tell you the formula!

3. **Convert units**: $1 \\text{ N} = 1 \\text{ kg} \\cdot \\text{m/s}^2 = 10^5 \\text{ dyn}$

**Example: Checking an Equation**
Is $x = v^2/a$ correct for distance?
- Left side: $[x] = L$
- Right side: $[v^2/a] = (LT^{-1})^2/(LT^{-2}) = L^2T^{-2} \\cdot T^2L^{-1} = L$ ✓`,
        formulas: [
          "[v] = LT^{-1}",
          "[a] = LT^{-2}",
          "[F] = MLT^{-2}",
          "[E] = ML^2T^{-2}",
          "1\\text{ N} = 10^5 \\text{ dyn}"
        ],
        keyPoints: [
          "Three fundamental dimensions: Length (L), Mass (M), Time (T)",
          "Every physical quantity can be expressed in terms of L, M, T",
          "Dimensional analysis checks if equations are correct",
          "Both sides of any equation must have same dimensions",
          "Useful for deriving formulas and converting units"
        ],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 5 }
      },
      {
        id: "ch1-t3",
        title: "Position, Velocity, and Acceleration in Cartesian Coordinates",
        content: "Position vector describes location. Velocity is rate of change of position. Acceleration is rate of change of velocity.",
        explanation: `In Cartesian coordinates, we use three perpendicular axes (x, y, z) to describe where an object is and how it moves.

**Position Vector $\\vec{r}$:**
The position vector points from the origin to where the object is:
$$\\vec{r}(t) = x(t)\\hat{i} + y(t)\\hat{j} + z(t)\\hat{k}$$

Here, $x(t)$, $y(t)$, $z(t)$ are the coordinates at time $t$, and $\\hat{i}$, $\\hat{j}$, $\\hat{k}$ are unit vectors along each axis.

**Velocity Vector $\\vec{v}$:**
Velocity tells you how fast and in what direction you're moving. It's the derivative of position:
$$\\vec{v} = \\frac{d\\vec{r}}{dt} = \\dot{x}\\hat{i} + \\dot{y}\\hat{j} + \\dot{z}\\hat{k}$$

The dot notation ($\\dot{x}$) means "derivative with respect to time."

**Key property:** Velocity is always **tangent to the trajectory** (it points in the direction you're going at that instant).

**Acceleration Vector $\\vec{a}$:**
Acceleration tells you how your velocity is changing:
$$\\vec{a} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2} = \\ddot{x}\\hat{i} + \\ddot{y}\\hat{j} + \\ddot{z}\\hat{k}$$

**The Chain of Derivatives:**
$$\\text{Position } \\xrightarrow{\\frac{d}{dt}} \\text{ Velocity } \\xrightarrow{\\frac{d}{dt}} \\text{ Acceleration}$$

And going backwards (integration):
$$\\text{Acceleration } \\xrightarrow{\\int dt} \\text{ Velocity } \\xrightarrow{\\int dt} \\text{ Position}$$`,
        formulas: [
          "\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}",
          "\\vec{v} = \\frac{d\\vec{r}}{dt} = \\dot{x}\\hat{i} + \\dot{y}\\hat{j} + \\dot{z}\\hat{k}",
          "\\vec{a} = \\frac{d\\vec{v}}{dt} = \\ddot{x}\\hat{i} + \\ddot{y}\\hat{j} + \\ddot{z}\\hat{k}",
          "|\\vec{v}| = \\sqrt{\\dot{x}^2 + \\dot{y}^2 + \\dot{z}^2}"
        ],
        keyPoints: [
          "Position vector $\\vec{r}$ points from origin to object",
          "Velocity = derivative of position, always tangent to path",
          "Acceleration = derivative of velocity = second derivative of position",
          "Integration reverses differentiation: $\\vec{r} = \\int\\vec{v}\\,dt$",
          "Components: work with x, y, z independently in Cartesian"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph LR
    P[Position r] -->|"d/dt"| V[Velocity v]
    V -->|"d/dt"| A[Acceleration a]
    A -->|"∫dt"| V
    V -->|"∫dt"| P`,
            caption: "Relationship between position, velocity, and acceleration"
          }
        ],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 8 }
      },
      {
        id: "ch1-t4",
        title: "Rectilinear Motion",
        content: "Motion along a straight line. Can be uniform (constant velocity) or uniformly accelerated (constant acceleration).",
        explanation: `**Rectilinear motion** means motion in a straight line — the simplest type of motion. There are several cases:

**Case 1: Uniform Motion (constant velocity)**
When velocity doesn't change, position increases linearly with time:
$$x = v_0 t + x_0$$

The graph of position vs time is a straight line with slope = velocity.

**Case 2: Uniformly Accelerated Motion (constant acceleration)**
When acceleration is constant, we get the famous kinematic equations:

$$v = v_0 + at$$
$$x = x_0 + v_0 t + \\frac{1}{2}at^2$$
$$v^2 = v_0^2 + 2a(x - x_0)$$

These three equations are your best friends for solving constant-acceleration problems!

**How to choose which equation:**
| Known | Unknown | Use |
|-------|---------|-----|
| $v_0, a, t$ | $v$ | $v = v_0 + at$ |
| $x_0, v_0, a, t$ | $x$ | $x = x_0 + v_0t + \\frac{1}{2}at^2$ |
| $v_0, a, x$ | $v$ | $v^2 = v_0^2 + 2a\\Delta x$ |

**Case 3: Non-constant Acceleration**
When acceleration varies, use the relationship:
$$v\\,dv = a\\,ds$$

This comes from the chain rule and is useful when $a$ depends on position.

**Sign Convention:**
- Choose a positive direction (usually right or up)
- Quantities in the opposite direction are negative
- Acceleration opposite to velocity means slowing down`,
        formulas: [
          "v = v_0 + at",
          "x = x_0 + v_0 t + \\frac{1}{2}at^2",
          "v^2 = v_0^2 + 2a(x - x_0)",
          "v\\,dv = a\\,ds"
        ],
        keyPoints: [
          "Rectilinear = straight line motion",
          "Uniform: constant $v$, position changes linearly",
          "Uniformly accelerated: constant $a$, use the three kinematic equations",
          "No time in equation? Use $v^2 = v_0^2 + 2a\\Delta x$",
          "Sign convention: choose positive direction, stick with it"
        ],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 11 }
      },
      {
        id: "ch1-t5",
        title: "Projectile Motion",
        content: "2D motion with constant gravity. Motion decomposes into independent horizontal and vertical components.",
        explanation: `**Projectile motion** is when you throw something and gravity is the only force acting on it. The key insight is that horizontal and vertical motions are **completely independent**!

**The Setup:**
- Launch angle: $\\theta$ (measured from horizontal)
- Initial speed: $v_0$
- Gravity: $g = 9.8 \\text{ m/s}^2$ downward

**Splitting into Components:**
$$v_{0x} = v_0\\cos\\theta \\quad \\text{(horizontal)}$$
$$v_{0y} = v_0\\sin\\theta \\quad \\text{(vertical)}$$

**Horizontal Motion (no acceleration):**
$$a_x = 0$$
$$v_x = v_0\\cos\\theta \\text{ (constant)}$$
$$x = x_0 + v_0\\cos\\theta \\cdot t$$

**Vertical Motion (acceleration = -g):**
$$a_y = -g$$
$$v_y = v_0\\sin\\theta - gt$$
$$y = y_0 + v_0\\sin\\theta \\cdot t - \\frac{1}{2}gt^2$$

**Key Results:**

**Maximum Height** (when $v_y = 0$):
$$h_{max} = \\frac{v_0^2\\sin^2\\theta}{2g}$$

**Range** (horizontal distance when returning to launch height):
$$R = \\frac{v_0^2\\sin(2\\theta)}{g}$$

Maximum range occurs at $\\theta = 45°$!

**Trajectory Equation** (path shape — it's a parabola!):
$$y = x\\tan\\theta - \\frac{gx^2}{2v_0^2\\cos^2\\theta}$$

**Time of Flight:**
$$T = \\frac{2v_0\\sin\\theta}{g}$$`,
        formulas: [
          "x = x_0 + v_0\\cos\\theta \\cdot t",
          "y = y_0 + v_0\\sin\\theta \\cdot t - \\frac{1}{2}gt^2",
          "h_{max} = \\frac{v_0^2\\sin^2\\theta}{2g}",
          "R = \\frac{v_0^2\\sin(2\\theta)}{g}",
          "T = \\frac{2v_0\\sin\\theta}{g}"
        ],
        keyPoints: [
          "Horizontal and vertical motions are independent",
          "Horizontal: no acceleration, constant velocity",
          "Vertical: acceleration = $-g$, use kinematic equations",
          "Max height when $v_y = 0$",
          "Max range at launch angle $\\theta = 45°$",
          "Path is a parabola"
        ],
        pdfRef: { file: "ch 1-Lecture 1.pdf", page: 13 }
      },
      {
        id: "ch1-t6",
        title: "Cylindrical Coordinates",
        content: "Coordinates: (ρ, θ, z). Useful for problems with cylindrical symmetry.",
        explanation: `**Cylindrical coordinates** $(\\rho, \\theta, z)$ are perfect for problems with circular or cylindrical symmetry (like a ball on a rotating platform, or motion around a central axis).

**The Three Coordinates:**
- $\\rho$ = distance from the z-axis (like radius in 2D)
- $\\theta$ = angle around the z-axis (measured from x-axis)
- $z$ = height (same as in Cartesian)

**Conversion to Cartesian:**
$$x = \\rho\\cos\\theta, \\quad y = \\rho\\sin\\theta, \\quad z = z$$

**Unit Vectors:**
Unlike Cartesian $\\hat{i}, \\hat{j}, \\hat{k}$ which never change, the cylindrical unit vectors $\\hat{e}_\\rho$ and $\\hat{e}_\\theta$ **rotate as the object moves**!

- $\\hat{e}_\\rho$ points radially outward (away from z-axis)
- $\\hat{e}_\\theta$ points in direction of increasing $\\theta$ (tangent to circle)
- $\\hat{k}$ still points up

**Position:**
$$\\vec{r} = \\rho\\hat{e}_\\rho + z\\hat{k}$$

**Velocity:**
$$\\vec{v} = \\dot{\\rho}\\hat{e}_\\rho + \\rho\\dot{\\theta}\\hat{e}_\\theta + \\dot{z}\\hat{k}$$

- $\\dot{\\rho}$ = radial velocity (moving toward/away from axis)
- $\\rho\\dot{\\theta}$ = tangential velocity (moving around the axis)

**Acceleration:**
$$\\vec{a} = (\\ddot{\\rho} - \\rho\\dot{\\theta}^2)\\hat{e}_\\rho + (\\rho\\ddot{\\theta} + 2\\dot{\\rho}\\dot{\\theta})\\hat{e}_\\theta + \\ddot{z}\\hat{k}$$

The $-\\rho\\dot{\\theta}^2$ term is the **centripetal acceleration** (points toward axis).
The $2\\dot{\\rho}\\dot{\\theta}$ term is the **Coriolis contribution**.`,
        formulas: [
          "\\vec{r} = \\rho\\hat{e}_\\rho + z\\hat{k}",
          "\\vec{v} = \\dot{\\rho}\\hat{e}_\\rho + \\rho\\dot{\\theta}\\hat{e}_\\theta + \\dot{z}\\hat{k}",
          "a_\\rho = \\ddot{\\rho} - \\rho\\dot{\\theta}^2",
          "a_\\theta = \\rho\\ddot{\\theta} + 2\\dot{\\rho}\\dot{\\theta}"
        ],
        keyPoints: [
          "Use for circular/cylindrical symmetry problems",
          "$\\rho$ = radial distance, $\\theta$ = angle, $z$ = height",
          "Unit vectors $\\hat{e}_\\rho, \\hat{e}_\\theta$ rotate with the object!",
          "Radial acceleration includes centripetal term $-\\rho\\dot{\\theta}^2$",
          "Tangential acceleration includes Coriolis term $2\\dot{\\rho}\\dot{\\theta}$"
        ],
        pdfRef: { file: "ch 1-Lecture 2.pdf", page: 4 }
      },
      {
        id: "ch1-t7",
        title: "Polar Coordinates (2D)",
        content: "Special case of cylindrical with z=0. Position: r⃗ = ρêᵨ.",
        explanation: `**Polar coordinates** are cylindrical coordinates but in 2D only (no z-component). Perfect for analyzing motion in a plane with circular features.

**The Two Coordinates:**
- $\\rho$ (or $r$) = distance from origin
- $\\theta$ = angle from positive x-axis

**Position:**
$$\\vec{r} = \\rho\\hat{e}_\\rho$$

**Velocity:**
$$\\vec{v} = \\underbrace{\\dot{\\rho}\\hat{e}_\\rho}_{\\text{radial}} + \\underbrace{\\rho\\dot{\\theta}\\hat{e}_\\theta}_{\\text{tangential}}$$

- **Radial velocity** $v_\\rho = \\dot{\\rho}$: How fast you're moving toward/away from origin
- **Tangential velocity** $v_\\theta = \\rho\\dot{\\theta}$: How fast you're moving around the origin

**Speed (magnitude of velocity):**
$$|\\vec{v}| = \\sqrt{\\dot{\\rho}^2 + (\\rho\\dot{\\theta})^2}$$

**Acceleration:**
$$a_\\rho = \\ddot{\\rho} - \\rho\\dot{\\theta}^2 \\quad \\text{(radial)}$$
$$a_\\theta = \\rho\\ddot{\\theta} + 2\\dot{\\rho}\\dot{\\theta} \\quad \\text{(tangential)}$$

**Direction of Velocity:**
The angle $\\alpha$ between velocity and the radial direction:
$$\\tan\\alpha = \\frac{\\rho\\dot{\\theta}}{\\dot{\\rho}} = \\frac{v_\\theta}{v_\\rho}$$

**When to Use Polar:**
- Orbits and central force problems
- Motion around a fixed point
- Spiraling motion
- Any problem with rotational symmetry`,
        formulas: [
          "\\vec{r} = \\rho\\hat{e}_\\rho",
          "\\vec{v} = \\dot{\\rho}\\hat{e}_\\rho + \\rho\\dot{\\theta}\\hat{e}_\\theta",
          "|\\vec{v}| = \\sqrt{\\dot{\\rho}^2 + \\rho^2\\dot{\\theta}^2}",
          "\\tan\\alpha = \\frac{\\rho\\dot{\\theta}}{\\dot{\\rho}}"
        ],
        keyPoints: [
          "Polar = 2D cylindrical (no z)",
          "Two components: radial ($\\rho$-direction) and tangential ($\\theta$-direction)",
          "Radial velocity $v_\\rho = \\dot{\\rho}$ — toward/away from origin",
          "Tangential velocity $v_\\theta = \\rho\\dot{\\theta}$ — around the origin",
          "Use for orbits, spiral motion, central force problems"
        ],
        pdfRef: { file: "ch 1-Lecture 2.pdf", page: 7 }
      },
      {
        id: "ch1-t8",
        title: "Tangential and Normal Acceleration",
        content: "Acceleration can be split into tangential (changes speed) and normal (changes direction) components.",
        explanation: `Any acceleration can be decomposed into two perpendicular parts:

1. **Tangential acceleration $a_t$**: Changes your SPEED
2. **Normal acceleration $a_n$**: Changes your DIRECTION (curves your path)

**The Decomposition:**
$$\\vec{a} = a_t\\hat{\\tau} + a_n\\hat{n}$$

Where $\\hat{\\tau}$ is tangent to the path (velocity direction) and $\\hat{n}$ points toward the center of curvature.

**Tangential Acceleration:**
$$a_t = \\frac{dv}{dt} = \\frac{d|\\vec{v}|}{dt}$$

This is simply how fast your speed is changing. If $a_t = 0$, you're moving at constant speed (but might still be turning!).

**Normal (Centripetal) Acceleration:**
$$a_n = \\frac{v^2}{\\rho}$$

Where $\\rho$ is the **radius of curvature** — how sharply the path curves at that point.
- Tighter curve (smaller $\\rho$) → larger $a_n$
- Faster speed → larger $a_n$
- Straight line: $\\rho = \\infty$, so $a_n = 0$

**Total Acceleration Magnitude:**
$$|\\vec{a}| = \\sqrt{a_t^2 + a_n^2}$$

**Radius of Curvature Formula:**
For a curve $y = f(x)$:
$$\\rho = \\frac{[1 + (dy/dx)^2]^{3/2}}{|d^2y/dx^2|}$$

**Physical Intuition:**
- Speeding up on a straight road: only $a_t$
- Constant speed around a curve: only $a_n$
- Speeding up around a curve: both $a_t$ and $a_n$!`,
        formulas: [
          "a_t = \\frac{dv}{dt}",
          "a_n = \\frac{v^2}{\\rho}",
          "|\\vec{a}| = \\sqrt{a_t^2 + a_n^2}",
          "\\rho = \\frac{[1 + (dy/dx)^2]^{3/2}}{|d^2y/dx^2|}"
        ],
        keyPoints: [
          "Tangential $a_t$: changes speed (parallel to velocity)",
          "Normal $a_n$: changes direction (perpendicular to velocity)",
          "$a_n = v^2/\\rho$ where $\\rho$ = radius of curvature",
          "Constant speed on curve: $a_t = 0$ but $a_n \\neq 0$",
          "Straight line: $a_n = 0$ (infinite radius of curvature)"
        ],
        pdfRef: { file: "ch 1-Lecture 3.pdf", page: 2 }
      },
      {
        id: "ch1-t9",
        title: "Circular Motion",
        content: "Motion at constant radius. Can be uniform (constant ω) or non-uniform (changing ω).",
        explanation: `**Circular motion** is a special case where the object stays at a fixed distance $r$ from a center point.

**Angular Variables:**
- $\\theta$ = angular position (in radians)
- $\\omega = \\dot{\\theta}$ = angular velocity (rad/s)
- $\\alpha = \\dot{\\omega}$ = angular acceleration (rad/s²)

**Connecting Linear and Angular:**
$$s = r\\theta \\quad \\text{(arc length)}$$
$$v = r\\omega \\quad \\text{(tangential speed)}$$
$$a_t = r\\alpha \\quad \\text{(tangential acceleration)}$$

**Centripetal (Normal) Acceleration:**
$$a_n = \\frac{v^2}{r} = r\\omega^2$$

This always points toward the center — it's what keeps you moving in a circle instead of flying off in a straight line!

**Period and Frequency:**
$$T = \\frac{2\\pi}{\\omega} \\quad \\text{(time for one complete circle)}$$
$$f = \\frac{1}{T} = \\frac{\\omega}{2\\pi} \\quad \\text{(circles per second)}$$

**Uniform Circular Motion** ($\\omega$ = constant, $\\alpha = 0$):
- Speed is constant
- Velocity direction changes continuously
- Only centripetal acceleration exists
- $a_t = 0$, $a_n = r\\omega^2$

**Non-Uniform Circular Motion** ($\\alpha \\neq 0$):
- Speed is changing
- Both $a_t$ and $a_n$ present
- Total: $a = \\sqrt{a_t^2 + a_n^2}$

**The key insight:** Even at constant speed, circular motion requires acceleration! The velocity vector is constantly changing direction, which requires a centripetal force.`,
        formulas: [
          "v = r\\omega",
          "a_t = r\\alpha",
          "a_n = \\frac{v^2}{r} = r\\omega^2",
          "T = \\frac{2\\pi}{\\omega}",
          "\\vec{v} = \\vec{\\omega} \\times \\vec{r}"
        ],
        keyPoints: [
          "Angular velocity $\\omega = d\\theta/dt$, angular acceleration $\\alpha = d\\omega/dt$",
          "Linear speed: $v = r\\omega$",
          "Centripetal acceleration: $a_n = v^2/r = r\\omega^2$ (toward center)",
          "Period: $T = 2\\pi/\\omega$",
          "Uniform circular: constant speed, only centripetal acceleration"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph TD
    A[Circular Motion] --> B{Constant ω?}
    B -->|Yes| C[Uniform Circular]
    B -->|No| D[Non-uniform Circular]
    C --> E["a_t = 0<br/>a_n = rω² only"]
    D --> F["a_t = rα<br/>a_n = rω²<br/>Both present"]`,
            caption: "Types of circular motion"
          }
        ],
        pdfRef: { file: "ch 1-Lecture 3.pdf", page: 5 }
      },
      {
        id: "ch1-t10",
        title: "Change of Reference Frames",
        content: "Motion looks different from different viewpoints. Absolute motion = relative motion + frame motion.",
        explanation: `What you observe depends on where you're observing from! A passenger on a train sees a ball roll straight back, but someone on the platform sees it curve. Both are "right" — they're just in different **reference frames**.

**Reference Frame Terminology:**
- **Absolute frame (fixed frame)**: Usually the ground or a "stationary" observer
- **Relative frame (moving frame)**: A frame that moves (like a train or rotating platform)
- **Absolute motion**: Motion as seen from the fixed frame
- **Relative motion**: Motion as seen from the moving frame
- **Driving motion**: Motion of the moving frame itself

**Velocity Relationship:**
$$\\vec{v}_{\\text{absolute}} = \\vec{v}_{\\text{driving}} + \\vec{v}_{\\text{relative}}$$

Example: You walk forward in a moving train. Your velocity relative to ground = train's velocity + your walking velocity.

**Acceleration Relationship:**
$$\\vec{a}_{\\text{absolute}} = \\vec{a}_{\\text{driving}} + \\vec{a}_{\\text{relative}} + \\vec{a}_{\\text{Coriolis}}$$

**The Coriolis Acceleration:**
$$\\vec{a}_{\\text{Coriolis}} = 2\\vec{\\omega} \\times \\vec{v}_{\\text{relative}}$$

This extra term appears when:
1. The reference frame is **rotating** (angular velocity $\\omega$)
2. The object is **moving** within that rotating frame

**Real-World Coriolis Effects:**
- Weather systems (hurricanes spin different directions in N/S hemispheres)
- Ocean currents
- Long-range artillery must correct for Earth's rotation

**Why Does This Matter?**
Newton's laws ($F = ma$) only work directly in **inertial frames** (non-accelerating). In accelerating or rotating frames, you need to add "fictitious forces" to make the physics work.`,
        formulas: [
          "\\vec{v}_a = \\vec{v}_d + \\vec{v}_r",
          "\\vec{a}_a = \\vec{a}_d + \\vec{a}_r + 2\\vec{\\omega} \\times \\vec{v}_r",
          "\\vec{a}_{\\text{Coriolis}} = 2\\vec{\\omega} \\times \\vec{v}_r"
        ],
        keyPoints: [
          "Motion looks different from different reference frames",
          "Absolute velocity = driving velocity + relative velocity",
          "Absolute acceleration includes driving, relative, AND Coriolis terms",
          "Coriolis acceleration: $2\\vec{\\omega} \\times \\vec{v}_r$ (rotating frames only)",
          "Newton's laws work directly only in inertial (non-accelerating) frames"
        ],
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
        content: "An object remains at rest or in uniform motion unless acted upon by a net external force.",
        explanation: `**Newton's First Law**, also called the **Law of Inertia**, answers the question: "What happens when no force acts on an object?"

**The Law States:**
> An object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by a net external force.

In equation form: When $\\sum \\vec{F}_{ext} = 0$, then $\\vec{v} = \\text{constant}$

**What is Inertia?**
Inertia is an object's resistance to changes in motion. The more massive an object, the more inertia it has.

- A shopping cart is easy to push → low inertia
- A parked car is hard to push → high inertia
- Mass is the quantitative measure of inertia

**Why Objects Seem to "Want" to Keep Moving:**
When a car brakes suddenly, you lurch forward. It's not that you're pushed forward — it's that your body wants to keep moving (inertia) while the car slows down!

**Inertial Reference Frames:**
A reference frame where Newton's First Law holds is called an **inertial frame**. 
- The ground (approximately) ✓
- A car moving at constant velocity ✓
- An accelerating rocket ✗
- A spinning merry-go-round ✗

**Common Misconceptions:**
- ❌ "Objects need force to keep moving" — NO! Objects keep moving naturally; force is needed to STOP or CHANGE motion
- ❌ "Heavy objects slow down faster" — NO! In a vacuum, all objects coast forever regardless of mass`,
        keyPoints: [
          "No net force = no change in velocity (rest OR constant motion)",
          "Inertia = resistance to change in motion; mass measures inertia",
          "Objects don't need force to keep moving — force changes motion",
          "Inertial frame = reference frame where 1st law holds",
          "Examples of inertial frames: ground, car at constant velocity"
        ],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 4 }
      },
      {
        id: "ch2-t2",
        title: "Newton's Second Law",
        content: "The net force on an object equals its mass times acceleration: F = ma.",
        explanation: `**Newton's Second Law** is THE fundamental equation of classical mechanics. It connects force, mass, and acceleration:

$$\\sum \\vec{F} = m\\vec{a}$$

**What This Means:**
- **Force causes acceleration** — the harder you push, the faster the acceleration
- **Mass resists acceleration** — heavier objects accelerate less for the same force
- **It's a VECTOR equation** — direction matters!

**Breaking It Down:**
$$\\sum F_x = ma_x, \\quad \\sum F_y = ma_y, \\quad \\sum F_z = ma_z$$

Work with each direction independently!

**Units:**
- Force: Newton (N) = kg·m/s²
- Mass: kilogram (kg)
- Acceleration: m/s²

1 Newton is the force needed to accelerate 1 kg at 1 m/s².

**Alternative Form (Momentum):**
$$\\vec{F} = \\frac{d\\vec{p}}{dt} \\quad \\text{where } \\vec{p} = m\\vec{v}$$

This form is more general and works even when mass changes (like a rocket burning fuel).

**Problem-Solving Strategy:**
1. Draw a **Free Body Diagram (FBD)** — show all forces on the object
2. Choose coordinate axes (often: x along motion, y perpendicular)
3. Write $\\sum F_x = ma_x$ and $\\sum F_y = ma_y$
4. Solve for unknowns

**Example:**
A 2 kg book on a table has weight $W = mg = 2 \\times 9.8 = 19.6$ N down. The table pushes up with normal force $N = 19.6$ N. Net force = 0, so $a = 0$ (it doesn't move).`,
        formulas: [
          "\\sum \\vec{F} = m\\vec{a}",
          "\\vec{F} = \\frac{d\\vec{p}}{dt}",
          "\\vec{p} = m\\vec{v}",
          "1\\text{ N} = 1\\text{ kg} \\cdot \\text{m/s}^2"
        ],
        keyPoints: [
          "$\\sum\\vec{F} = m\\vec{a}$ — the fundamental law of mechanics",
          "Force causes acceleration; mass resists it",
          "Vector equation: apply separately to x, y, z",
          "Alternative: $\\vec{F} = d\\vec{p}/dt$ (works when mass changes)",
          "Always draw a Free Body Diagram first!"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph TD
    A[Identify Object] --> B[Draw Free Body Diagram]
    B --> C[Choose Coordinates]
    C --> D["Write ΣF = ma for each axis"]
    D --> E[Solve for Unknowns]`,
            caption: "Newton's Second Law problem-solving strategy"
          }
        ],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 5 }
      },
      {
        id: "ch2-t3",
        title: "Newton's Third Law (Action-Reaction)",
        content: "For every action force, there is an equal and opposite reaction force.",
        explanation: `**Newton's Third Law** tells us that forces always come in pairs:

$$\\vec{F}_{AB} = -\\vec{F}_{BA}$$

When object A pushes on object B, object B pushes back on A with equal magnitude but opposite direction.

**Key Points:**
1. **Equal magnitude**: $|F_{AB}| = |F_{BA}|$
2. **Opposite direction**: They point in opposite directions
3. **Different objects**: The two forces act on DIFFERENT objects!
4. **Same type**: Both are the same type of force (both gravitational, both contact, etc.)
5. **Simultaneous**: They exist at the same time

**Why Don't They Cancel?**
A common confusion: "If forces are equal and opposite, why doesn't everything cancel out?"

Answer: The forces act on DIFFERENT objects! They only cancel when added for the SAME object.

**Examples:**

| Action | Reaction |
|--------|----------|
| You push wall → | Wall pushes you ← |
| Earth pulls apple ↓ | Apple pulls Earth ↑ |
| Rocket pushes gas ← | Gas pushes rocket → |
| Your foot pushes ground ← | Ground pushes foot → (friction) |

**Walking:**
When you walk, your foot pushes backward on the ground. The ground pushes forward on your foot (friction). This forward friction force is what accelerates you!

**The Horse and Cart Problem:**
"If the horse pulls the cart and the cart pulls back equally, how does anything move?"

The horse accelerates because the NET force on the horse includes:
- Ground friction on horse's hooves (forward)
- Cart pulling horse (backward)

If ground friction > cart's pull, the horse accelerates forward!`,
        formulas: [
          "\\vec{F}_{AB} = -\\vec{F}_{BA}",
          "|F_{\\text{action}}| = |F_{\\text{reaction}}|"
        ],
        keyPoints: [
          "Forces always come in pairs: action and reaction",
          "Equal magnitude, opposite direction",
          "Act on DIFFERENT objects (that's why they don't cancel!)",
          "Same type of force (gravitational, contact, etc.)",
          "Walking works because ground pushes you forward (reaction to your push)"
        ],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 5 }
      },
      {
        id: "ch2-t4",
        title: "Types of Forces",
        content: "Forces can be contact forces (touch required) or field forces (act at distance).",
        explanation: `Forces come in two main categories:

**1. Contact Forces (require touching)**

| Force | Description |
|-------|-------------|
| **Normal Force ($N$)** | Perpendicular push from a surface; prevents objects from passing through |
| **Friction ($f$)** | Parallel to surface; opposes relative motion |
| **Tension ($T$)** | Pull through rope, string, cable |
| **Spring Force** | $F = -kx$ (Hooke's Law); restoring force proportional to stretch |
| **Applied Force** | Any push or pull you apply |

**2. Field Forces (act at distance)**

| Force | Formula | Description |
|-------|---------|-------------|
| **Gravity** | $F = \\frac{GMm}{r^2}$ | Attraction between masses |
| **Weight** | $W = mg$ | Gravity near Earth's surface |
| **Electromagnetic** | Various | Between charged particles |
| **Strong Nuclear** | — | Holds nucleus together |
| **Weak Nuclear** | — | Radioactive decay |

**Understanding Weight vs Mass:**
- **Mass ($m$)**: Amount of matter, same everywhere, measured in kg
- **Weight ($W$)**: Gravitational force, depends on location, measured in N

$$W = mg$$

On Earth: $g \\approx 9.8$ m/s²
On Moon: $g \\approx 1.6$ m/s² (you weigh less, but mass is same!)

**Normal Force Misconception:**
The normal force is NOT always equal to weight!
- On flat surface: $N = mg$ ✓
- On incline at angle $\\theta$: $N = mg\\cos\\theta$
- Being pushed down: $N > mg$
- In elevator accelerating up: $N > mg$`,
        formulas: [
          "W = mg",
          "F = \\frac{GMm}{r^2}",
          "F_{spring} = -kx",
          "g = 9.8 \\text{ m/s}^2 \\text{ (Earth surface)}"
        ],
        keyPoints: [
          "Contact forces: normal, friction, tension, spring, applied",
          "Field forces: gravity, electromagnetic (act at distance)",
          "Weight = $mg$ (force due to gravity)",
          "Normal force is NOT always equal to weight!",
          "Spring force: $F = -kx$ (Hooke's Law)"
        ],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 6 }
      },
      {
        id: "ch2-t5",
        title: "Friction Forces",
        content: "Friction opposes relative motion. Static friction prevents motion; kinetic friction acts during motion.",
        explanation: `**Friction** is a contact force that opposes the relative motion (or attempted motion) between surfaces.

**Two Types:**

**1. Static Friction ($f_s$)** — When object is NOT moving
$$f_s \\leq \\mu_s N$$

- Adjusts to match applied force (up to a maximum)
- Maximum static friction: $f_{s,max} = \\mu_s N$
- Object starts moving when applied force exceeds $f_{s,max}$

**2. Kinetic Friction ($f_k$)** — When object IS moving
$$f_k = \\mu_k N$$

- Constant value (doesn't depend on speed)
- Always: $\\mu_k < \\mu_s$ (it's easier to keep something moving than to start it moving)

**The Coefficients:**
- $\\mu_s$ = coefficient of static friction
- $\\mu_k$ = coefficient of kinetic friction
- Both are dimensionless (no units)
- Depend on the materials in contact

| Surfaces | $\\mu_s$ | $\\mu_k$ |
|----------|----------|----------|
| Rubber on concrete | 1.0 | 0.8 |
| Wood on wood | 0.5 | 0.3 |
| Ice on ice | 0.1 | 0.03 |
| Teflon on steel | 0.04 | 0.04 |

**Direction of Friction:**
Friction opposes RELATIVE motion (or tendency to move). If you push right, friction acts left.

**On an Incline:**
A block on an incline at angle $\\theta$:
- Starts sliding when: $\\tan\\theta > \\mu_s$
- While sliding: $f_k = \\mu_k N = \\mu_k mg\\cos\\theta$

**Why Does Friction Exist?**
Microscopically, surfaces are rough with tiny bumps that interlock. Static friction is stronger because the bumps have time to settle into each other.`,
        formulas: [
          "f_s \\leq \\mu_s N",
          "f_{s,max} = \\mu_s N",
          "f_k = \\mu_k N",
          "\\mu_k < \\mu_s"
        ],
        keyPoints: [
          "Static friction: $f_s \\leq \\mu_s N$ (prevents motion)",
          "Kinetic friction: $f_k = \\mu_k N$ (during motion)",
          "Static > Kinetic: $\\mu_s > \\mu_k$",
          "Friction opposes relative motion or tendency to move",
          "On incline: block slides when $\\tan\\theta > \\mu_s$"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph LR
    A["Applied Force<br/>Increases"] --> B{F > μₛN?}
    B -->|No| C["Static Friction<br/>f = F (matches)"]
    B -->|Yes| D["Object Starts Moving"]
    D --> E["Kinetic Friction<br/>f = μₖN (constant)"]`,
            caption: "Transition from static to kinetic friction"
          }
        ],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 8 }
      },
      {
        id: "ch2-t6",
        title: "Universal Gravitation",
        content: "Every mass attracts every other mass with force proportional to their masses and inversely proportional to distance squared.",
        explanation: `**Newton's Law of Universal Gravitation** explains why apples fall AND why planets orbit:

$$F = \\frac{GMm}{r^2}$$

**The Variables:**
- $G = 6.67 \\times 10^{-11}$ N·m²/kg² (gravitational constant)
- $M$ and $m$ = the two masses
- $r$ = distance between their centers

**Key Features:**
1. **Always attractive** — masses pull toward each other
2. **Inverse square law** — double the distance, quarter the force
3. **Mutual** — both objects feel the same force (Newton's 3rd Law)

**Gravitational Field:**
The gravitational field $\\vec{g}$ at distance $r$ from mass $M$:
$$g = \\frac{GM}{r^2}$$

This is the "gravitational acceleration" a small test mass would feel.

At Earth's surface ($r = R_{Earth}$):
$$g = \\frac{GM_{Earth}}{R_{Earth}^2} \\approx 9.8 \\text{ m/s}^2$$

**Satellite Motion:**
For a satellite in circular orbit at radius $r$:

Orbital velocity:
$$v = \\sqrt{\\frac{GM}{r}}$$

Period (time for one orbit):
$$T = 2\\pi\\sqrt{\\frac{r^3}{GM}}$$

Notice: Higher orbit → slower speed, longer period!

**Weight vs Distance:**
Your weight decreases as you go up:
$$W(r) = \\frac{GMm}{r^2}$$

At $r = 2R_{Earth}$, your weight is only 1/4 of surface weight!`,
        formulas: [
          "F = \\frac{GMm}{r^2}",
          "g = \\frac{GM}{r^2}",
          "v_{orbit} = \\sqrt{\\frac{GM}{r}}",
          "T = 2\\pi\\sqrt{\\frac{r^3}{GM}}",
          "G = 6.67 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2/\\text{kg}^2"
        ],
        keyPoints: [
          "Gravitational force: $F = GMm/r^2$ (always attractive)",
          "Inverse square law: 2× distance → 1/4 force",
          "Surface gravity: $g = GM/R^2 \\approx 9.8$ m/s² on Earth",
          "Orbital velocity: $v = \\sqrt{GM/r}$",
          "Higher orbit = slower speed, longer period"
        ],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 17 }
      },
      {
        id: "ch2-t7",
        title: "Orbital Mechanics",
        content: "Orbits are conic sections. Eccentricity determines shape: circle, ellipse, parabola, or hyperbola.",
        explanation: `When an object moves under gravity, its path is a **conic section** — the shape depends on its energy!

**Orbital Shapes and Eccentricity ($e$):**

| $e$ value | Shape | Energy | Bound? |
|-----------|-------|--------|--------|
| $e = 0$ | Circle | $E < 0$ (minimum) | Yes |
| $0 < e < 1$ | Ellipse | $E < 0$ | Yes |
| $e = 1$ | Parabola | $E = 0$ | No (escapes) |
| $e > 1$ | Hyperbola | $E > 0$ | No (escapes) |

**Total Energy of Orbit:**
$$E = KE + PE = \\frac{1}{2}mv^2 - \\frac{GMm}{r}$$

For a bound orbit (ellipse/circle):
$$E = -\\frac{GMm}{2a}$$

where $a$ is the semi-major axis.

**Escape Velocity:**
The minimum speed needed to escape a planet's gravity (reach $r = \\infty$ with $v = 0$):
$$v_{escape} = \\sqrt{\\frac{2GM}{R}}$$

For Earth: $v_{escape} \\approx 11.2$ km/s

**Kepler's Laws:**
1. **Orbits are ellipses** with the sun at one focus
2. **Equal areas in equal times** — planets move faster when closer to sun
3. **Period squared ∝ radius cubed**: $T^2 = \\frac{4\\pi^2}{GM}a^3$

**Aphelion and Perihelion:**
For an elliptical orbit:
- Perihelion (closest): $r_p = a(1 - e)$
- Aphelion (farthest): $r_a = a(1 + e)$

$$\\frac{r_a}{r_p} = \\frac{1 + e}{1 - e}$$

**Conservation Laws:**
In orbital motion, two things are conserved:
1. **Energy**: $E = \\frac{1}{2}mv^2 - \\frac{GMm}{r} = \\text{constant}$
2. **Angular momentum**: $L = mvr\\sin\\phi = \\text{constant}$`,
        formulas: [
          "v_{escape} = \\sqrt{\\frac{2GM}{R}}",
          "E = -\\frac{GMm}{2a}",
          "T^2 = \\frac{4\\pi^2}{GM}a^3",
          "r_p = a(1-e), \\quad r_a = a(1+e)"
        ],
        keyPoints: [
          "Orbit shape depends on energy: $e=0$ circle, $0<e<1$ ellipse, $e\\geq1$ escapes",
          "Escape velocity: $v_e = \\sqrt{2GM/R}$ (11.2 km/s from Earth)",
          "Kepler's 3rd Law: $T^2 \\propto a^3$",
          "Orbital energy: $E = -GMm/(2a)$ for bound orbits",
          "Angular momentum is conserved: faster at perihelion, slower at aphelion"
        ],
        pdfRef: { file: "P1100 - Chap 2 - Dynamics.pdf", page: 20 }
      },
      {
        id: "ch2-t8",
        title: "Fictitious Forces",
        content: "In non-inertial frames, fictitious forces appear to make Newton's laws work.",
        explanation: `Newton's laws only work directly in **inertial frames** (non-accelerating). In accelerating or rotating frames, we must add **fictitious forces** (also called pseudo-forces or inertial forces).

**Why "Fictitious"?**
These forces don't come from any physical interaction — they're mathematical tools to use $F = ma$ in non-inertial frames.

**Types of Fictitious Forces:**

**1. Inertial Force (Linear acceleration)**
If the frame accelerates with $\\vec{a}_d$:
$$\\vec{f}_{inertial} = -m\\vec{a}_d$$

Example: In a braking car, you feel pushed forward. There's no real force — your body wants to keep moving (inertia) while the car slows.

**2. Centrifugal Force (Rotation)**
In a rotating frame (angular velocity $\\omega$):
$$\\vec{f}_{centrifugal} = -m\\vec{\\omega} \\times (\\vec{\\omega} \\times \\vec{r}) = m\\omega^2 r \\hat{e}_r$$

Points radially outward! This is why you feel thrown outward on a merry-go-round.

**3. Coriolis Force (Motion in rotating frame)**
$$\\vec{f}_{Coriolis} = -2m\\vec{\\omega} \\times \\vec{v}_r$$

Acts perpendicular to velocity. Affects weather patterns, ocean currents, and long-range projectiles.

**Complete Equation in Rotating Frame:**
$$m\\vec{a}_r = \\sum\\vec{F}_{real} - m\\vec{a}_d - 2m\\vec{\\omega}\\times\\vec{v}_r - m\\vec{\\omega}\\times(\\vec{\\omega}\\times\\vec{r})$$

**Real-World Examples:**
- You feel heavier in elevator accelerating up ($f_{inertial}$ points down)
- You slide outward on a turning car (centrifugal)
- Hurricanes rotate opposite directions in N/S hemispheres (Coriolis)
- Foucault pendulum demonstrates Earth's rotation (Coriolis)`,
        formulas: [
          "\\vec{f}_{inertial} = -m\\vec{a}_d",
          "\\vec{f}_{centrifugal} = m\\omega^2 r\\hat{e}_r",
          "\\vec{f}_{Coriolis} = -2m\\vec{\\omega} \\times \\vec{v}_r"
        ],
        keyPoints: [
          "Fictitious forces appear in non-inertial (accelerating/rotating) frames",
          "Inertial force: $-m\\vec{a}_d$ (opposite to frame's acceleration)",
          "Centrifugal force: $m\\omega^2r$ radially outward (rotating frame)",
          "Coriolis force: $-2m\\vec{\\omega}\\times\\vec{v}_r$ (perpendicular to motion)",
          "These forces are not real — just mathematical tools"
        ],
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
        content: "Work is energy transferred when a force moves an object through a displacement.",
        explanation: `**Work** is done when a force causes an object to move. It's the energy transferred TO or FROM an object.

**Definition:**
$$W = \\int \\vec{F} \\cdot d\\vec{r}$$

For a **constant force**:
$$W = \\vec{F} \\cdot \\vec{d} = Fd\\cos\\theta$$

where $\\theta$ is the angle between force and displacement.

**Understanding the Dot Product:**
- Force parallel to motion ($\\theta = 0°$): $W = Fd$ (maximum positive work)
- Force perpendicular ($\\theta = 90°$): $W = 0$ (no work done!)
- Force opposite to motion ($\\theta = 180°$): $W = -Fd$ (negative work)

**Units:**
Work is measured in **Joules (J)**: 1 J = 1 N·m

**Common Work Calculations:**

| Force | Work Done |
|-------|-----------|
| Gravity (going down $h$) | $W_g = +mgh$ |
| Gravity (going up $h$) | $W_g = -mgh$ |
| Spring (from $x_1$ to $x_2$) | $W_s = \\frac{1}{2}k(x_1^2 - x_2^2)$ |
| Friction (distance $d$) | $W_f = -\\mu N d$ (always negative) |

**Positive vs Negative Work:**
- **Positive work**: Force helps motion → energy transferred TO object → speeds up
- **Negative work**: Force opposes motion → energy transferred FROM object → slows down
- **Zero work**: Force perpendicular to motion (like normal force on flat surface)

**Example:**
Pushing a 10 kg box 5 m with 20 N at 30° to horizontal:
$$W = (20)(5)\\cos(30°) = 86.6 \\text{ J}$$`,
        formulas: [
          "W = \\int \\vec{F} \\cdot d\\vec{r}",
          "W = Fd\\cos\\theta",
          "W_{gravity} = -mg\\Delta h",
          "W_{spring} = \\frac{1}{2}k(x_1^2 - x_2^2)"
        ],
        keyPoints: [
          "Work = force × displacement × cos(angle between them)",
          "Positive work: adds energy to object (speeds up)",
          "Negative work: removes energy (slows down)",
          "Perpendicular force does zero work",
          "Units: Joule (J) = Newton × meter"
        ],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 4 }
      },
      {
        id: "ch3-t2",
        title: "Power",
        content: "Power is the rate at which work is done or energy is transferred.",
        explanation: `**Power** measures how FAST work is being done — it's the rate of energy transfer.

**Definition:**
$$P = \\frac{dW}{dt}$$

**Useful Form:**
Since $W = \\vec{F} \\cdot d\\vec{r}$:
$$P = \\vec{F} \\cdot \\vec{v}$$

For force along velocity direction:
$$P = Fv$$

**Units:**
- SI: **Watt (W)** = 1 J/s
- 1 horsepower (hp) = 746 W
- 1 kilowatt (kW) = 1000 W

**Average vs Instantaneous Power:**
$$P_{avg} = \\frac{\\Delta W}{\\Delta t} = \\frac{W_{total}}{t_{total}}$$

$$P_{inst} = \\frac{dW}{dt} = \\vec{F} \\cdot \\vec{v}$$

**Why Power Matters:**
Two cars can do the same total work climbing a hill, but the more powerful one does it faster!

**Example:**
A 1000 kg car accelerates from rest to 20 m/s in 10 s on a flat road.

Work done = Change in KE = $\\frac{1}{2}(1000)(20)^2 = 200,000$ J

Average power = $\\frac{200,000}{10} = 20,000$ W = 20 kW ≈ 27 hp

**Power and Velocity:**
At constant velocity, all engine power goes to overcoming resistance:
$$P = F_{resistance} \\cdot v$$

Maximum speed occurs when engine power equals resistance force × velocity!`,
        formulas: [
          "P = \\frac{dW}{dt}",
          "P = \\vec{F} \\cdot \\vec{v}",
          "P_{avg} = \\frac{W}{t}",
          "1 \\text{ hp} = 746 \\text{ W}"
        ],
        keyPoints: [
          "Power = rate of doing work = $dW/dt$",
          "Alternative formula: $P = \\vec{F} \\cdot \\vec{v}$",
          "Units: Watt (W) = Joule/second",
          "1 horsepower = 746 W",
          "More power = same work done faster"
        ],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 2 }
      },
      {
        id: "ch3-t3",
        title: "Kinetic Energy",
        content: "Energy due to motion. The work-energy theorem connects work and kinetic energy change.",
        explanation: `**Kinetic Energy** is the energy an object has because it's moving:

$$KE = \\frac{1}{2}mv^2$$

**Key Properties:**
- Always positive (or zero for object at rest)
- Depends on mass AND speed
- Doubles when speed doubles? No! It QUADRUPLES (because $v^2$)

**The Work-Energy Theorem:**
This is one of the most powerful tools in physics:

$$W_{net} = \\Delta KE = KE_f - KE_i = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2$$

> The total work done on an object equals its change in kinetic energy.

**Why This Is Powerful:**
You don't need to know forces, accelerations, or time — just initial speed, final speed, and total work!

**Example: Braking Distance**
A car at speed $v$ brakes with friction force $f$.

Work by friction: $W = -fd$ (negative because it opposes motion)

Work-energy: $-fd = 0 - \\frac{1}{2}mv^2$

Solving: $d = \\frac{mv^2}{2f}$

Notice: If speed doubles, braking distance QUADRUPLES!

**Example Calculation:**
A 2 kg ball moving at 3 m/s:
$$KE = \\frac{1}{2}(2)(3)^2 = 9 \\text{ J}$$

If it speeds up to 6 m/s:
$$KE = \\frac{1}{2}(2)(6)^2 = 36 \\text{ J}$$

Work done = $36 - 9 = 27$ J`,
        formulas: [
          "KE = \\frac{1}{2}mv^2",
          "W_{net} = \\Delta KE = KE_f - KE_i",
          "W_{net} = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2"
        ],
        keyPoints: [
          "Kinetic energy: $KE = \\frac{1}{2}mv^2$ (energy of motion)",
          "Always positive or zero",
          "Work-Energy Theorem: $W_{net} = \\Delta KE$",
          "Double speed → quadruple KE (and quadruple braking distance!)",
          "Powerful for solving problems without knowing time or acceleration"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph LR
    A["Initial KE<br/>½mv₀²"] -->|"+ Positive Work"| B["Final KE<br/>½mv²"]
    A -->|"- Negative Work"| C["Lower Final KE"]
    D["Work by all forces"] --> E["= Change in KE"]`,
            caption: "Work-Energy Theorem relationship"
          }
        ],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 3 }
      },
      {
        id: "ch3-t4",
        title: "Potential Energy",
        content: "Stored energy due to position or configuration. Can be gravitational, elastic, or other forms.",
        explanation: `**Potential Energy** is stored energy that can be converted to kinetic energy. It depends on POSITION or CONFIGURATION.

**Gravitational Potential Energy:**
Near Earth's surface:
$$U_g = mgh$$

where $h$ is height above a reference point (you choose the reference!).

Far from Earth (universal):
$$U_g = -\\frac{GMm}{r}$$

The negative sign means energy is lowest (most negative) when objects are close.

**Elastic (Spring) Potential Energy:**
$$U_s = \\frac{1}{2}kx^2$$

where $x$ is displacement from equilibrium position.

**Key Concept: Reference Point**
PE is always measured relative to a reference point. Common choices:
- Ground level ($h = 0$)
- Bottom of a ramp
- Equilibrium position for springs

Only CHANGES in PE matter, so the reference point cancels out!

**Work by Conservative Forces:**
$$W_{conservative} = -\\Delta U = U_i - U_f$$

This is why we define PE with a negative sign in the relationship!

**Example:**
A 2 kg book 3 m above a table:
- PE relative to table: $U = (2)(9.8)(3) = 58.8$ J
- PE relative to floor (table is 1 m high): $U = (2)(9.8)(4) = 78.4$ J

But the CHANGE in PE (book falling to table) is the same: 58.8 J

**Types of PE:**
| Type | Formula | When |
|------|---------|------|
| Gravitational (near Earth) | $mgh$ | Objects at height |
| Gravitational (far) | $-GMm/r$ | Planets, orbits |
| Elastic | $\\frac{1}{2}kx^2$ | Stretched/compressed springs |
| Electric | $kq_1q_2/r$ | Charged particles |`,
        formulas: [
          "U_g = mgh",
          "U_g = -\\frac{GMm}{r}",
          "U_s = \\frac{1}{2}kx^2",
          "W_{conservative} = -\\Delta U"
        ],
        keyPoints: [
          "Gravitational PE near Earth: $U = mgh$",
          "Spring PE: $U = \\frac{1}{2}kx^2$",
          "PE requires a reference point (only changes matter)",
          "Universal gravity: $U = -GMm/r$ (negative!)",
          "Work by conservative force = negative of PE change"
        ],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 5 }
      },
      {
        id: "ch3-t5",
        title: "Conservation of Mechanical Energy",
        content: "When only conservative forces act, total mechanical energy is conserved.",
        explanation: `**Mechanical Energy** is the sum of kinetic and potential energy:
$$E_{mech} = KE + PE = \\frac{1}{2}mv^2 + U$$

**Conservation Principle:**
When ONLY conservative forces do work:
$$E_{initial} = E_{final}$$
$$KE_i + PE_i = KE_f + PE_f$$
$$\\frac{1}{2}mv_i^2 + U_i = \\frac{1}{2}mv_f^2 + U_f$$

**Why Does This Work?**
Conservative forces (gravity, springs) convert PE to KE and back — no energy is lost! The total stays constant.

**When Energy is NOT Conserved:**
If non-conservative forces (friction, air resistance) do work:
$$E_f = E_i + W_{non-conservative}$$

Friction always does negative work, so energy decreases.

**Problem-Solving Strategy:**
1. Identify initial and final states
2. Choose a reference point for PE
3. Write: $KE_i + PE_i = KE_f + PE_f$
4. Substitute known values and solve

**Classic Example: Ball Dropped from Height h**
Initial: $KE_i = 0$, $PE_i = mgh$
Final: $KE_f = \\frac{1}{2}mv^2$, $PE_f = 0$

Energy conservation:
$$mgh = \\frac{1}{2}mv^2$$
$$v = \\sqrt{2gh}$$

Notice: mass cancels! All objects fall at the same speed (ignoring air).

**Roller Coaster Example:**
Starting from rest at height $h_1$, speed at height $h_2$:
$$mgh_1 = \\frac{1}{2}mv^2 + mgh_2$$
$$v = \\sqrt{2g(h_1 - h_2)}$$

Speed depends only on height difference, not the path!`,
        formulas: [
          "E = KE + PE = \\text{constant}",
          "\\frac{1}{2}mv_i^2 + U_i = \\frac{1}{2}mv_f^2 + U_f",
          "v = \\sqrt{2gh} \\text{ (falling from rest)}"
        ],
        keyPoints: [
          "Mechanical energy: $E = KE + PE$",
          "Conservation: $E_i = E_f$ when only conservative forces act",
          "Friction removes mechanical energy (converts to heat)",
          "Speed from falling: $v = \\sqrt{2gh}$ (mass-independent!)",
          "Energy methods avoid needing to find forces and acceleration"
        ],
        pdfRef: { file: "P 1100 - Applications - chap 3.pdf", page: 10 }
      },
      {
        id: "ch3-t6",
        title: "Conservative Forces",
        content: "Forces for which work is path-independent. They can be derived from potential energy.",
        explanation: `**Conservative forces** have a special property: the work they do depends only on starting and ending positions, not the path taken.

**Mathematical Definition:**
A force is conservative if:
$$\\oint \\vec{F} \\cdot d\\vec{r} = 0$$

The work around any closed loop is zero!

**Equivalent Definition:**
A force is conservative if it can be written as:
$$\\vec{F} = -\\nabla U = -\\frac{\\partial U}{\\partial x}\\hat{i} - \\frac{\\partial U}{\\partial y}\\hat{j} - \\frac{\\partial U}{\\partial z}\\hat{k}$$

The force is the negative gradient of a potential energy function.

**Examples of Conservative Forces:**
| Force | Potential Energy |
|-------|-----------------|
| Gravity (near Earth) | $U = mgh$ |
| Gravity (universal) | $U = -GMm/r$ |
| Spring | $U = \\frac{1}{2}kx^2$ |
| Electrostatic | $U = kq_1q_2/r$ |

**Non-Conservative Forces:**
- **Friction** — work DOES depend on path (longer path = more work done by friction)
- **Air resistance** — same reason
- **Applied forces by humans/machines** — usually not conservative

**Why Path-Independence?**
For gravity, climbing a mountain by any route costs the same total energy (ignoring friction). Switchbacks vs straight up — same final PE change!

**Test for Conservative Force:**
In 2D, force $\\vec{F} = F_x\\hat{i} + F_y\\hat{j}$ is conservative if:
$$\\frac{\\partial F_x}{\\partial y} = \\frac{\\partial F_y}{\\partial x}$$

This is the "curl test" — if the curl of $\\vec{F}$ is zero, it's conservative.`,
        formulas: [
          "\\oint \\vec{F} \\cdot d\\vec{r} = 0 \\text{ (path-independent)}",
          "\\vec{F} = -\\nabla U",
          "W_{A \\to B} = U_A - U_B = -\\Delta U"
        ],
        keyPoints: [
          "Conservative = work is path-independent",
          "Work around closed loop = 0",
          "Can define potential energy: $\\vec{F} = -\\nabla U$",
          "Gravity and springs are conservative; friction is NOT",
          "Conservative forces allow energy conservation to work"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph TD
    A[Conservative Force?] --> B{Work path-independent?}
    B -->|Yes| C[Can define PE]
    B -->|No| D[Non-conservative]
    C --> E[Energy conserved]
    D --> F[Energy lost to heat/sound]`,
            caption: "Classifying forces as conservative or non-conservative"
          }
        ],
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
        content: "Momentum is the product of mass and velocity. It measures 'quantity of motion'.",
        explanation: `**Linear Momentum** is a fundamental quantity that measures how much "oomph" a moving object has:

$$\\vec{p} = m\\vec{v}$$

**Key Properties:**
- It's a vector (has direction — same as velocity)
- SI Units: kg·m/s (no special name)
- A fast light object can have the same momentum as a slow heavy one

**Newton's Second Law (Momentum Form):**
$$\\sum\\vec{F} = \\frac{d\\vec{p}}{dt}$$

This is actually Newton's ORIGINAL formulation! The more common $F = ma$ only works when mass is constant.

For constant mass: $\\frac{d\\vec{p}}{dt} = \\frac{d(m\\vec{v})}{dt} = m\\frac{d\\vec{v}}{dt} = m\\vec{a}$

**Why Momentum Matters:**
1. **Collisions**: Momentum is conserved even when forces are complicated
2. **Variable mass**: Works for rockets, conveyor belts, rain drops
3. **Intuition**: A car is harder to stop than a bicycle at the same speed (more momentum)

**Momentum vs Kinetic Energy:**
| Property | Momentum $p = mv$ | Kinetic Energy $KE = \\frac{1}{2}mv^2$ |
|----------|-------------------|-----------------------------------|
| Type | Vector | Scalar |
| Conserved? | Always (isolated system) | Only in elastic collisions |
| Sign | Can be negative | Always positive |

**Example:**
A 1000 kg car at 20 m/s:
$$p = (1000)(20) = 20,000 \\text{ kg·m/s}$$

A 5 kg ball with same momentum would need:
$$v = \\frac{p}{m} = \\frac{20,000}{5} = 4000 \\text{ m/s}$$`,
        formulas: [
          "\\vec{p} = m\\vec{v}",
          "\\sum\\vec{F} = \\frac{d\\vec{p}}{dt}",
          "p = mv \\text{ (magnitude)}"
        ],
        keyPoints: [
          "Momentum: $\\vec{p} = m\\vec{v}$ (vector quantity)",
          "Newton's 2nd Law: $\\sum\\vec{F} = d\\vec{p}/dt$",
          "Units: kg·m/s",
          "Momentum is always conserved in isolated systems",
          "Momentum can be negative; kinetic energy cannot"
        ],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 1 }
      },
      {
        id: "ch4-t2",
        title: "Impulse",
        content: "Impulse is the change in momentum caused by a force over time.",
        explanation: `**Impulse** is the effect of a force acting over time. It equals the change in momentum:

$$\\vec{J} = \\int_{t_1}^{t_2} \\vec{F} \\, dt = \\Delta\\vec{p} = \\vec{p}_f - \\vec{p}_i$$

For **constant force**:
$$\\vec{J} = \\vec{F} \\cdot \\Delta t$$

**Impulse-Momentum Theorem:**
$$\\vec{J} = \\Delta\\vec{p}$$

Impulse equals change in momentum — no matter how complicated the force!

**Units:** Same as momentum: kg·m/s (or equivalently, N·s)

**Why Impulse Is Useful:**
When forces are large and brief (collisions, explosions), we often don't know the exact force, but we CAN measure the momentum change!

**The Impulse Trade-off:**
$$J = F \\cdot \\Delta t = \\text{constant}$$

For the same impulse (same momentum change):
- **Short time → Large force** (hard landing)
- **Long time → Small force** (soft landing)

**Real-World Applications:**

| Situation | Strategy | Effect |
|-----------|----------|--------|
| Airbags | Increase $\\Delta t$ | Decrease force on passenger |
| Catching a ball | "Give" with the catch | Reduce force on hand |
| Boxing gloves | Increase impact time | Reduce force on opponent |
| Bungee jumping | Stretch over time | Reduce jerk |

**Example: Catching a Ball**
A 0.15 kg ball at 20 m/s is caught and stopped.
$$\\Delta p = 0 - (0.15)(20) = -3 \\text{ kg·m/s}$$
$$J = -3 \\text{ kg·m/s}$$

If caught in 0.01 s: $F = \\frac{J}{\\Delta t} = \\frac{3}{0.01} = 300$ N (ouch!)
If caught in 0.1 s: $F = \\frac{3}{0.1} = 30$ N (much better!)`,
        formulas: [
          "\\vec{J} = \\int \\vec{F} \\, dt = \\Delta\\vec{p}",
          "\\vec{J} = \\vec{F}_{avg} \\cdot \\Delta t",
          "F = \\frac{\\Delta p}{\\Delta t}"
        ],
        keyPoints: [
          "Impulse = change in momentum: $\\vec{J} = \\Delta\\vec{p}$",
          "For constant force: $\\vec{J} = \\vec{F} \\cdot \\Delta t$",
          "Same impulse: longer time → smaller force",
          "Airbags, catching softly = increase time, reduce force",
          "Units: kg·m/s = N·s"
        ],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 4 }
      },
      {
        id: "ch4-t3",
        title: "Conservation of Momentum",
        content: "In an isolated system with no external forces, total momentum is conserved.",
        explanation: `**Conservation of Momentum** is one of the most fundamental laws in physics:

$$\\sum \\vec{p}_{initial} = \\sum \\vec{p}_{final}$$

**When Does It Apply?**
When no external forces act (or external forces cancel):
$$\\sum \\vec{F}_{external} = 0 \\implies \\vec{p}_{total} = \\text{constant}$$

**Why It Works:**
From Newton's Third Law, internal forces (between objects in the system) come in equal and opposite pairs. These cancel out when you add momenta of all objects!

**Application to Collisions:**
For two objects colliding:
$$m_1\\vec{v}_{1i} + m_2\\vec{v}_{2i} = m_1\\vec{v}_{1f} + m_2\\vec{v}_{2f}$$

This works for ANY type of collision — elastic, inelastic, explosions!

**1D Collision (Head-on):**
Choose a positive direction, use signs:
$$m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$$

**2D Collision:**
Apply conservation separately to x and y:
$$\\sum p_x = \\text{constant}$$
$$\\sum p_y = \\text{constant}$$

**Examples:**

**Recoil (Explosion):**
A person (60 kg) on ice throws a 5 kg ball at 10 m/s. Person's recoil velocity?

Initial momentum: 0 (both at rest)
$$0 = (60)v_{person} + (5)(10)$$
$$v_{person} = -\\frac{50}{60} = -0.83 \\text{ m/s (backward)}$$

**Important Notes:**
- Momentum is ALWAYS conserved if system is isolated
- Energy is NOT always conserved (inelastic collisions lose KE)
- Momentum is a vector — direction matters!`,
        formulas: [
          "\\sum \\vec{p}_i = \\sum \\vec{p}_f",
          "m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}",
          "\\vec{p}_{total} = \\text{constant when } \\sum\\vec{F}_{ext} = 0"
        ],
        keyPoints: [
          "Momentum conserved when net external force = 0",
          "Total momentum before = total momentum after",
          "Works for ALL collision types (elastic, inelastic)",
          "Vector equation: apply to each direction (x, y) separately",
          "Internal forces don't affect total momentum"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph LR
    A["Before Collision<br/>p₁ᵢ + p₂ᵢ"] -->|"Collision<br/>(internal forces)"| B["After Collision<br/>p₁f + p₂f"]
    C["Total p before"] ===|"EQUAL"| D["Total p after"]`,
            caption: "Conservation of momentum in collisions"
          }
        ],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 6 }
      },
      {
        id: "ch4-t4",
        title: "Center of Mass",
        content: "The center of mass is the average position of mass in a system. It moves as if all mass were concentrated there.",
        explanation: `The **Center of Mass (CM)** is the "balance point" of a system — where you could support it and have it balance perfectly.

**Position of Center of Mass:**
$$\\vec{R}_{cm} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{m_1\\vec{r}_1 + m_2\\vec{r}_2 + ...}{M_{total}}$$

In component form:
$$x_{cm} = \\frac{\\sum m_i x_i}{M}, \\quad y_{cm} = \\frac{\\sum m_i y_i}{M}$$

**Velocity of Center of Mass:**
$$\\vec{V}_{cm} = \\frac{\\sum m_i \\vec{v}_i}{M} = \\frac{\\vec{p}_{total}}{M}$$

**Key Property:**
The total momentum of a system equals the total mass times CM velocity:
$$\\vec{p}_{total} = M\\vec{V}_{cm}$$

**The CM Moves Like a Single Particle:**
Even if parts of a system do complicated things, the CM moves as if:
- All mass is concentrated at the CM
- All external forces act at the CM

$$\\sum \\vec{F}_{ext} = M\\vec{a}_{cm}$$

**Implications:**
1. If $\\sum\\vec{F}_{ext} = 0$: CM moves with constant velocity (or stays still)
2. Even in an explosion, the CM follows the original trajectory!
3. A diver doing flips — her CM follows a parabolic path

**Example: Two masses on a line**
$m_1 = 2$ kg at $x_1 = 0$, $m_2 = 4$ kg at $x_2 = 6$ m:
$$x_{cm} = \\frac{(2)(0) + (4)(6)}{2 + 4} = \\frac{24}{6} = 4 \\text{ m}$$

The CM is closer to the heavier mass!`,
        formulas: [
          "\\vec{R}_{cm} = \\frac{\\sum m_i \\vec{r}_i}{M}",
          "\\vec{V}_{cm} = \\frac{\\sum m_i \\vec{v}_i}{M}",
          "\\vec{p}_{total} = M\\vec{V}_{cm}",
          "\\sum \\vec{F}_{ext} = M\\vec{a}_{cm}"
        ],
        keyPoints: [
          "CM position: $\\vec{R}_{cm} = \\sum m_i\\vec{r}_i / M$",
          "Total momentum: $\\vec{p}_{total} = M\\vec{V}_{cm}$",
          "CM moves as if all mass and all forces concentrated there",
          "If no external forces: CM velocity is constant",
          "CM is always closer to the heavier mass"
        ],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 2 }
      },
      {
        id: "ch4-t5",
        title: "Elastic Collisions",
        content: "Collisions where both momentum AND kinetic energy are conserved.",
        explanation: `In an **elastic collision**, no kinetic energy is lost — objects bounce off perfectly (like ideal billiard balls).

**Conservation Laws for Elastic Collisions:**

1. **Momentum**: $m_1v_{1i} + m_2v_{2i} = m_1v_{1f} + m_2v_{2f}$

2. **Kinetic Energy**: $\\frac{1}{2}m_1v_{1i}^2 + \\frac{1}{2}m_2v_{2i}^2 = \\frac{1}{2}m_1v_{1f}^2 + \\frac{1}{2}m_2v_{2f}^2$

**Coefficient of Restitution:**
$$e = \\frac{|v_{2f} - v_{1f}|}{|v_{1i} - v_{2i}|} = 1$$

For elastic collisions, relative velocity of separation = relative velocity of approach!

**Special Case: Target at Rest ($v_{2i} = 0$)**

Final velocities:
$$v_{1f} = \\frac{m_1 - m_2}{m_1 + m_2}v_{1i}$$
$$v_{2f} = \\frac{2m_1}{m_1 + m_2}v_{1i}$$

**Interesting Cases:**

| Masses | Result |
|--------|--------|
| $m_1 = m_2$ | Object 1 stops, object 2 takes over ($v_{1f}=0$, $v_{2f}=v_{1i}$) |
| $m_1 >> m_2$ | Object 1 barely slowed, object 2 flies away at ~$2v_{1i}$ |
| $m_1 << m_2$ | Object 1 bounces back at ~$-v_{1i}$, object 2 barely moves |

**Newton's Cradle:**
This is why in Newton's cradle, if you lift one ball, one ball swings up on the other side — momentum AND energy are both conserved!

**Note:** True elastic collisions are rare. They occur in:
- Atomic/molecular collisions
- Very hard objects (steel ball bearings)
- Approximately in billiards`,
        formulas: [
          "e = \\frac{|v_{2f} - v_{1f}|}{|v_{1i} - v_{2i}|} = 1",
          "v_{1f} = \\frac{m_1 - m_2}{m_1 + m_2}v_{1i}",
          "v_{2f} = \\frac{2m_1}{m_1 + m_2}v_{1i}"
        ],
        keyPoints: [
          "Elastic: both momentum AND kinetic energy conserved",
          "Coefficient of restitution $e = 1$",
          "Equal masses: objects exchange velocities",
          "Heavy hits light: light object gains ~2× incoming speed",
          "Light hits heavy: light object bounces back"
        ],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 7 }
      },
      {
        id: "ch4-t6",
        title: "Inelastic Collisions",
        content: "Collisions where kinetic energy is lost. Momentum is still conserved.",
        explanation: `In **inelastic collisions**, some kinetic energy is converted to other forms (heat, sound, deformation). Momentum is STILL conserved!

**Coefficient of Restitution:**
$$e = \\frac{|v_{2f} - v_{1f}|}{|v_{1i} - v_{2i}|}$$

- $e = 1$: Perfectly elastic
- $0 < e < 1$: Partially inelastic (most real collisions)
- $e = 0$: Perfectly inelastic (objects stick together)

**Perfectly Inelastic Collision (objects stick):**
$$m_1v_{1i} + m_2v_{2i} = (m_1 + m_2)v_f$$
$$v_f = \\frac{m_1v_{1i} + m_2v_{2i}}{m_1 + m_2}$$

This is the CM velocity! In a perfectly inelastic collision, both objects move together at the CM velocity.

**Energy Lost:**
$$\\Delta KE = KE_f - KE_i$$

This energy goes to:
- Deformation (crumpling cars)
- Heat (surfaces warm up)
- Sound (the "thud")
- Internal energy

**Maximum Energy Loss:**
Perfectly inelastic collisions lose the MOST kinetic energy (while still conserving momentum).

**Example: Ballistic Pendulum**
A bullet ($m$) embeds in a block ($M$), which swings up to height $h$.

1. Collision (momentum conservation):
$$mv_0 = (m + M)v_{after}$$

2. Swing (energy conservation):
$$\\frac{1}{2}(m + M)v_{after}^2 = (m + M)gh$$

Solving: $v_0 = \\frac{m + M}{m}\\sqrt{2gh}$

This measures bullet speed from the height reached!`,
        formulas: [
          "e = \\frac{|v_{2f} - v_{1f}|}{|v_{1i} - v_{2i}|}",
          "v_f = \\frac{m_1 v_{1i} + m_2 v_{2i}}{m_1 + m_2} \\text{ (perfectly inelastic)}",
          "0 \\leq e \\leq 1"
        ],
        keyPoints: [
          "Inelastic: momentum conserved, KE NOT conserved",
          "Coefficient of restitution: $0 \\leq e \\leq 1$",
          "Perfectly inelastic ($e=0$): objects stick, maximum KE loss",
          "Lost KE → heat, sound, deformation",
          "Ballistic pendulum: use momentum for collision, energy for swing"
        ],
        diagrams: [
          {
            type: "mermaid",
            content: `graph TD
    A[Collision Type] --> B{Coefficient e}
    B -->|e = 1| C[Elastic<br/>KE conserved]
    B -->|0 < e < 1| D[Partially Inelastic<br/>Some KE lost]
    B -->|e = 0| E[Perfectly Inelastic<br/>Objects stick<br/>Max KE lost]`,
            caption: "Classification of collisions by coefficient of restitution"
          }
        ],
        pdfRef: { file: "P 1100 - Applications - chap 4.pdf", page: 7 }
      },
      {
        id: "ch4-t7",
        title: "Angular Momentum",
        content: "Rotational analog of linear momentum. Conserved when no external torque acts.",
        explanation: `**Angular Momentum** is the rotational equivalent of linear momentum:

$$\\vec{L} = \\vec{r} \\times \\vec{p} = \\vec{r} \\times m\\vec{v}$$

For a particle moving in a circle of radius $r$:
$$L = mvr \\sin\\theta$$

where $\\theta$ is the angle between $\\vec{r}$ and $\\vec{v}$.

**Magnitude (for circular motion):**
$$L = mvr = mr^2\\omega$$

**Torque and Angular Momentum:**
$$\\vec{\\tau} = \\frac{d\\vec{L}}{dt}$$

This is the rotational version of $\\vec{F} = d\\vec{p}/dt$!

**Conservation of Angular Momentum:**
When no external torque acts:
$$\\vec{L} = \\text{constant}$$

**For Central Forces (like gravity):**
Force always points toward center → Torque = 0 → Angular momentum conserved!

This is why:
- Planets speed up when closer to the sun (Kepler's 2nd Law)
- A spinning figure skater spins faster when pulling in arms

**Kepler's 2nd Law Explained:**
$$L = mvr = \\text{constant}$$

When $r$ decreases, $v$ must increase to keep $L$ constant!

**Example: Ice Skater**
Skater with arms out: $I_1 = 3$ kg·m², $\\omega_1 = 2$ rad/s
Arms pulled in: $I_2 = 1$ kg·m²

$$L = I_1\\omega_1 = I_2\\omega_2$$
$$\\omega_2 = \\frac{I_1}{I_2}\\omega_1 = \\frac{3}{1}(2) = 6 \\text{ rad/s}$$

Spins 3× faster!`,
        formulas: [
          "\\vec{L} = \\vec{r} \\times m\\vec{v}",
          "L = mvr\\sin\\theta",
          "\\vec{\\tau} = \\frac{d\\vec{L}}{dt}",
          "\\vec{L} = \\text{constant when } \\vec{\\tau}_{ext} = 0"
        ],
        keyPoints: [
          "Angular momentum: $\\vec{L} = \\vec{r} \\times m\\vec{v}$",
          "Torque: $\\vec{\\tau} = d\\vec{L}/dt$",
          "Conserved when no external torque",
          "Central forces (gravity) conserve angular momentum",
          "Pulling arms in → smaller $r$ → faster spin"
        ],
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
        content: "Moment of inertia measures how hard it is to rotate an object. For point masses: $I = \\sum m_i r_i^2$. For continuous body: $I = \\int r^2 \\, dm$. The parallel axis theorem relates moment of inertia about any axis to that about the center of mass: $I = I_{cm} + Md^2$.",
        explanation: "Think of moment of inertia as 'rotational mass' - it tells you how hard it is to start or stop something spinning. Just like heavier objects are harder to push (more mass), objects with mass spread far from the rotation axis are harder to spin (more moment of inertia).\n\nImagine a figure skater with arms out vs arms in. Arms out = more moment of inertia = harder to spin. The formula $I = \\sum m_i r_i^2$ shows why: it's the sum of each piece of mass times the SQUARE of its distance from the axis. Distance matters a lot!\n\nThe parallel axis theorem is super useful: if you know the moment of inertia about the center of mass, you can find it about any parallel axis just by adding $Md^2$ where $d$ is how far the new axis is from the center.",
        keyPoints: [
          "$I = \\sum m_i r_i^2$ - sum over all point masses",
          "$I = \\int r^2 \\, dm$ - for continuous objects",
          "Parallel axis: $I = I_{cm} + Md^2$",
          "Units: $\\text{kg} \\cdot \\text{m}^2$",
          "Common shapes: rod about center $I = \\frac{1}{12}ML^2$, solid sphere $I = \\frac{2}{5}MR^2$, solid disk $I = \\frac{1}{2}MR^2$"
        ],
        formulas: [
          "$I = \\sum m_i r_i^2$",
          "$I = \\int r^2 \\, dm$",
          "$I = I_{cm} + Md^2$"
        ],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 1 }
      },
      {
        id: "ch5-t2",
        title: "Rotational Kinetic Energy",
        content: "Rotational kinetic energy is $KE_{rot} = \\frac{1}{2}I\\omega^2$. For rolling objects, total kinetic energy combines translation and rotation: $KE_{total} = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$.",
        explanation: "Just like moving objects have kinetic energy $\\frac{1}{2}mv^2$, spinning objects have rotational kinetic energy $\\frac{1}{2}I\\omega^2$. Notice how similar they are - replace mass $m$ with moment of inertia $I$, and velocity $v$ with angular velocity $\\omega$!\n\nWhen something rolls (like a ball or wheel), it does BOTH - it moves forward AND spins. So it has both kinds of kinetic energy added together. This is why rolling objects are 'slower' going down a hill than sliding ones - some of the potential energy goes into spinning, not just moving forward.\n\nFor pure rolling where $v = \\omega r$, we can write $KE_{total} = \\frac{1}{2}mv^2\\left(1 + \\frac{I}{mr^2}\\right)$. The factor in parentheses is always bigger than 1, showing rolling objects have more KE than sliding ones at the same speed.",
        keyPoints: [
          "Rotational KE: $KE_{rot} = \\frac{1}{2}I\\omega^2$",
          "Total rolling KE: $KE = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$",
          "Analogy: $I$ replaces $m$, $\\omega$ replaces $v$",
          "Rolling objects have both translational and rotational KE"
        ],
        formulas: [
          "$KE_{rot} = \\frac{1}{2}I\\omega^2$",
          "$KE_{total} = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$",
          "$KE_{rolling} = \\frac{1}{2}mv^2\\left(1 + \\frac{I}{mr^2}\\right)$"
        ],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 1 }
      },
      {
        id: "ch5-t3",
        title: "Torque and Angular Acceleration",
        content: "Torque is the rotational equivalent of force: $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$ with magnitude $\\tau = rF\\sin\\theta$. Newton's 2nd law for rotation: $\\sum\\tau = I\\alpha$ where $\\alpha = \\frac{d\\omega}{dt}$ is angular acceleration.",
        explanation: "Torque is what makes things spin - it's like a 'twisting force'. When you push a door, you're applying torque to make it rotate around its hinges.\n\nThe torque formula $\\tau = rF\\sin\\theta$ has three parts: how far from the axis you push ($r$), how hard you push ($F$), and the angle you push at ($\\theta$). Pushing perpendicular to the door (so $\\sin\\theta = 1$) gives maximum torque. Pushing toward the hinge gives zero torque!\n\nNewton's 2nd law for rotation $\\sum\\tau = I\\alpha$ is just like $\\sum F = ma$: net torque causes angular acceleration. More moment of inertia means you need more torque to get the same angular acceleration - just like more mass needs more force for the same linear acceleration.",
        keyPoints: [
          "Torque: $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$, magnitude $\\tau = rF\\sin\\theta$",
          "Angular acceleration: $\\alpha = \\frac{d\\omega}{dt}$",
          "Rotational Newton's 2nd law: $\\sum\\tau = I\\alpha$",
          "Maximum torque when force is perpendicular to $\\vec{r}$",
          "Units: $\\tau$ in $\\text{N}\\cdot\\text{m}$, $\\alpha$ in $\\text{rad/s}^2$"
        ],
        formulas: [
          "$\\vec{\\tau} = \\vec{r} \\times \\vec{F}$",
          "$\\tau = rF\\sin\\theta$",
          "$\\sum\\tau = I\\alpha$",
          "$\\alpha = \\frac{d\\omega}{dt}$"
        ],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 2 }
      },
      {
        id: "ch5-t4",
        title: "Conservation of Angular Momentum",
        content: "Angular momentum $L = I\\omega$. When net external torque is zero ($\\sum\\tau_{ext} = 0$), angular momentum is conserved: $L_i = L_f$ or $I_1\\omega_1 = I_2\\omega_2$.",
        explanation: "Angular momentum is the rotational version of linear momentum. Just like a moving object wants to keep moving (momentum $p = mv$), a spinning object wants to keep spinning (angular momentum $L = I\\omega$).\n\nConservation of angular momentum is why figure skaters spin faster when they pull their arms in! When they bring arms in, moment of inertia $I$ decreases. Since $L = I\\omega$ must stay constant, if $I$ goes down, $\\omega$ must go up to compensate. They spin faster!\n\nThis only works when there's no external torque. The skater's internal muscles don't count as external - they just rearrange where mass is located. But friction with the ice would be external and would slowly decrease $L$.",
        keyPoints: [
          "Angular momentum: $L = I\\omega$",
          "Conservation: $I_1\\omega_1 = I_2\\omega_2$ when $\\sum\\tau_{ext} = 0$",
          "If $I$ decreases, $\\omega$ increases (and vice versa)",
          "Like linear momentum conservation but for rotation",
          "Examples: figure skater, diving, planetary orbits"
        ],
        formulas: [
          "$L = I\\omega$",
          "$I_1\\omega_1 = I_2\\omega_2$",
          "$\\sum\\tau_{ext} = 0 \\Rightarrow L = \\text{constant}$"
        ],
        pdfRef: { file: "P1100 - Tutorial Chap 5 - Given.pdf", page: 1 }
      },
      {
        id: "ch5-t5",
        title: "Rolling Motion",
        content: "For pure rolling (no slipping): $v = \\omega r$ and $a = \\alpha r$. For rolling down an incline: $a = \\frac{g\\sin\\theta}{1 + I/(mr^2)}$. The point of contact has zero velocity.",
        explanation: "Rolling is a combination of translating (moving forward) and rotating (spinning). For 'pure' rolling without slipping, these two motions are perfectly linked by $v = \\omega r$.\n\nImagine a wheel rolling. The bottom of the wheel (touching the ground) is momentarily not moving! This is because its backward rotation exactly cancels its forward translation. The center moves at speed $v$, and the top moves at $2v$ (forward motion plus rotation both in same direction).\n\nWhen rolling down a hill, the acceleration formula $a = \\frac{g\\sin\\theta}{1 + I/(mr^2)}$ shows that objects with larger $I/(mr^2)$ roll slower. A hollow sphere ($I = \\frac{2}{3}mr^2$) rolls slower than a solid sphere ($I = \\frac{2}{5}mr^2$). The solid ball reaches the bottom first!",
        keyPoints: [
          "Rolling condition: $v = \\omega r$, $a = \\alpha r$",
          "Bottom of wheel has zero velocity",
          "Top of wheel moves at $2v$",
          "Incline acceleration: $a = \\frac{g\\sin\\theta}{1 + I/(mr^2)}$",
          "Solid sphere beats hollow sphere in a race down a hill"
        ],
        formulas: [
          "$v = \\omega r$",
          "$a = \\alpha r$",
          "$a = \\frac{g\\sin\\theta}{1 + I/(mr^2)}$"
        ],
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
  { id: "fc3", front: "Scalar product formula?", back: "$\\vec{A} \\cdot \\vec{B} = |A||B|\\cos\\theta = A_xB_x + A_yB_y + A_zB_z$", chapter: "chapter0" },
  { id: "fc4", front: "Cross product magnitude?", back: "$|\\vec{A} \\times \\vec{B}| = |A||B|\\sin\\theta$", chapter: "chapter0" },
  
  // Chapter 1
  { id: "fc5", front: "Position vector in Cartesian?", back: "$\\vec{r}(t) = x(t)\\hat{i} + y(t)\\hat{j} + z(t)\\hat{k}$", chapter: "chapter1" },
  { id: "fc6", front: "How to get velocity from position?", back: "$\\vec{v} = \\frac{d\\vec{r}}{dt}$ (differentiate position)", chapter: "chapter1" },
  { id: "fc7", front: "Maximum height in projectile motion?", back: "$h = \\frac{v_0^2\\sin^2\\theta}{2g}$", chapter: "chapter1" },
  { id: "fc8", front: "Range in projectile motion?", back: "$R = \\frac{v_0^2\\sin(2\\theta)}{g}$ (maximum at $\\theta = 45°$)", chapter: "chapter1" },
  { id: "fc9", front: "Centripetal acceleration?", back: "$a_n = \\frac{v^2}{r} = \\omega^2 r$ (always toward center)", chapter: "chapter1" },
  { id: "fc10", front: "Tangential acceleration?", back: "$a_t = \\frac{dv}{dt} = \\alpha r$ (changes speed, not direction)", chapter: "chapter1" },
  
  // Chapter 2
  { id: "fc11", front: "Newton's First Law?", back: "An object at rest stays at rest, and moving objects continue in straight line unless acted upon by external force.", chapter: "chapter2" },
  { id: "fc12", front: "Newton's Second Law?", back: "$\\sum\\vec{F} = m\\vec{a}$", chapter: "chapter2" },
  { id: "fc13", front: "Newton's Third Law?", back: "For every action, there is an equal and opposite reaction. $\\vec{F}_{AB} = -\\vec{F}_{BA}$", chapter: "chapter2" },
  { id: "fc14", front: "Static friction formula?", back: "$f_s \\leq \\mu_s N$ (maximum: $f_{s,max} = \\mu_s N$)", chapter: "chapter2" },
  { id: "fc15", front: "Kinetic friction formula?", back: "$f_k = \\mu_k N$ (where $\\mu_k < \\mu_s$)", chapter: "chapter2" },
  { id: "fc16", front: "Universal gravitation?", back: "$F = \\frac{GMm}{r^2}$", chapter: "chapter2" },
  { id: "fc17", front: "Orbital velocity?", back: "$v = \\sqrt{\\frac{GM}{r}}$", chapter: "chapter2" },
  { id: "fc18", front: "Escape velocity?", back: "$v_e = \\sqrt{\\frac{2GM}{R}}$", chapter: "chapter2" },
  
  // Chapter 3
  { id: "fc19", front: "Work formula?", back: "$W = \\int\\vec{F} \\cdot d\\vec{r}$ or $W = Fd\\cos\\theta$ (constant force)", chapter: "chapter3" },
  { id: "fc20", front: "Kinetic energy?", back: "$KE = \\frac{1}{2}mv^2$", chapter: "chapter3" },
  { id: "fc21", front: "Work-Energy Theorem?", back: "$\\sum W = \\Delta KE = \\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2$", chapter: "chapter3" },
  { id: "fc22", front: "Gravitational PE?", back: "$U = mgh$ (near Earth) or $U = -\\frac{GMm}{r}$", chapter: "chapter3" },
  { id: "fc23", front: "Spring PE?", back: "$U = \\frac{1}{2}kx^2$", chapter: "chapter3" },
  { id: "fc24", front: "Conservation of mechanical energy?", back: "$KE_1 + PE_1 = KE_2 + PE_2$ (when only conservative forces act)", chapter: "chapter3" },
  
  // Chapter 4
  { id: "fc25", front: "Linear momentum?", back: "$\\vec{p} = m\\vec{v}$", chapter: "chapter4" },
  { id: "fc26", front: "Impulse-Momentum Theorem?", back: "$\\vec{J} = \\Delta\\vec{p} = \\int\\vec{F}\\,dt$", chapter: "chapter4" },
  { id: "fc27", front: "Conservation of momentum?", back: "$\\sum\\vec{p}_i = \\sum\\vec{p}_f$ (for isolated systems)", chapter: "chapter4" },
  { id: "fc28", front: "Coefficient of restitution?", back: "$e = \\frac{|v_2' - v_1'|}{|v_2 - v_1|}$. $e=1$ elastic, $e=0$ perfectly inelastic", chapter: "chapter4" },
  { id: "fc29", front: "Center of mass?", back: "$\\vec{R}_{cm} = \\frac{\\sum m_i\\vec{r}_i}{\\sum m_i}$", chapter: "chapter4" },
  
  // Chapter 5
  { id: "fc30", front: "Moment of inertia?", back: "$I = \\sum m_i r_i^2$ or $I = \\int r^2 \\, dm$", chapter: "chapter5" },
  { id: "fc31", front: "Parallel axis theorem?", back: "$I = I_{cm} + Md^2$", chapter: "chapter5" },
  { id: "fc32", front: "Rotational kinetic energy?", back: "$KE_{rot} = \\frac{1}{2}I\\omega^2$", chapter: "chapter5" },
  { id: "fc33", front: "Rotational Newton's 2nd Law?", back: "$\\sum\\tau = I\\alpha$", chapter: "chapter5" },
  { id: "fc34", front: "Conservation of angular momentum?", back: "$I_1\\omega_1 = I_2\\omega_2$ (when $\\sum\\tau_{ext} = 0$)", chapter: "chapter5" },
  { id: "fc35", front: "Rolling condition?", back: "$v = \\omega r$ (pure rolling, no slipping)", chapter: "chapter5" }
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
