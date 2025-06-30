import * as React from 'react';
import { SendToWorkbenchButton } from './components/SendToWorkbenchButton';
import { handleSendToWorkbench } from './commands/SendToWorkbenchCommand';

export const App: React.FC = () => (
  <div style={{ padding: 24 }}>
    <h2>Outlook Add-in: Send to Workbench</h2>
    <SendToWorkbenchButton onClick={handleSendToWorkbench} />
  </div>
); 