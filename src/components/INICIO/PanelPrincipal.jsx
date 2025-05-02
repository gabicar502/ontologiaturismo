// PanelPrincipal.jsx
import React, { useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemIcon, ListItemText,
  Drawer, InputBase, Paper, Divider, Collapse, Avatar, Button,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../img/Innovar Proyectos - Logo.png';
import './PanelPrincipal.css';

function PanelPrincipal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [submenu, setSubmenu] = useState({
    verProyectos: false,
    crearProyecto: false,
    reportes: false,
  });

  const toggleSubmenu = (name) => {
    setSubmenu((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const userName = 'Gabriel Cardenas'; // Reemplaza esto con props o contexto en el futuro

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            backgroundColor: '#f7f9fb',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)'
          },
        }}
      >
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <img src={Logo} alt="Logo" style={{ width: '220px' }} />
          <Avatar
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0D8ABC&color=fff`}
            sx={{ width: 60, height: 60, mx: 'auto', mt: 1 }}
          />
          <Typography variant="body1" sx={{ mt: 1 }}>{userName}</Typography>
          <Button variant="text" size="small">Ver Perfil</Button>
        </Box>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>

          <ListItem button onClick={() => toggleSubmenu('verProyectos')}>
            <ListItemIcon><ListAltIcon /></ListItemIcon>
            <ListItemText primary="Ver Proyectos" />
            {submenu.verProyectos ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenu.verProyectos} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}><ListItemText primary="Activos" /></ListItem>
              <ListItem button sx={{ pl: 4 }}><ListItemText primary="En evaluación" /></ListItem>
              <ListItem button sx={{ pl: 4 }}><ListItemText primary="Finalizados" /></ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => toggleSubmenu('crearProyecto')}>
            <ListItemIcon><AddBoxIcon /></ListItemIcon>
            <ListItemText primary="Crear Proyecto" />
            {submenu.crearProyecto ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenu.crearProyecto} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}><ListItemText primary="Nuevo Proyecto" /></ListItem>
              <ListItem button sx={{ pl: 4 }}><ListItemText primary="Desde Plantilla" /></ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={() => toggleSubmenu('reportes')}>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary="Reportes" />
            {submenu.reportes ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={submenu.reportes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button sx={{ pl: 4 }}><ListItemText primary="Mensuales" /></ListItem>
              <ListItem button sx={{ pl: 4 }}><ListItemText primary="Finales" /></ListItem>
            </List>
          </Collapse>

          <Divider />

          <ListItem button>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f0f2f5', p: 3 }}>
        <Paper sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, px: 2 }}>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <SearchIcon />
          <InputBase
            placeholder="Buscar en el sistema..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ ml: 2, flex: 1 }}
          />
        </Paper>

        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          Bienvenido, {userName}
        </Typography>
      </Box>
    </Box>
  );
}

export default PanelPrincipal;