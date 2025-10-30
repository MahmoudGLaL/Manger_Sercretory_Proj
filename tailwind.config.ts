// import { Image } from 'next/image';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      } ,
      
      keyframes: {
        swal2show: {
          '0%': { transform: 'scale(0.7)' },
          '45%': { transform: 'scale(1.05)' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        custBounce1: {
          '0%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
          '25%': { transform: 'translateY(-2px) ', backgroundColor: '#3b82f6' },
          '50%': { transform: 'translateY(-3px) ', backgroundColor: '#2563eb' },
          '100%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
        },
        custBounce2: {
          '0%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
          '25%': { transform: 'translateY(-4px) ', backgroundColor: '#3b82f6' },
          '50%': { transform: 'translateY(-5px) ', backgroundColor: '#2563eb' },
          '100%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
        },
        custBounce3: {
          '0%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
          '25%': { transform: 'translateY(-6px) ', backgroundColor: '#3b82f6' },
          '50%': { transform: 'translateY(-7px) ', backgroundColor: '#2563eb' },
          '100%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
        },
        
        custBounce4: {
          '0%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
          '25%': { transform: 'translateY(-2px) ', backgroundColor: '#ccc' },
          '50%': { transform: 'translateY(-3px) ', backgroundColor: '#000' },
          '100%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
        },
        custBounce5: {
          '0%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
          '25%': { transform: 'translateY(-4px) ', backgroundColor: '#ccc' },
          '50%': { transform: 'translateY(-5px) ', backgroundColor: '#000' },
          '100%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
        },
        custBounce6: {
          '0%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
          '25%': { transform: 'translateY(-6px) ', backgroundColor: '#ccc' },
          '50%': { transform: 'translateY(-7px) ', backgroundColor: '#000' },
          '100%': { transform: 'translateY(0) ', backgroundColor: '#ffff' },
        },

       
        swal2hide: {
          '0%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(0.95)' },
          '80%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(0.7)' },
        },  

        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        float: {
          '0%': { transform: 'translateY(25%)' ,  opacity: '0'},
          '25%': { transform: 'translateY(20%)' ,  opacity: '30'  },
          '75%': { transform: 'translateY(10%)' , opacity: '65'  },
          '100%': { transform: 'translateY(0%)' ,  opacity: '100' },
        },

        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        upload: {
          '0%': { width: '8%' },
          '25%': { width: '25%' },
          '75%': { width: '75%' },
          '100%': { width: '105%' },
        },
        moveDots: {
          "0%": { transform: "translateX(-100px)" },
          "50%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(100px)" },
        }


        
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite',
        scaleUp: 'scaleUp 0.5s ease-in-out forwards',
        fade: 'fade 0.5s ease-in-out forwards',
        typing: 'typing 3s steps(30, end) forwards, blink .75s step-end infinite',
        fadeIn: 'fadeIn 3s ease-in-out forwards',
        bounce: 'bounce 2s infinite',
        custBounce1: 'custBounce1 2s infinite',
        custBounce2: 'custBounce2 2s infinite',
        custBounce3: 'custBounce3 2s infinite',
        custBounce4: 'custBounce4 2.5s infinite',
        custBounce5: 'custBounce5 2.6s infinite',
        custBounce6: 'custBounce6 2.7s infinite',
        upload : 'upload 5s ease-in-out forwards ',
        move1: "moveDots 1.5s ease-in-out infinite",
        move2: "moveDots 1.5s ease-in-out 0.2s infinite",
        move3: "moveDots 1.5s ease-in-out 0.4s infinite",
      },
    
      boxShadow: {
        'custom': '0 4px 10px rgba(0, 0, 255, 0.3)',
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main : "#00346a" ,
        darkBlue : "#00346A" ,
      },
    },
  },
  plugins: [],
};
export default config;
