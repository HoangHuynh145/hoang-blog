/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "slate-650": "rgb(57, 72, 85)",
        "lime-150": "rgb(230, 244, 241)",
        "slate-full": "rgb(11, 17, 33)"
      },
      backgroundColor: {
        "slate-full": "rgb(11, 17, 33)"
      },
      scrollbar: {
        width: '8px',
      },
      maxWidth: {
        "8xl": "90rem"
      },
      animation: {
        "hide-then-show": "opacityAnimated 1s linear forwards",
        "bottom-to-center": "float-bottom-top 400ms ease forwards",
        'loader': 'spin 0.5s infinite linear'
      },
      keyframes: {
        "opacityAnimated": {
          "0%": { opacity: 0 },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
        "float-bottom-top": {
          "0%": { transform: "translateY(200px)", opacity: 0 },
          "100%": { trasform: "translateY(0)", opacity: 1 }
        },
        'spin': {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        }
      },
      transitionProperty: {
        "width": "width"
      },
      typography: (theme) => ({
        // Default theme
        DEFAULT: {
          css: {
            maxWidth: 'none',

            a: {
              borderBottom: '0.8px solid #38bdf8',
              fontWeight: '600',
              textDecoration: 'none',
              '&:hover': {
                borderBottomWidth: '2px'
              }
            },

            h1: {
              fontSize: '30px'
            },

            img: {
              width: '100%',
              height: 'auto',
              borderRadius: '16px'
            },

            ul: {
              listStyleType: 'none',
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '0'
            },

            li: {
              paddingLeft: '1.75em !IMPORTANT',
              position: 'relative',
            },

            'li::before': {
              content: "''",
              width: '.75em',
              height: '.125em',
              position: 'absolute',
              backgroundColor: '#cbd5e1',
              top: 'calc(.875em - .0625em)',
              left: '0',
              borderRadius: '999px'
            },

            pre: {
              borderRadius: '0 !IMPORTANT',
              margin: '0 !IMPORTANT'
            },

            'pre::-webkit-scrollbar': {
              height: '8px'
            },

            'pre::-webkit-scrollbar-thumb': {
              borderRadius: '8px',
              backgroundColor: theme('colors.slate.600')
            },

            code: {
              fontSize: '.875em',
              fontVariantLigatures: 'none'
            },
          }
        },

        // Dark theme
        dark: {
          css: {
            color: theme('colors.slate.400'),

            a: {
              color: theme('colors.white'),
            },

            h1: {
              color: theme('colors.slate.200'),
              fontWeight: '800',
            },

            h2: {
              color: theme('colors.slate.200'),
              fontWeight: '700',
              fontSize: '1.5em',
              marginBottom: '.6666666666666666em',
              lineHeight: '1.3333333'
            },

            h3: {
              color: theme('colors.slate.200')
            },

            hr: {
              borderTopWidth: '1px',
              borderColor: theme('colors.slate.400'),
              marginTop: '3em',
              marginBottom: '3em',
              opacity: '.1'
            },

            code: {
              color: '#e2e8f0',
            },
          },
        },
      }),
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    }
  },
  darkMode: "class",
  variant: {
    extend: {
      textColor: 'dark',
      backGroundColor: 'dark',
      display: ['group-focus'],
    }
  },
  dark: 'class',
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
