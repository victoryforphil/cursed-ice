import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  Title,
  rem,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconMap2,
  IconClipboardList,
  IconAlertTriangle,
  IconInfoCircle,
  IconHeartHandshake,
  IconUser,
  IconSun,
  IconMoon,
} from '@tabler/icons-react';

const mainLinks = [
  { icon: IconMap2, label: 'Map', to: '/' },
  { icon: IconClipboardList, label: 'Report', to: '/report' },
  { icon: IconAlertTriangle, label: 'SOS', to: '/sos' },
  { icon: IconInfoCircle, label: 'About', to: '/about' },
  { icon: IconHeartHandshake, label: 'Donate', to: '/donate' },
  { icon: IconUser, label: 'Account', to: '/account' },
];

function AppFrame({ children }) {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const toggleColorScheme = () => {
    setColorScheme(isDark ? 'light' : 'dark');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={1} size="h3">Cursed Ice</Title>
          </Group>
          <ActionIcon
            variant="default"
            onClick={toggleColorScheme}
            size="lg"
            aria-label="Toggle color scheme"
          >
            {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {mainLinks.map((link) => (
          <NavLink
            key={link.to}
            active={location.pathname === link.to}
            label={link.label}
            leftSection={<link.icon style={{ width: rem(20), height: rem(20) }} />}
            onClick={() => {
              navigate(link.to);
              setOpened(false);
            }}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default AppFrame; 