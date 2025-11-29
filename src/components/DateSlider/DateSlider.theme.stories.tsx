import type { Meta, StoryObj } from '@storybook/react';
import { Circle, MoveHorizontal, Moon, Sun } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Button } from '../Button';
import { DateSlider } from './DateSlider';
import { defaultPreset } from './presets';
import type { SelectionResult, SliderProps, TimeUnit } from './type';
import { toUTCDate } from './utils';

const meta: Meta<typeof DateSlider> = {
  title: 'Components/DateSlider/Themes',
  component: DateSlider,
  parameters: {
    docs: {
      description: {
        component:
          'DateSlider supports theme customization through CSS variables. The default preset automatically adapts to light/dark mode.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<Partial<SliderProps>>;

// Component for Theme Switching story
const ThemeSwitchingComponent = () => {
  const [isDark, setIsDark] = useState(false);
  const [selection, setSelection] = useState<SelectionResult>();

  const handleSelectionChange = useCallback((newSelection: SelectionResult) => {
    setSelection(newSelection);
  }, []);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div
        style={{
          padding: 40,
          background: isDark ? '#0f172a' : '#f5f7fa',
          minHeight: 500,
          borderRadius: '12px',
          transition: 'background-color 0.3s',
        }}
      >
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 600,
              color: isDark ? '#fff' : '#000',
              flex: 1,
            }}
          >
            Theme Switching Example
          </h3>
          <Button
            variant="outline"
            onClick={() => setIsDark(!isDark)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: isDark ? '#1e293b' : '#fff',
              color: isDark ? '#fff' : '#000',
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        <div
          style={{
            background: isDark ? '#1e293b' : '#fff',
            padding: 24,
            borderRadius: 12,
            marginBottom: 16,
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
          }}
        >
          <DateSlider
            mode="range"
            min={toUTCDate('2020-01-01')}
            max={toUTCDate('2025-12-31')}
            initialTimeUnit={'month' as TimeUnit}
            value={{
              start: toUTCDate('2022-03-01'),
              end: toUTCDate('2022-09-01'),
            }}
            layout={{
              width: 800,
              height: 120,
            }}
            classNames={defaultPreset}
            onChange={handleSelectionChange}
            icons={{
              point: <Circle size={20} />,
              rangeStart: <MoveHorizontal size={20} />,
              rangeEnd: <MoveHorizontal size={20} />,
            }}
          />
        </div>

        {selection && 'start' in selection && (
          <div
            style={{
              background: isDark ? '#1e293b' : '#fff',
              padding: 16,
              borderRadius: 8,
              border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
            }}
          >
            <pre
              style={{
                margin: 0,
                fontSize: 12,
                fontFamily: 'monospace',
                color: isDark ? '#e2e8f0' : '#334155',
              }}
            >
              {`Start: ${selection.start.toLocaleDateString()}\nEnd: ${selection.end.toLocaleDateString()}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Component for Custom Theme story
const CustomThemeComponent = () => {
  const [, setSelection] = useState<SelectionResult>();

  return (
    <div
      style={{
        padding: 40,
        background: '#f5f7fa',
        minHeight: 400,
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Custom Theme Example</h3>
        <p style={{ margin: '8px 0 0', fontSize: 14, opacity: 0.7 }}>
          Override CSS variables to create custom themes
        </p>
      </div>

      {/* Custom orange theme */}
      <div
        style={
          {
            background: '#fff',
            padding: 24,
            borderRadius: 12,
            marginBottom: 24,
            '--ds-primary': '249 115 22', // orange-500
            '--ds-primary-light': '251 146 60', // orange-400
            '--ds-primary-dark': '234 88 12', // orange-600
            '--ds-track-active': '249 115 22',
            '--ds-handle-border': '249 115 22',
            '--ds-label-bg': '234 88 12',
            '--ds-cursor-line': '249 115 22',
            '--ds-scale-major': '249 115 22',
            '--ds-shadow-colored': '249 115 22',
          } as React.CSSProperties
        }
      >
        <h4 style={{ marginTop: 0, marginBottom: 16, fontSize: 16 }}>Orange Theme</h4>
        <DateSlider
          mode="point"
          min={toUTCDate('2023-01-01')}
          max={toUTCDate('2023-12-31')}
          initialTimeUnit={'month' as TimeUnit}
          value={{
            point: toUTCDate('2023-06-15'),
          }}
          layout={{
            width: 'fill',
            height: 100,
          }}
          classNames={defaultPreset}
          onChange={setSelection}
          icons={{
            point: <Circle size={20} />,
            rangeStart: <MoveHorizontal size={20} />,
            rangeEnd: <MoveHorizontal size={20} />,
          }}
        />
      </div>

      {/* Custom purple theme */}
      <div
        style={
          {
            background: '#fff',
            padding: 24,
            borderRadius: 12,
            marginBottom: 24,
            '--ds-primary': '168 85 247', // purple-500
            '--ds-primary-light': '192 132 252', // purple-400
            '--ds-primary-dark': '147 51 234', // purple-600
            '--ds-track-active': '168 85 247',
            '--ds-handle-border': '168 85 247',
            '--ds-label-bg': '147 51 234',
            '--ds-cursor-line': '168 85 247',
            '--ds-scale-major': '168 85 247',
            '--ds-shadow-colored': '168 85 247',
          } as React.CSSProperties
        }
      >
        <h4 style={{ marginTop: 0, marginBottom: 16, fontSize: 16 }}>Purple Theme</h4>
        <DateSlider
          mode="point"
          min={toUTCDate('2023-01-01')}
          max={toUTCDate('2023-12-31')}
          initialTimeUnit={'month' as TimeUnit}
          value={{
            point: toUTCDate('2023-08-15'),
          }}
          layout={{
            width: 'fill',
            height: 100,
          }}
          classNames={defaultPreset}
          onChange={setSelection}
          icons={{
            point: <Circle size={20} />,
            rangeStart: <MoveHorizontal size={20} />,
            rangeEnd: <MoveHorizontal size={20} />,
          }}
        />
      </div>

      {/* Custom green theme */}
      <div
        style={
          {
            background: '#fff',
            padding: 24,
            borderRadius: 12,
            '--ds-primary': '34 197 94', // green-500
            '--ds-primary-light': '74 222 128', // green-400
            '--ds-primary-dark': '22 163 74', // green-600
            '--ds-track-active': '34 197 94',
            '--ds-handle-border': '34 197 94',
            '--ds-label-bg': '22 163 74',
            '--ds-cursor-line': '34 197 94',
            '--ds-scale-major': '34 197 94',
            '--ds-shadow-colored': '34 197 94',
          } as React.CSSProperties
        }
      >
        <h4 style={{ marginTop: 0, marginBottom: 16, fontSize: 16 }}>Green Theme</h4>
        <DateSlider
          mode="point"
          min={toUTCDate('2023-01-01')}
          max={toUTCDate('2023-12-31')}
          initialTimeUnit={'month' as TimeUnit}
          value={{
            point: toUTCDate('2023-10-15'),
          }}
          layout={{
            width: 'fill',
            height: 100,
          }}
          classNames={defaultPreset}
          onChange={setSelection}
          icons={{
            point: <Circle size={20} />,
            rangeStart: <MoveHorizontal size={20} />,
            rangeEnd: <MoveHorizontal size={20} />,
          }}
        />
      </div>
    </div>
  );
};

/**
 * Theme switching example showing light/dark mode support
 */
export const ThemeSwitching: Story = {
  render: () => <ThemeSwitchingComponent />,
};

/**
 * Custom theme examples using CSS variable overrides
 */
export const CustomTheme: Story = {
  render: () => <CustomThemeComponent />,
};

/**
 * Documentation: How to use CSS variables
 */
export const HowToUseThemes: Story = {
  render: () => {
    return (
      <div style={{ padding: 40, background: '#f5f7fa', minHeight: 400 }}>
        <h3 style={{ marginTop: 0, marginBottom: 24, fontSize: 24, fontWeight: 700 }}>
          Using CSS Variables for Theming
        </h3>

        <div style={{ background: 'white', padding: 24, borderRadius: 12, marginBottom: 24 }}>
          <h4 style={{ marginTop: 0, fontSize: 18, fontWeight: 600 }}>Available CSS Variables</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px' }}>Variable</th>
                <th style={{ padding: '12px 8px' }}>Description</th>
                <th style={{ padding: '12px 8px' }}>Default (Light)</th>
                <th style={{ padding: '12px 8px' }}>Default (Dark)</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: 'monospace' }}>
              {[
                ['--ds-primary', 'Primary color', 'blue-500', 'emerald-500'],
                ['--ds-track-base', 'Track background', 'slate-200', 'gray-700'],
                ['--ds-track-active', 'Active track', 'blue-500', 'emerald-500'],
                ['--ds-handle-bg', 'Handle background', 'white', 'gray-800'],
                ['--ds-handle-border', 'Handle border', 'blue-500', 'emerald-500'],
                ['--ds-label-bg', 'Label background', 'blue-600', 'emerald-600'],
                ['--ds-cursor-line', 'Cursor line', 'blue-500', 'emerald-500'],
                ['--ds-scale-major', 'Major scale marks', 'slate-600', 'emerald-500'],
              ].map(([variable, description, light, dark], index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', fontSize: 12 }}>
                  <td style={{ padding: '8px', color: '#059669' }}>{variable}</td>
                  <td style={{ padding: '8px', fontFamily: 'system-ui' }}>{description}</td>
                  <td style={{ padding: '8px', color: '#6366f1' }}>{light}</td>
                  <td style={{ padding: '8px', color: '#10b981' }}>{dark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: 'white', padding: 24, borderRadius: 12 }}>
          <h4 style={{ marginTop: 0, fontSize: 18, fontWeight: 600 }}>Usage Example</h4>
          <pre
            style={{
              background: '#f8f9fa',
              padding: 16,
              borderRadius: 8,
              fontSize: 13,
              fontFamily: 'monospace',
              overflow: 'auto',
            }}
          >
            {`// Method 1: Apply dark mode globally
<div className="dark">
  <DateSlider classNames={defaultPreset} {...props} />
</div>

// Method 2: Override specific variables inline
<div style={{
  '--ds-primary': '249 115 22',  // orange-500 (RGB values)
  '--ds-track-active': '249 115 22',
}}>
  <DateSlider classNames={defaultPreset} {...props} />
</div>

// Method 3: Override in your CSS
.my-custom-theme {
  --ds-primary: 168 85 247;  /* purple-500 */
  --ds-track-active: 168 85 247;
  --ds-handle-border: 168 85 247;
}

<div className="my-custom-theme">
  <DateSlider classNames={defaultPreset} {...props} />
</div>`}
          </pre>
        </div>
      </div>
    );
  },
};
