import React, { useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
    TabsProps as MuiTabsProps,
} from '@mui/material';

// 각 탭 아이템의 데이터 타입을 정의합니다.
export interface TabItem {
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactElement; // 1. 아이콘 속성을 옵셔널하게 추가합니다.
}

// DsTabs 컴포넌트가 받을 props 타입을 정의합니다.
interface DsTabsProps extends Omit<MuiTabsProps, 'value' | 'onChange' | 'children'> {
    /** 탭의 라벨과 컨텐츠를 담은 배열 */
    tabs: TabItem[];
}

// --- Helper Components & Functions (내부 구현) ---

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

/**
 * 특정 탭이 활성화되었을 때 컨텐츠를 보여주는 패널 컴포넌트입니다.
 * 이 컴포넌트는 DsTabs 내부에서만 사용됩니다.
 */
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`ds-tabpanel-${index}`}
            aria-labelledby={`ds-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

/**
 * 웹 접근성(a11y)을 위한 props를 생성하는 헬퍼 함수입니다.
 */
function a11yProps(index: number) {
    return {
        id: `ds-tab-${index}`,
        'aria-controls': `ds-tabpanel-${index}`,
    };
}


// --- Main DsTabs Component ---

/**
 * 탭 데이터를 배열로 받아 탭 인터페이스를 렌더링하는 재사용 가능한 컴포넌트입니다.
 * 내부적으로 활성 탭 상태와 컨텐츠 패널 표시를 관리합니다.
 */
const DsTabs: React.FC<DsTabsProps> = ({ tabs, ...props }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="Dynamic tabs example"
                    {...props} // variant, centered 등 MUI Tabs의 모든 props를 지원
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={tab.label}
                            label={tab.label}
                            disabled={tab.disabled}
                            icon={tab.icon} // 2. icon prop을 Tab 컴포넌트에 전달합니다.
                            iconPosition="start" // 3. 아이콘이 텍스트 앞에 오도록 위치를 지정합니다.
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <TabPanel key={tab.label} value={activeTab} index={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    );
};

export default DsTabs;