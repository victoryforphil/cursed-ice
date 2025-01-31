import { useState } from 'react';
import {
  Paper,
  Text,
  Stack,
  Group,
  ActionIcon,
  Card,
  ScrollArea,
  Transition,
  rem,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconMapPin } from '@tabler/icons-react';

function ReportsPanel({ reports = [], onReportClick }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const glassStyle = {
    backgroundColor: isDark 
      ? 'rgba(20, 21, 23, 0.85)' 
      : 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: `1px solid ${isDark 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'}`,
    boxShadow: isDark
      ? '0 4px 30px rgba(0, 0, 0, 0.3)'
      : '0 4px 30px rgba(0, 0, 0, 0.1)',
  };

  const cardStyle = {
    ...glassStyle,
    backgroundColor: isDark 
      ? 'rgba(30, 31, 34, 0.75)' 
      : 'rgba(255, 255, 255, 0.75)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: isDark
        ? '0 6px 30px rgba(0, 0, 0, 0.4)'
        : '0 6px 30px rgba(0, 0, 0, 0.15)',
    },
  };

  return (
    <Transition
      mounted={true}
      transition="slide-up"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Box
          style={{
            ...styles,
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '800px',
            height: isExpanded ? '60vh' : 'auto',
            zIndex: 1000,
            transition: 'height 0.3s ease',
          }}
        >
          <Paper
            shadow="sm"
            p="md"
            style={{
              ...glassStyle,
              height: '100%',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <Stack gap="xs">
              <Group justify="space-between" align="center">
                <Text fw={500} c={isDark ? 'gray.3' : 'dark.8'}>Ice Reports</Text>
                <ActionIcon
                  variant="subtle"
                  color={isDark ? 'gray.5' : 'gray.7'}
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
                >
                  {isExpanded ? (
                    <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                  ) : (
                    <IconChevronUp style={{ width: rem(16), height: rem(16) }} />
                  )}
                </ActionIcon>
              </Group>

              <ScrollArea h={isExpanded ? 'calc(60vh - 80px)' : '120px'}>
                <Stack gap="sm">
                  {reports.map((report) => (
                    <Card
                      key={report.id}
                      shadow="sm"
                      padding="sm"
                      radius="md"
                      style={cardStyle}
                      onClick={() => onReportClick?.(report)}
                    >
                      <Group wrap="nowrap" align="flex-start">
                        <IconMapPin
                          style={{ width: rem(20), height: rem(20), flexShrink: 0 }}
                          color={isDark ? '#909296' : '#495057'}
                        />
                        <Stack gap={4}>
                          <Text fw={500} size="sm" c={isDark ? 'gray.3' : 'dark.8'}>
                            {report.title}
                          </Text>
                          <Text size="xs" c={isDark ? 'gray.5' : 'gray.7'} lineClamp={2}>
                            {report.description}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {new Date(report.id).toLocaleDateString()}
                          </Text>
                        </Stack>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              </ScrollArea>
            </Stack>
          </Paper>
        </Box>
      )}
    </Transition>
  );
}

export default ReportsPanel; 
