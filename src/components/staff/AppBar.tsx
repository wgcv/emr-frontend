import AdbIcon from "@mui/icons-material/Adb"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import MenuIcon from "@mui/icons-material/Menu"
import { Divider, AppBar as MuiAppBar } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from 'react-router-dom'


function AppBar() {
    const { t } = useTranslation();

    const menuItems = [
        {
            name: t("menu.home"),
            url: "/staff/dashboard",
        },
        {
            name: t("menu.clinics"),
            url: [
                { name: "View", url: "/staff/clinic/view" },
                { name: "Divider", url: "/staff/clinic/create" },
                { name: t("menu.createClinics"), url: "/staff/clinic/create" },
                { name: t("menu.createClinicOwner"), url: "/staff/clinic/create-owner" }
            ],
        }
    ]

    const userItems = [
        {
            name: t("userMenu.profile"),
            url: "staff/settings",
        },
        {
            name: t("userMenu.settings"),
            url: "staff/settings",
        },
        {
            name: t("userMenu.logout"),
            url: "staff/settings",
        },
    ]


    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
    const [mobileSubMenus, setMobileSubMenus] = React.useState<{ [key: string]: boolean }>({})
    const [desktopSubMenuAnchors, setDesktopSubMenuAnchors] = React.useState<{ [key: string]: HTMLElement | null }>({})

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleOpenDesktopSubMenu = (event: React.MouseEvent<HTMLElement>, menuName: string) => {
        setDesktopSubMenuAnchors(prev => ({
            ...prev,
            [menuName]: event.currentTarget
        }))
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
        setMobileSubMenus({})
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleCloseDesktopSubMenu = (menuName: string) => {
        setDesktopSubMenuAnchors(prev => ({
            ...prev,
            [menuName]: null
        }))
    }

    const handleNavigation = (url: string) => {
        navigate(url);
        handleCloseNavMenu();
    }

    const toggleMobileSubMenu = (menuName: string) => {
        setMobileSubMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }))
    }

    const renderMenuItem = (item: typeof menuItems[0], isMobile: boolean) => {
        if (Array.isArray(item.url)) {
            // Render submenu
            if (isMobile) {
                return (
                    <Box key={item.name}>
                        <MenuItem
                            onClick={() => toggleMobileSubMenu(item.name)}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%'
                            }}
                        >
                            <Typography textAlign="center">{item.name}</Typography>
                            <KeyboardArrowDownIcon
                                sx={{
                                    transform: mobileSubMenus[item.name] ? 'rotate(180deg)' : 'none',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        </MenuItem>
                        {mobileSubMenus[item.name] && (
                            <Box sx={{ pl: 2, bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                                {item.url.map((subItem, index) => (
                                    subItem.name === 'Divider' ? (
                                        <Divider key={`divider-${index}`} />
                                    ) : (
                                        <MenuItem
                                            key={subItem.name}
                                            onClick={() => handleNavigation(subItem.url)}
                                            sx={{ pl: 3 }}
                                        >
                                            <Typography textAlign="center">{subItem.name}</Typography>
                                        </MenuItem>
                                    )
                                ))}
                            </Box>
                        )}
                    </Box>
                )
            }
            else {
                return (
                    <React.Fragment key={item.name}>
                        <Button
                            onClick={(event) => handleOpenDesktopSubMenu(event, item.name)}
                            sx={{
                                my: 2,
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {item.name}
                            <KeyboardArrowDownIcon />
                        </Button>
                        <Menu
                            anchorEl={desktopSubMenuAnchors[item.name]}
                            open={Boolean(desktopSubMenuAnchors[item.name])}
                            onClose={() => handleCloseDesktopSubMenu(item.name)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >

                            {item.url.map((subItem, index) => (
                                subItem.name === 'Divider' ? (
                                    <Divider key={`divider-${index}`} />
                                ) : (
                                    <MenuItem
                                        key={subItem.name}
                                        onClick={() => {
                                            handleCloseDesktopSubMenu(item.name);
                                            handleNavigation(subItem.url);
                                        }}
                                    >
                                        <Typography textAlign="center">{subItem.name}</Typography>
                                    </MenuItem>
                                )
                            ))}
                        </Menu>
                    </React.Fragment>
                )
            }
        }
        else if (typeof item.url === 'object') {
            // Render divider
            return <Divider key={item.name} sx={{ my: 2 }} />
        }
        else {
            // Render direct link
            return isMobile ? (
                <MenuItem
                    key={item.name}
                    onClick={() => {
                        if (typeof item.url === 'string') {
                            handleNavigation(item.url);
                        }
                    }}
                >
                    <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
            ) : (
                <Button
                    key={item.name}
                    onClick={() => {
                        if (typeof item.url === 'string') {
                            handleNavigation(item.url);
                        }
                    }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {item.name}
                </Button>
            )
        }
    }

    return (
        <MuiAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => handleNavigation('/')}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            cursor: 'pointer'
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Mobile Navigation */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                                "& .MuiPaper-root": {
                                    width: '100%',
                                    maxWidth: '300px'
                                }
                            }}
                        >
                            {menuItems.map((item) => renderMenuItem(item, true))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={() => handleNavigation('/')}
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            cursor: 'pointer'
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {menuItems.map((item) => renderMenuItem(item, false))}
                    </Box>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {userItems.map((item) => (
                                <MenuItem key={item.name} onClick={() => {
                                    if (typeof item.url === 'string') {
                                        handleNavigation(item.url);
                                    }
                                }}>
                                    <Typography textAlign="center">{item.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </MuiAppBar>
    )
}

export default AppBar
