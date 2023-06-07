import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function asignedLead() {
  return (
    <Stack>
      <Button variant="contained" endIcon={<SendIcon />}>
        Asignar Leads
      </Button>
    </Stack>
  );
}