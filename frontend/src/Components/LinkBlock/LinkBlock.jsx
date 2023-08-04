import { useState } from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { MdLink } from 'react-icons/md';

export default function LinkBlock({
  sx,
  title,
  link
}) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);

    // Reset the copied state after a short timeout
    setTimeout(() => setIsLinkCopied(false), 1500);
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              {title}
            </Typography>
            <Typography variant="body2">{link}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
              cursor: 'pointer',
            }}
            onClick={copyLinkToClipboard}
          >
            <SvgIcon>
              <MdLink/>
            </SvgIcon>
          </Avatar>
        </Stack>
   
        {isLinkCopied && (
          <Typography color="text.secondary" variant="caption" sx={{ mt: 2 }}>
            Link copied to clipboard!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
