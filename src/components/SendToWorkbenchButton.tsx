import * as React from 'react';
import { Button } from '@fluentui/react-components';

interface SendToWorkbenchButtonProps {
  onClick: () => void;
}

export const SendToWorkbenchButton: React.FC<SendToWorkbenchButtonProps> = ({ onClick }) => (
  <Button appearance="primary" onClick={onClick}>
    Send to Workbench
  </Button>
); 