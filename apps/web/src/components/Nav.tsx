import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tab,
  Tabs,
  Tooltip,
  lighten,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type NavItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
};

type NavProps = {
  items: NavItem[];
  align?: "left" | "right";
};

export function Nav({ items, align = "left" }: NavProps) {
  const { pathname } = useLocation();
  const route = pathname?.split("/")[2];
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return isSmUp ? (
    <Drawer
      sx={{
        width: 64,
        flexShrink: 0,
        zIndex: 5,
        top: 64,
        left: align === "left" ? 0 : "calc(100% - 64px)",
        height: "calc(100% - 64px)",
        position: "absolute",
        "& .MuiDrawer-paper": {
          width: 64,
          top: 64,
          left: align === "left" ? 0 : "calc(100% - 64px)",
          height: "calc(100% - 64px)",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor={align}
    >
      <List>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding>
            <Tooltip title={item.title}>
              <ListItemButton
                selected={route === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>
                  {route === item.path && React.isValidElement(item.icon)
                    ? React.cloneElement(item.icon, {
                        // @ts-expect-error Property 'color' does not exist on type 'Element'
                        color: "primary",
                      })
                    : item.icon}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  ) : route ? (
    <Tabs
      textColor="inherit"
      value={route}
      variant="fullWidth"
      sx={{
        position: "absolute",
        top: 56,
        left: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        width: "100%",
        boxShadow: (theme) =>
          `1px -1px 2px 2px ${
            theme.palette.mode === "dark"
              ? theme.palette.primary.light
              : theme.palette.grey[100]
          }`,
      }}
    >
      {items.map((tab) => (
        <Tab
          key={tab.id}
          label={tab.icon}
          value={tab.path}
          sx={{
            bgcolor: lighten(
              theme.palette.primary.light,
              route === tab.path ? 0.85 : 1
            ),
            opacity: 1,
          }}
          onClick={() => navigate(tab.path)}
        />
      ))}
    </Tabs>
  ) : null;
}
