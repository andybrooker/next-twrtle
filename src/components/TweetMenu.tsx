import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { ListItemIcon, ListItemText } from '@mui/material'
import ToTwitter from '../components/icons/ToTwitter'
import InsertPhoto from '@mui/icons-material/InsertPhoto';
import StyleIcon from '@mui/icons-material/Style';
import { Link } from '@mui/material';
import { TweetV2 } from 'twitter-api-v2';

export default function PositionedMenu({data, onDownloadImage}: {data: TweetV2, onDownloadImage: () => void}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
          id="more-actions-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size='small'
        >
          <MoreHorizIcon fontSize='small'/>
        </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Link href={`https://twitter.com/${data?.author_id}/status/${data?.id}`} target="_blank"
                rel="noreferrer" underline="none"><MenuItem
      sx={{color: 'text.secondary'}} onClick={handleClose}>
            <ListItemIcon>
            <ToTwitter />
          </ListItemIcon>
          <ListItemText>View on Twitter</ListItemText></MenuItem></Link>
        <MenuItem sx={{color: 'text.secondary'}} onClick={onDownloadImage}>
        <ListItemIcon>
            <InsertPhoto fontSize="small" />
          </ListItemIcon>
          <ListItemText>Save as Picture</ListItemText>
        </MenuItem>
        <MenuItem sx={{color: 'text.secondary'}} onClick={handleClose}><ListItemIcon>
            <StyleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add to Moodboard</ListItemText>
          </MenuItem>
      </Menu>
    </div>
  );
}


