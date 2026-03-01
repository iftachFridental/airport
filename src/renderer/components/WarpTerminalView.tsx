import { useCallback } from 'react';
import { useTerminalStore } from '../store/terminal-store';

interface WarpTerminalViewProps {
  sessionId: string;
}

export function WarpTerminalView({ sessionId }: WarpTerminalViewProps) {
  const session = useTerminalStore((s) => s.sessions.find((x) => x.id === sessionId));

  const handleFocusWarp = useCallback(() => {
    window.airport.focusWarp();
  }, []);

  if (!session) return null;

  const displayCwd = session.cwd
    ? session.cwd.replace(/^\/Users\/[^/]+/, '~')
    : '';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        gap: 20,
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="12" fill="#01A4FF" />
          <text x="24" y="34" textAnchor="middle" fontSize="26" fill="white" fontFamily="monospace" fontWeight="bold">W</text>
        </svg>

        <span
          style={{
            color: '#cdd6f4',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          Running in Warp
        </span>

        {displayCwd && (
          <span
            style={{
              color: '#6c7086',
              fontSize: 12,
              fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            }}
          >
            {displayCwd}
          </span>
        )}

        {session.gitRepo && (
          <span
            style={{
              color: '#89b4fa',
              fontSize: 12,
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            {session.gitRepo}
            {session.gitBranch ? ` / ${session.gitBranch}` : ''}
          </span>
        )}
      </div>

      <button
        onClick={handleFocusWarp}
        style={{
          padding: '9px 22px',
          background: '#01A4FF',
          color: '#ffffff',
          border: 'none',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: 'system-ui, sans-serif',
          cursor: 'pointer',
          letterSpacing: '0.01em',
        }}
        onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#1ab4ff'; }}
        onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#01A4FF'; }}
      >
        Focus Warp
      </button>
    </div>
  );
}
