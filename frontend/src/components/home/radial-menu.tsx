'use client';

import { Activity, Archive, Construction, Library, ListTodo, LogIn, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useProfileQuery } from '../../hooks/useAuth';
import { RoundedButton } from './routedButton/routedButton';

export const RadialMenu = () => {
  const { data: user, isPending, error } = useProfileQuery();
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  const handleChangeVisibleLine = () => {
    if (user) {
      setAnimate(true);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <div className="relative">
        <svg viewBox="0 0 200 200" className="w-3xl h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient
              id="ringGradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="200"
              y2="200"
            >
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient
              id="centerGradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="200"
              y2="200"
            >
              <stop offset="0%" stopColor="#4b4453" />
              <stop offset="100%" stopColor="#172852" />
            </linearGradient>
          </defs>

          <g
            className="transition-all active:scale-95 hover:opacity-80 origin-center"
            onClick={handleChangeVisibleLine}
          >
            <circle
              cx="100"
              cy="100"
              r="12"
              fill="url(#centerGradient)"
              className="cursor-pointer  border border-b-white"
            />
            {user ? (
              <text
                x="100"
                y="100"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="5"
                className="fill-white font-medium font-jakarta uppercase cursor-pointer text-center"
              >
                Enter
              </text>
            ) : (
              <foreignObject x="93" y="94" width="12" height="12">
                <div className="flex items-center justify-center w-full h-full text-white cursor-pointer">
                  <LogIn size={12} strokeWidth={2.5} />
                </div>
              </foreignObject>
            )}
          </g>

          {/* Зовнішній круг */}
          <circle
            cx="100"
            cy="100"
            r="24"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Внутрішній круг */}
          <circle
            cx="100"
            cy="100"
            r="18"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="2"
            opacity="0.8"
            filter="url(#glow)"
          />
          {/* Пунктирний круг */}
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="0.5"
            strokeDasharray="2 3"
            opacity="0.4"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="12s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="0.5"
            opacity="0.4"
          />

          <path
            d="M130 73C150 55 149 56 150 56L175 56"
            className={`progress-path ${animate ? 'animate-loading' : ''}`}
          />
          <path
            d="M130 127C150 144 149 143 150 143L175 143"
            className={`progress-path ${animate ? 'animate-loading' : ''}`}
          />
          <path
            d="M70 73C50 55 51 56 50 56L25 56"
            className={`progress-path ${animate ? 'animate-loading' : ''}`}
          />
          <path
            d="M70 127C50 144 51 143 50 143L25 143"
            className={`progress-path ${animate ? 'animate-loading' : ''}`}
          />
          <path
            d="M140 100 195 100"
            className={`progress-path ${animate ? 'animate-loading' : ''}`}
          />
          <path d="M60 100 6 100" className={`progress-path ${animate ? 'animate-loading' : ''}`} />
        </svg>

        <RoundedButton
          items={{ image: <Settings width={24} height={24} />, title: 'Settings' }}
          className={`top-47 -left-21.5 ${animate ? 'opacity-50 ' : 'opacity-0 pointer-events-none'}`}
          route="/settings"
        />

        <RoundedButton
          items={{ image: <Library width={24} height={24} />, title: 'Library' }}
          className={`top-89 -left-39.5 ${animate ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
          route="/library"
        />

        <RoundedButton
          items={{ image: <Activity width={24} height={24} />, title: 'Activity' }}
          className={`top-130 -left-21.5 ${animate ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
          route="/activity"
        />

        <RoundedButton
          items={{ image: <ListTodo width={24} height={24} />, title: 'Todo List' }}
          className={`top-47 -right-21.5 ${animate ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
          route="/todos"
        />

        <RoundedButton
          items={{ image: <Construction width={24} height={24} />, title: 'Building' }}
          className={`top-89 -right-40.5 ${animate ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
          route="/building"
        />

        <RoundedButton
          items={{ image: <Archive width={24} height={24} />, title: 'Archive' }}
          className={`top-130 -right-21.5 ${animate ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
          route="/archive"
        />
      </div>
    </div>
  );
};
