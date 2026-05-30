---
name: Nexus Arena
colors:
  surface: '#1c1011'
  surface-dim: '#1c1011'
  surface-bright: '#453537'
  surface-container-lowest: '#170b0c'
  surface-container-low: '#251819'
  surface-container: '#2a1c1d'
  surface-container-high: '#352628'
  surface-container-highest: '#403132'
  on-surface: '#f5ddde'
  on-surface-variant: '#e0bec1'
  inverse-surface: '#f5ddde'
  inverse-on-surface: '#3c2d2e'
  outline: '#a7898c'
  outline-variant: '#584143'
  surface-tint: '#ffb2ba'
  primary: '#ffb2ba'
  on-primary: '#670020'
  primary-container: '#f55a77'
  on-primary-container: '#5a001b'
  inverse-primary: '#b12648'
  secondary: '#55d6f5'
  on-secondary: '#003641'
  secondary-container: '#00aac7'
  on-secondary-container: '#003944'
  tertiary: '#9bcaff'
  on-tertiary: '#003256'
  tertiary-container: '#1e96ed'
  on-tertiary-container: '#002c4b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd9dc'
  primary-fixed-dim: '#ffb2ba'
  on-primary-fixed: '#400011'
  on-primary-fixed-variant: '#900532'
  secondary-fixed: '#adecff'
  secondary-fixed-dim: '#55d6f5'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5d'
  tertiary-fixed: '#d0e4ff'
  tertiary-fixed-dim: '#9bcaff'
  on-tertiary-fixed: '#001d35'
  on-tertiary-fixed-variant: '#004a7a'
  background: '#1c1011'
  on-background: '#f5ddde'
  surface-variant: '#403132'
typography:
  display-xl:
    fontFamily: sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-lg:
    fontFamily: sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: sora
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

The design system embodies the high-stakes, high-octane energy of a premium esports destination. It targets an audience that values exclusivity, competitive excellence, and cutting-edge technology. The emotional response is one of immersion, prestige, and adrenaline.

The aesthetic is **Cinematic Futurism**. It blends the structural precision of high-end technology with the atmospheric depth of a premium entertainment lounge. The interface utilizes a **Dark Mode** foundation to create a "theater-light" effect, allowing content and neon accents to pop with maximum visual impact. Elements of **Glassmorphism** are used to imply depth and sophisticated hardware, while vibrant glows and sharp geometry reinforce the "Nexus" theme—a convergence of physical and digital worlds.

## Colors

The palette is anchored in a deep, absolute black (`#070600`) to evoke the premium atmosphere of a luxury arena. 

- **Primary (Vibrant Pink/Red):** Used for critical actions, highlights, and "Hero" branding elements. It represents the intensity of competition.
- **Secondary & Tertiary (Sky/Bright Blue):** These colors represent the "technological" side of the arena, used for data visualizations, secondary navigation, and interactive states to provide a cool contrast to the primary heat.
- **Neutral (Ghost White):** Reserved for high-readability text and icons, ensuring accessibility against the dark backgrounds.

Apply colors with a "light-emissive" logic: borders and icons should often appear as if they are backlit or neon-infused, using subtle outer glows of the primary and secondary hues.

## Typography

The typographic hierarchy prioritizes technical precision and cinematic scale. 

- **Headlines (Sora):** A geometric sans-serif with a futuristic, wide stance. Used for high-level branding and impactful section headers.
- **Body (Inter):** Chosen for its exceptional clarity and neutral tone, ensuring that long-form information and interface details are easily digestible.
- **Labels (JetBrains Mono):** This monospaced font is used for metadata, status indicators, and small UI details to reinforce the "tech-driven" nature of the esports environment.

Large display type should utilize tight letter-spacing for a modern, aggressive look, while labels should be tracked out slightly to maintain legibility in all-caps.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width for desktop to maintain a cinematic feel. 

- **Desktop:** 12-column grid with generous 64px outer margins to allow the UI to "breathe" like a premium dashboard.
- **Mobile:** 4-column grid with 16px margins, focusing on vertical scrolling and full-bleed imagery.
- **Spacing Rhythm:** Based on an 8px base unit. Use larger increments (48px, 64px, 80px) between major sections to emphasize the "Luxury" aspect through whitespace (or rather, "blackspace").

Elements should feel architecturally aligned, with components often spanning specific column groups (e.g., sidebars occupying 3 columns, main content 9).

## Elevation & Depth

Depth in the design system is achieved through **Tonal Layering** and **Glassmorphism**, rather than traditional drop shadows.

1.  **Base Layer:** The absolute black (`#070600`) floor.
2.  **Surface Layer:** A slightly elevated dark grey (`#121212`) for cards and containers.
3.  **Glass Layer:** Semi-transparent panels (10-20% opacity) with a 20px backdrop blur. These should have a subtle 1px border using a low-opacity Ghost White or a tinted primary color to define the edges.
4.  **Emissive Depth:** Instead of shadows, use "Bloom" or inner-glows. High-priority elements (like active tournament cards) should have a soft, 15px-30px blurred outer glow in the Primary or Secondary accent colors to simulate light emission.

## Shapes

The shape language is **Soft (0.25rem)**, leaning towards a technical, "machined" appearance. 

- **Standard Elements:** Buttons and small input fields use a 4px (0.25rem) radius for a sharp, precise look.
- **Large Containers:** Cards and modals may use up to 8px (0.5rem) to soften the overall interface slightly and feel more "premium."
- **Interactive Accents:** Use "chamfered" corners (angled cuts) on decorative elements or specific CTA buttons to further the futuristic/sci-fi aesthetic.

## Components

- **Buttons:** Primary buttons use a solid Primary Color fill with white text. Secondary buttons are "Ghost" style with a 1px Primary or Secondary border and a subtle glow on hover.
- **Input Fields:** Dark backgrounds with a 1px border. When focused, the border glows with the Secondary Blue color.
- **Cards:** Utilize the Glassmorphism style. Background-blur is essential. Imagery within cards should have a slight dark gradient overlay at the bottom to ensure text readability.
- **Chips/Badges:** Use JetBrains Mono. Use subtle background tints of the accent colors (e.g., 10% Primary Pink for a "Live" tag) with a high-contrast border.
- **Interactive Lists:** Items should have a hover state that slightly increases the background opacity and triggers a left-side "accent bar" using the Primary color.
- **Neon Dividers:** Instead of flat lines, use 1px gradients that fade out at the ends, mimicking a light tube.
- **Leaderboards:** High-contrast rows with the top 3 ranks utilizing the Primary, Secondary, and Tertiary colors as accent glows.